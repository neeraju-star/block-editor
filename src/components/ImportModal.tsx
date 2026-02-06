import { useState, useRef, useCallback } from "react";
import { importFile, fileToDocName, detectFileType } from "../lib/fileImport";
import type { Data } from "@puckeditor/core";

type ImportModalProps = {
  onImport: (data: Data, name: string) => void;
  onClose: () => void;
};

type ImportState = "idle" | "loading" | "success" | "error";

export function ImportModal({ onImport, onClose }: ImportModalProps) {
  const [state, setState] = useState<ImportState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      const fileType = detectFileType(file);
      if (!fileType) {
        setErrorMsg(
          "Unsupported file type. Please upload a .docx or .pdf file."
        );
        setState("error");
        return;
      }

      setSelectedFile(file);
      setState("loading");
      setErrorMsg("");

      try {
        const data = await importFile(file);
        setState("success");
        // Short delay to show success state
        setTimeout(() => {
          onImport(data, fileToDocName(file));
        }, 500);
      } catch (err) {
        setState("error");
        setErrorMsg(
          err instanceof Error ? err.message : "Failed to import file."
        );
      }
    },
    [onImport]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragOver(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleBrowseClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const fileTypeIcon = (file: File | null) => {
    if (!file) return "\uD83D\uDCC2"; // folder icon
    const type = detectFileType(file);
    if (type === "docx") return "\uD83D\uDCC4"; // document icon
    if (type === "pdf") return "\uD83D\uDCD5"; // book icon (red)
    return "\uD83D\uDCC2";
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          width: "520px",
          maxWidth: "90vw",
          padding: "32px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#1a1a2e",
              margin: 0,
            }}
          >
            Import File
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              color: "#999",
              cursor: "pointer",
              padding: "4px",
              lineHeight: 1,
            }}
          >
            {"\u00D7"}
          </button>
        </div>

        {/* Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          style={{
            border: `2px dashed ${dragOver ? "#4361ee" : state === "error" ? "#ef4444" : "#d0d0d0"}`,
            borderRadius: "12px",
            padding: "48px 24px",
            textAlign: "center",
            backgroundColor: dragOver
              ? "rgba(67,97,238,0.05)"
              : state === "error"
                ? "rgba(239,68,68,0.03)"
                : "#fafafa",
            transition: "all 0.2s ease",
            cursor: state === "loading" ? "wait" : "pointer",
          }}
          onClick={state === "idle" || state === "error" ? handleBrowseClick : undefined}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".docx,.pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />

          {/* Idle State */}
          {state === "idle" && (
            <>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>
                {"\uD83D\uDCC2"}
              </div>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#333",
                  marginBottom: "8px",
                }}
              >
                Drag & drop a file here
              </p>
              <p style={{ fontSize: "14px", color: "#888", marginBottom: "16px" }}>
                or click to browse
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "16px",
                }}
              >
                <span
                  style={{
                    padding: "6px 14px",
                    backgroundColor: "#e8f0fe",
                    borderRadius: "6px",
                    fontSize: "13px",
                    color: "#4361ee",
                    fontWeight: 600,
                  }}
                >
                  .docx
                </span>
                <span
                  style={{
                    padding: "6px 14px",
                    backgroundColor: "#fef3f2",
                    borderRadius: "6px",
                    fontSize: "13px",
                    color: "#ef4444",
                    fontWeight: 600,
                  }}
                >
                  .pdf
                </span>
              </div>
            </>
          )}

          {/* Loading State */}
          {state === "loading" && (
            <>
              <div
                style={{
                  fontSize: "48px",
                  marginBottom: "16px",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              >
                {fileTypeIcon(selectedFile)}
              </div>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#333",
                  marginBottom: "8px",
                }}
              >
                Importing {selectedFile?.name}...
              </p>
              <p style={{ fontSize: "14px", color: "#888" }}>
                Converting content to editor blocks
              </p>
              <div
                style={{
                  marginTop: "16px",
                  width: "200px",
                  height: "4px",
                  backgroundColor: "#e0e0e0",
                  borderRadius: "2px",
                  margin: "16px auto 0",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "60%",
                    height: "100%",
                    backgroundColor: "#4361ee",
                    borderRadius: "2px",
                    animation: "loading 1.5s ease-in-out infinite",
                  }}
                />
              </div>
              <style>{`
                @keyframes loading {
                  0% { width: 0%; margin-left: 0%; }
                  50% { width: 60%; margin-left: 20%; }
                  100% { width: 0%; margin-left: 100%; }
                }
                @keyframes pulse {
                  0%, 100% { opacity: 1; }
                  50% { opacity: 0.5; }
                }
              `}</style>
            </>
          )}

          {/* Success State */}
          {state === "success" && (
            <>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>
                {"\u2705"}
              </div>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#10b981",
                  marginBottom: "8px",
                }}
              >
                Import Successful!
              </p>
              <p style={{ fontSize: "14px", color: "#888" }}>
                Opening in editor...
              </p>
            </>
          )}

          {/* Error State */}
          {state === "error" && (
            <>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>
                {"\u26A0\uFE0F"}
              </div>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#ef4444",
                  marginBottom: "8px",
                }}
              >
                Import Failed
              </p>
              <p style={{ fontSize: "14px", color: "#888", marginBottom: "16px" }}>
                {errorMsg}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setState("idle");
                  setSelectedFile(null);
                  setErrorMsg("");
                }}
                style={{
                  padding: "8px 20px",
                  backgroundColor: "#4361ee",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                Try Again
              </button>
            </>
          )}
        </div>

        {/* Footer info */}
        <p
          style={{
            fontSize: "12px",
            color: "#999",
            textAlign: "center",
            marginTop: "16px",
          }}
        >
          Supported formats: Microsoft Word (.docx) and PDF (.pdf). Headings,
          paragraphs, images, and lists will be converted to editor blocks.
        </p>
      </div>
    </div>
  );
}
