import { useState } from "react";
import {
  listDrafts,
  deleteDraft,
  renameDraft,
  duplicateDraft,
  formatDate,
  type Draft,
} from "../lib/drafts";

type DraftsManagerProps = {
  onResume: (draft: Draft) => void;
  onBack: () => void;
};

export function DraftsManager({ onResume, onBack }: DraftsManagerProps) {
  const [drafts, setDrafts] = useState<Draft[]>(listDrafts());
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const refresh = () => setDrafts(listDrafts());

  const handleRenameStart = (draft: Draft) => {
    setRenamingId(draft.id);
    setRenameValue(draft.name);
  };

  const handleRenameSubmit = (id: string) => {
    if (renameValue.trim()) {
      renameDraft(id, renameValue.trim());
      refresh();
    }
    setRenamingId(null);
  };

  const handleDuplicate = (id: string) => {
    duplicateDraft(id);
    refresh();
  };

  const handleDelete = (id: string) => {
    deleteDraft(id);
    setConfirmDeleteId(null);
    refresh();
  };

  const typeLabel = (type: string) =>
    type === "email" ? "Email" : "Web Page";

  const typeIcon = (type: string) =>
    type === "email" ? "\u2709\uFE0F" : "\uD83C\uDF10";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        padding: "40px 20px",
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "32px",
          }}
        >
          <div>
            <h1
              style={{
                color: "#ffffff",
                fontSize: "28px",
                fontWeight: 700,
                marginBottom: "4px",
              }}
            >
              My Drafts
            </h1>
            <p style={{ color: "#8888aa", fontSize: "14px" }}>
              {drafts.length} draft{drafts.length !== 1 ? "s" : ""} saved
            </p>
          </div>
          <button
            onClick={onBack}
            style={{
              padding: "10px 24px",
              backgroundColor: "#4361ee",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            + New Page
          </button>
        </div>

        {/* Empty state */}
        {drafts.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
              color: "#8888aa",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>
              {"\uD83D\uDCC4"}
            </div>
            <h3 style={{ fontSize: "18px", marginBottom: "8px", color: "#aaa" }}>
              No drafts yet
            </h3>
            <p style={{ fontSize: "14px" }}>
              Create a new page or email to get started.
            </p>
          </div>
        )}

        {/* Draft cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {drafts.map((draft) => (
            <div
              key={draft.id}
              style={{
                background: "#ffffff",
                borderRadius: "10px",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                transition: "box-shadow 0.2s",
              }}
            >
              {/* Left: info */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    fontSize: "28px",
                    width: "44px",
                    height: "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: draft.type === "email" ? "#eef2ff" : "#f0fdf4",
                    borderRadius: "8px",
                    flexShrink: 0,
                  }}
                >
                  {typeIcon(draft.type)}
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  {renamingId === draft.id ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleRenameSubmit(draft.id);
                      }}
                      style={{ display: "flex", gap: "8px" }}
                    >
                      <input
                        autoFocus
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onBlur={() => handleRenameSubmit(draft.id)}
                        style={{
                          flex: 1,
                          padding: "6px 10px",
                          border: "2px solid #4361ee",
                          borderRadius: "6px",
                          fontSize: "15px",
                          fontWeight: 600,
                          outline: "none",
                        }}
                      />
                    </form>
                  ) : (
                    <h3
                      style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#1a1a2e",
                        margin: 0,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {draft.name}
                    </h3>
                  )}
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#888",
                      margin: "2px 0 0 0",
                    }}
                  >
                    {typeLabel(draft.type)} &middot; Updated{" "}
                    {formatDate(draft.updatedAt)}
                  </p>
                </div>
              </div>

              {/* Right: actions */}
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  alignItems: "center",
                  flexShrink: 0,
                  marginLeft: "16px",
                }}
              >
                <button
                  onClick={() => onResume(draft)}
                  style={{
                    padding: "7px 18px",
                    backgroundColor: "#4361ee",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  Resume
                </button>
                <button
                  onClick={() => handleRenameStart(draft)}
                  title="Rename"
                  style={{
                    padding: "7px 10px",
                    backgroundColor: "#f0f0f0",
                    color: "#555",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  Rename
                </button>
                <button
                  onClick={() => handleDuplicate(draft.id)}
                  title="Duplicate"
                  style={{
                    padding: "7px 10px",
                    backgroundColor: "#f0f0f0",
                    color: "#555",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  Duplicate
                </button>
                {confirmDeleteId === draft.id ? (
                  <div style={{ display: "flex", gap: "4px" }}>
                    <button
                      onClick={() => handleDelete(draft.id)}
                      style={{
                        padding: "7px 12px",
                        backgroundColor: "#ef4444",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(null)}
                      style={{
                        padding: "7px 10px",
                        backgroundColor: "#f0f0f0",
                        color: "#555",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDeleteId(draft.id)}
                    title="Delete"
                    style={{
                      padding: "7px 10px",
                      backgroundColor: "#fef2f2",
                      color: "#ef4444",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "13px",
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <p
          style={{
            color: "#555577",
            fontSize: "13px",
            marginTop: "48px",
            textAlign: "center",
          }}
        >
          Drafts are saved in your browser's local storage.
        </p>
      </div>
    </div>
  );
}
