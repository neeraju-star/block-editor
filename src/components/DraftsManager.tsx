import { useState, useMemo } from "react";
import {
  listDrafts,
  deleteDraft,
  renameDraft,
  duplicateDraft,
  formatDate,
  type Draft,
  type DraftType,
} from "../lib/drafts";

type DraftsManagerProps = {
  onResume: (draft: Draft) => void;
  onBack: () => void;
  onImport?: () => void;
};

type SortOption = "newest" | "oldest" | "alpha";
type FilterTab = "all" | DraftType;

export function DraftsManager({ onResume, onBack, onImport }: DraftsManagerProps) {
  const [drafts, setDrafts] = useState<Draft[]>(listDrafts());
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<FilterTab>("all");
  const [sortOption, setSortOption] = useState<SortOption>("newest");

  const refresh = () => setDrafts(listDrafts());

  // Counts by type
  const counts = useMemo(() => {
    const all = drafts.length;
    const email = drafts.filter((d) => d.type === "email").length;
    const webpage = drafts.filter((d) => d.type === "webpage").length;
    return { all, email, webpage };
  }, [drafts]);

  // Filtered + sorted drafts
  const filteredDrafts = useMemo(() => {
    let result = [...drafts];

    // Filter by type
    if (filterTab !== "all") {
      result = result.filter((d) => d.type === filterTab);
    }

    // Search by name
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((d) => d.name.toLowerCase().includes(q));
    }

    // Sort
    switch (sortOption) {
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        break;
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        );
        break;
      case "alpha":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [drafts, filterTab, searchQuery, sortOption]);

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

  const handleClone = (id: string) => {
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

  const filterTabStyle = (isActive: boolean): React.CSSProperties => ({
    padding: "8px 18px",
    backgroundColor: isActive ? "#4361ee" : "rgba(255,255,255,0.08)",
    color: isActive ? "#fff" : "#8888aa",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  });

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
            marginBottom: "24px",
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
              Document Library
            </h1>
            <p style={{ color: "#8888aa", fontSize: "14px" }}>
              {drafts.length} document{drafts.length !== 1 ? "s" : ""} saved
            </p>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {onImport && (
              <button
                onClick={onImport}
                style={{
                  padding: "10px 24px",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Import File
              </button>
            )}
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
              + New Document
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: "16px" }}>
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              backgroundColor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "10px",
              color: "#ffffff",
              fontSize: "14px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Filter Tabs + Sort */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "6px",
              backgroundColor: "rgba(255,255,255,0.04)",
              padding: "4px",
              borderRadius: "10px",
            }}
          >
            <button
              onClick={() => setFilterTab("all")}
              style={filterTabStyle(filterTab === "all")}
            >
              All
              <span
                style={{
                  fontSize: "11px",
                  opacity: 0.7,
                  fontWeight: 500,
                }}
              >
                ({counts.all})
              </span>
            </button>
            <button
              onClick={() => setFilterTab("email")}
              style={filterTabStyle(filterTab === "email")}
            >
              Email
              <span
                style={{
                  fontSize: "11px",
                  opacity: 0.7,
                  fontWeight: 500,
                }}
              >
                ({counts.email})
              </span>
            </button>
            <button
              onClick={() => setFilterTab("webpage")}
              style={filterTabStyle(filterTab === "webpage")}
            >
              Web Page
              <span
                style={{
                  fontSize: "11px",
                  opacity: 0.7,
                  fontWeight: 500,
                }}
              >
                ({counts.webpage})
              </span>
            </button>
          </div>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            style={{
              padding: "8px 14px",
              backgroundColor: "rgba(255,255,255,0.08)",
              color: "#ccc",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "8px",
              fontSize: "13px",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="newest">Most Recent</option>
            <option value="oldest">Oldest First</option>
            <option value="alpha">Alphabetical</option>
          </select>
        </div>

        {/* Empty state */}
        {filteredDrafts.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
              color: "#8888aa",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>
              {searchQuery ? "\uD83D\uDD0D" : "\uD83D\uDCC4"}
            </div>
            <h3
              style={{ fontSize: "18px", marginBottom: "8px", color: "#aaa" }}
            >
              {searchQuery
                ? "No documents match your search"
                : "No documents yet"}
            </h3>
            <p style={{ fontSize: "14px" }}>
              {searchQuery
                ? "Try a different search term or filter."
                : "Create a new document or import a file to get started."}
            </p>
          </div>
        )}

        {/* Draft cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filteredDrafts.map((draft) => (
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
                    backgroundColor:
                      draft.type === "email" ? "#eef2ff" : "#f0fdf4",
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
                  Open
                </button>
                <button
                  onClick={() => handleClone(draft.id)}
                  title="Clone this document"
                  style={{
                    padding: "7px 14px",
                    backgroundColor: "#f0f0ff",
                    color: "#4361ee",
                    border: "1px solid #d0d0ee",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  Clone
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
          Documents are saved in your browser's local storage.
        </p>
      </div>
    </div>
  );
}
