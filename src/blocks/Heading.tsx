import type { ComponentConfig } from "@puckeditor/core";

export type HeadingProps = {
  text: string;
  level: "h1" | "h2" | "h3" | "h4";
  alignment: "left" | "center" | "right";
  color: string;
};

export const HeadingBlock: ComponentConfig<HeadingProps> = {
  label: "Heading",
  fields: {
    text: { type: "text", label: "Heading Text" },
    level: {
      type: "select",
      label: "Level",
      options: [
        { label: "H1 — Main Heading", value: "h1" },
        { label: "H2 — Section Heading", value: "h2" },
        { label: "H3 — Sub Heading", value: "h3" },
        { label: "H4 — Small Heading", value: "h4" },
      ],
    },
    alignment: {
      type: "radio",
      label: "Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    color: { type: "text", label: "Text Color (hex)" },
  },
  defaultProps: {
    text: "Your Heading Here",
    level: "h1",
    alignment: "left",
    color: "#1a1a2e",
  },
  render: ({ text, level, alignment, color }) => {
    const Tag = level;
    const sizes: Record<string, string> = {
      h1: "2.5rem",
      h2: "2rem",
      h3: "1.5rem",
      h4: "1.25rem",
    };
    return (
      <Tag
        style={{
          textAlign: alignment,
          color,
          fontSize: sizes[level],
          fontWeight: 700,
          margin: "0.5rem 0",
          lineHeight: 1.3,
        }}
      >
        {text}
      </Tag>
    );
  },
};
