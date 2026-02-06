import { useState, useRef, useEffect } from "react";

type ExportTab = "code" | "preview";

type ExportModalProps = {
  html: string;
  draftName: string;
  onClose: () => void;
};

export function ExportModal({ html, draftName, onClose }: ExportModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<ExportTab>("preview");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (activeTab === "preview" && iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(html);
        doc.close();
      }
    }
  }, [activeTab, html]);

  const handleCopy = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeName = draftName.replace(/[^a-zA-Z0-9-_ ]/g, "").replace(/\s+/g, "-").toLowerCase();
    a.download = `${safeName || "exported-page"}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabStyle = (isActive: boolean): React.CSSProperties => ({
    padding: "8px 20px",
    backgroundColor: isActive ? "#4361ee" : "#f0f0f0",
    color: isActive ? "#fff" : "#555",
    border: "none",
    borderRadius: "6px 6px 0 0",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
    transition: "all 0.15s",
  });

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "0",
          maxWidth: "900px",
          width: "94%",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 24px 0 24px",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "18px", color: "#1a1a2e" }}>
            Export — {draftName}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#888",
              padding: "4px 8px",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* Actions + Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            padding: "16px 24px 0 24px",
          }}
        >
          <div style={{ display: "flex", gap: "4px" }}>
            <button
              onClick={() => setActiveTab("preview")}
              style={tabStyle(activeTab === "preview")}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              style={tabStyle(activeTab === "code")}
            >
              HTML Code
            </button>
          </div>
          <div style={{ display: "flex", gap: "8px", paddingBottom: "4px" }}>
            <button
              onClick={handleCopy}
              style={{
                padding: "8px 18px",
                backgroundColor: copied ? "#10b981" : "#4361ee",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "13px",
                transition: "background-color 0.2s",
              }}
            >
              {copied ? "Copied!" : "Copy HTML"}
            </button>
            <button
              onClick={handleDownload}
              style={{
                padding: "8px 18px",
                backgroundColor: "#1a1a2e",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "13px",
              }}
            >
              Download .html
            </button>
          </div>
        </div>

        {/* Content area */}
        <div
          style={{
            flex: 1,
            margin: "0 24px 24px 24px",
            border: "1px solid #e0e0e0",
            borderRadius: "0 8px 8px 8px",
            overflow: "hidden",
            minHeight: "420px",
            display: "flex",
          }}
        >
          {activeTab === "preview" ? (
            <iframe
              ref={iframeRef}
              title="Export Preview"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                minHeight: "420px",
                backgroundColor: "#fff",
              }}
            />
          ) : (
            <textarea
              readOnly
              value={html}
              style={{
                width: "100%",
                height: "100%",
                minHeight: "420px",
                fontFamily: "'Consolas', 'Courier New', monospace",
                fontSize: "12px",
                padding: "16px",
                border: "none",
                backgroundColor: "#1e1e2e",
                color: "#cdd6f4",
                resize: "none",
                outline: "none",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
