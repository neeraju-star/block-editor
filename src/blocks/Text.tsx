import type { ComponentConfig } from "@puckeditor/core";
import { htmlToPlainText } from "../lib/pasteCleanup";

export type TextProps = {
  content: string;
  alignment: "left" | "center" | "right" | "justify";
  fontSize: string;
  color: string;
};

export const TextBlock: ComponentConfig<TextProps> = {
  label: "Text",
  fields: {
    content: {
      type: "custom",
      label: "Content",
      render: ({ value, onChange }) => {
        const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
          // Check if there is HTML content from clipboard
          const htmlData = e.clipboardData.getData("text/html");
          if (htmlData) {
            e.preventDefault();
            const cleanText = htmlToPlainText(htmlData);
            const textarea = e.currentTarget;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const currentValue = value ?? "";
            const newValue =
              currentValue.slice(0, start) +
              cleanText +
              currentValue.slice(end);
            onChange(newValue);
          }
          // If no HTML data, let the default paste handle plain text
        };

        return (
          <textarea
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            onPaste={handlePaste}
            placeholder="Paste or type your text content here..."
            style={{
              width: "100%",
              minHeight: "120px",
              padding: "10px 12px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "14px",
              fontFamily: "inherit",
              lineHeight: 1.6,
              resize: "vertical",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        );
      },
    },
    alignment: {
      type: "radio",
      label: "Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
        { label: "Justify", value: "justify" },
      ],
    },
    fontSize: {
      type: "select",
      label: "Font Size",
      options: [
        { label: "Small (14px)", value: "14px" },
        { label: "Normal (16px)", value: "16px" },
        { label: "Large (18px)", value: "18px" },
        { label: "XL (20px)", value: "20px" },
      ],
    },
    color: { type: "text", label: "Text Color (hex)" },
  },
  defaultProps: {
    content:
      "Add your text content here. You can write paragraphs, descriptions, or any textual content for your page or email.",
    alignment: "left",
    fontSize: "16px",
    color: "#333333",
  },
  render: ({ content, alignment, fontSize, color }) => {
    return (
      <p
        style={{
          textAlign: alignment,
          fontSize,
          color,
          lineHeight: 1.7,
          margin: "0.5rem 0",
        }}
      >
        {content}
      </p>
    );
  },
};
