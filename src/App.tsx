import { useState, useCallback, useRef, useEffect } from "react";
import { Puck, Render } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { editorConfig } from "./config/editorConfig";
import { TemplateSelector } from "./components/TemplateSelector";
import { DraftsManager } from "./components/DraftsManager";
import { ExportModal } from "./components/ExportModal";
import {
  createDraft,
  updateDraft,
  getDraft,
  formatDate,
  type Draft,
  type DraftType,
} from "./lib/drafts";
import type { Data } from "@puckeditor/core";
import { createRoot } from "react-dom/client";

type AppView = "selector" | "drafts" | "editor" | "preview";

function App() {
  const [view, setView] = useState<AppView>("selector");
  const [editorData, setEditorData] = useState<Data | null>(null);
  const [currentDraft, setCurrentDraft] = useState<Draft | null>(null);
  const [showExport, setShowExport] = useState(false);
  const [exportHtml, setExportHtml] = useState("");
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const autoSaveTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const latestDataRef = useRef<Data | null>(null);

  // Keep latestDataRef in sync
  useEffect(() => {
    latestDataRef.current = editorData;
  }, [editorData]);

  // Auto-save every 30 seconds while in editor
  useEffect(() => {
    if (view === "editor" && currentDraft) {
      autoSaveTimer.current = setInterval(() => {
        if (latestDataRef.current && currentDraft) {
          const updated = updateDraft(currentDraft.id, latestDataRef.current);
          if (updated) {
            setLastSaved(updated.updatedAt);
          }
        }
      }, 30000);

      return () => {
        if (autoSaveTimer.current) clearInterval(autoSaveTimer.current);
      };
    }
  }, [view, currentDraft]);

  // Start editing a template (create a new draft)
  const handleTemplateSelect = useCallback(
    (data: Data, name: string, type: DraftType) => {
      const draft = createDraft(name, type, data);
      setCurrentDraft(draft);
      setEditorData(data);
      setLastSaved(draft.updatedAt);
      setView("editor");
    },
    []
  );

  // Resume a draft
  const handleResumeDraft = useCallback((draft: Draft) => {
    setCurrentDraft(draft);
    setEditorData(draft.data);
    setLastSaved(draft.updatedAt);
    setView("editor");
  }, []);

  // Save draft manually
  const handleSaveDraft = useCallback(() => {
    if (currentDraft && latestDataRef.current) {
      const updated = updateDraft(currentDraft.id, latestDataRef.current);
      if (updated) {
        setCurrentDraft(updated);
        setLastSaved(updated.updatedAt);
      }
    }
  }, [currentDraft]);

  // Puck onChange - track data
  const handleEditorChange = useCallback((data: Data) => {
    setEditorData(data);
  }, []);

  // Publish = save + go to preview
  const handlePublish = useCallback(
    (data: Data) => {
      setEditorData(data);
      if (currentDraft) {
        const updated = updateDraft(currentDraft.id, data);
        if (updated) {
          setCurrentDraft(updated);
          setLastSaved(updated.updatedAt);
        }
      }
      setView("preview");
    },
    [currentDraft]
  );

  // Generate real HTML from Puck data
  const generateHtml = useCallback(
    (data: Data): Promise<string> => {
      return new Promise((resolve) => {
        const container = document.createElement("div");
        container.style.position = "absolute";
        container.style.left = "-9999px";
        container.style.top = "0";
        container.style.width = "800px";
        document.body.appendChild(container);

        const root = createRoot(container);
        root.render(<Render config={editorConfig as any} data={data} />);

        // Wait for render to complete
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const renderedHtml = container.innerHTML;
            root.unmount();
            document.body.removeChild(container);

            const title = currentDraft?.name || "Exported Page";
            const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif; }
    img { max-width: 100%; height: auto; display: block; }
    a { color: inherit; text-decoration: none; }
    nav { padding: 0; }
    section { width: 100%; }
    hr { border: none; }
  </style>
</head>
<body>
  ${renderedHtml}
</body>
</html>`;
            resolve(fullHtml);
          });
        });
      });
    },
    [currentDraft]
  );

  // Export handler
  const handleExport = useCallback(async () => {
    const data = latestDataRef.current || editorData;
    if (!data) return;
    const html = await generateHtml(data);
    setExportHtml(html);
    setShowExport(true);
  }, [editorData, generateHtml]);

  // Navigation
  const handleGoToDrafts = useCallback(() => setView("drafts"), []);
  const handleBackToEditor = useCallback(() => setView("editor"), []);
  const handleNewPage = useCallback(() => {
    // Save current work before leaving
    if (currentDraft && latestDataRef.current) {
      updateDraft(currentDraft.id, latestDataRef.current);
    }
    setCurrentDraft(null);
    setEditorData(null);
    setView("selector");
  }, [currentDraft]);

  // ============ VIEWS ============

  // Template Selector
  if (view === "selector") {
    return (
      <TemplateSelector
        onSelect={handleTemplateSelect}
        onOpenDrafts={handleGoToDrafts}
      />
    );
  }

  // Drafts Manager
  if (view === "drafts") {
    return (
      <DraftsManager
        onResume={handleResumeDraft}
        onBack={() => setView("selector")}
      />
    );
  }

  // Preview
  if (view === "preview" && editorData) {
    return (
      <div
        style={{
          fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "48px",
            backgroundColor: "#1a1a2e",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
            zIndex: 1000,
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          }}
        >
          <span style={{ color: "#fff", fontWeight: 600, fontSize: "14px" }}>
            Preview — {currentDraft?.name || "Untitled"}
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={handleBackToEditor}
              style={{
                padding: "6px 16px",
                backgroundColor: "#4361ee",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              Back to Editor
            </button>
            <button
              onClick={handleExport}
              style={{
                padding: "6px 16px",
                backgroundColor: "#10b981",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              Export HTML
            </button>
          </div>
        </div>

        <div ref={previewRef} style={{ marginTop: "48px" }}>
          <Render config={editorConfig as any} data={editorData} />
        </div>

        {showExport && (
          <ExportModal
            html={exportHtml}
            draftName={currentDraft?.name || "Untitled"}
            onClose={() => setShowExport(false)}
          />
        )}
      </div>
    );
  }

  // Editor
  if (view === "editor" && editorData) {
    return (
      <div
        style={{
          fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
        }}
      >
        <Puck
          config={editorConfig as any}
          data={editorData}
          onPublish={handlePublish}
          onChange={handleEditorChange}
          headerTitle={currentDraft?.name || "Visual Block Editor"}
          headerPath={
            lastSaved ? `Saved ${formatDate(lastSaved)}` : ""
          }
          overrides={{
            headerActions: () => (
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={handleSaveDraft}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#10b981",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  Save Draft
                </button>
                <button
                  onClick={handleExport}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#1a1a2e",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  Export HTML
                </button>
                <button
                  onClick={handleGoToDrafts}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "transparent",
                    color: "#666",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  My Drafts
                </button>
                <button
                  onClick={handleNewPage}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "transparent",
                    color: "#666",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  New Page
                </button>
              </div>
            ),
          }}
        />

        {showExport && (
          <ExportModal
            html={exportHtml}
            draftName={currentDraft?.name || "Untitled"}
            onClose={() => setShowExport(false)}
          />
        )}
      </div>
    );
  }

  // Fallback
  return (
    <TemplateSelector
      onSelect={handleTemplateSelect}
      onOpenDrafts={handleGoToDrafts}
    />
  );
}

export default App;
