import type { ComponentConfig } from "@puckeditor/core";

export type TextProps = {
  content: string;
  alignment: "left" | "center" | "right" | "justify";
  fontSize: string;
  color: string;
};

export const TextBlock: ComponentConfig<TextProps> = {
  label: "Text",
  fields: {
    content: { type: "textarea", label: "Content" },
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
