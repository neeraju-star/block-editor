import { useState } from "react";
import {
  emailTemplates,
  webPageTemplates,
  blankTemplate,
  type Template,
} from "../templates";
import { getDraftCount } from "../lib/drafts";
import type { Data } from "@puckeditor/core";
import type { DraftType } from "../lib/drafts";

type TemplateSelectorProps = {
  onSelect: (data: Data, name: string, type: DraftType) => void;
  onOpenDrafts: () => void;
};

type Tab = "email" | "webpage";

export function TemplateSelector({
  onSelect,
  onOpenDrafts,
}: TemplateSelectorProps) {
  const [activeTab, setActiveTab] = useState<Tab>("email");
  const draftCount = getDraftCount();

  const handleSelect = (template: Template) => {
    onSelect(template.data, template.name, template.type);
  };

  const handleBlank = (type: DraftType) => {
    onSelect(blankTemplate, "Untitled", type);
  };

  const tabStyle = (isActive: boolean): React.CSSProperties => ({
    padding: "10px 28px",
    backgroundColor: isActive ? "#4361ee" : "rgba(255,255,255,0.1)",
    color: isActive ? "#fff" : "#8888aa",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
    transition: "all 0.2s",
  });

  const templates = activeTab === "email" ? emailTemplates : webPageTemplates;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <h1
        style={{
          color: "#ffffff",
          fontSize: "36px",
          fontWeight: 700,
          marginBottom: "8px",
        }}
      >
        Visual Block Editor
      </h1>
      <p
        style={{
          color: "#8888aa",
          fontSize: "16px",
          marginBottom: "24px",
        }}
      >
        Choose a template to get started
      </p>

      {/* My Drafts Button */}
      {draftCount > 0 && (
        <button
          onClick={onOpenDrafts}
          style={{
            padding: "12px 32px",
            backgroundColor: "rgba(255,255,255,0.08)",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: 600,
            marginBottom: "32px",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "rgba(255,255,255,0.15)";
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "rgba(255,255,255,0.3)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "rgba(255,255,255,0.08)";
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "rgba(255,255,255,0.15)";
          }}
        >
          My Drafts
          <span
            style={{
              backgroundColor: "#4361ee",
              color: "#fff",
              fontSize: "12px",
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: "10px",
            }}
          >
            {draftCount}
          </span>
        </button>
      )}

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "32px",
          backgroundColor: "rgba(255,255,255,0.05)",
          padding: "4px",
          borderRadius: "10px",
        }}
      >
        <button
          onClick={() => setActiveTab("email")}
          style={tabStyle(activeTab === "email")}
        >
          Email Templates ({emailTemplates.length})
        </button>
        <button
          onClick={() => setActiveTab("webpage")}
          style={tabStyle(activeTab === "webpage")}
        >
          Web Page Templates ({webPageTemplates.length})
        </button>
      </div>

      {/* Blank canvas card */}
      <button
        onClick={() => handleBlank(activeTab)}
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "2px dashed rgba(255,255,255,0.2)",
          borderRadius: "12px",
          padding: "20px 40px",
          cursor: "pointer",
          textAlign: "center",
          marginBottom: "24px",
          transition: "all 0.2s ease",
          width: "100%",
          maxWidth: "960px",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor =
            "#4361ee";
          (e.currentTarget as HTMLButtonElement).style.background =
            "rgba(67,97,238,0.08)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor =
            "rgba(255,255,255,0.2)";
          (e.currentTarget as HTMLButtonElement).style.background =
            "rgba(255,255,255,0.05)";
        }}
      >
        <span style={{ fontSize: "24px" }}>{"\uD83D\uDCC4"}</span>
        <span
          style={{
            color: "#ffffff",
            fontSize: "15px",
            fontWeight: 600,
            marginLeft: "12px",
          }}
        >
          Start from Blank Canvas
        </span>
      </button>

      {/* Template grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px",
          maxWidth: "960px",
          width: "100%",
        }}
      >
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => handleSelect(template)}
            style={{
              background: "#ffffff",
              border: "2px solid transparent",
              borderRadius: "12px",
              padding: "28px 20px",
              cursor: "pointer",
              textAlign: "center",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "#4361ee";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(-4px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 8px 30px rgba(67,97,238,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "transparent";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(0)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 4px 20px rgba(0,0,0,0.1)";
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>
              {template.icon}
            </div>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#1a1a2e",
                marginBottom: "6px",
              }}
            >
              {template.name}
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "#666",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {template.description}
            </p>
          </button>
        ))}
      </div>

      <p
        style={{
          color: "#555577",
          fontSize: "13px",
          marginTop: "48px",
        }}
      >
        Powered by Puck Editor — Open Source, MIT Licensed
      </p>
    </div>
  );
}
