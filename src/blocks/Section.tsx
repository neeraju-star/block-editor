import type { ComponentConfig } from "@puckeditor/core";
import type { ReactNode } from "react";

export type SectionProps = {
  backgroundColor: string;
  paddingTop: string;
  paddingBottom: string;
  paddingLeft: string;
  paddingRight: string;
  maxWidth: string;
  children: ReactNode;
};

export const SectionBlock: ComponentConfig<SectionProps> = {
  label: "Section",
  fields: {
    backgroundColor: { type: "text", label: "Background Color (hex)" },
    paddingTop: {
      type: "select",
      label: "Padding Top",
      options: [
        { label: "None", value: "0" },
        { label: "Small (16px)", value: "16px" },
        { label: "Medium (32px)", value: "32px" },
        { label: "Large (48px)", value: "48px" },
        { label: "XL (64px)", value: "64px" },
      ],
    },
    paddingBottom: {
      type: "select",
      label: "Padding Bottom",
      options: [
        { label: "None", value: "0" },
        { label: "Small (16px)", value: "16px" },
        { label: "Medium (32px)", value: "32px" },
        { label: "Large (48px)", value: "48px" },
        { label: "XL (64px)", value: "64px" },
      ],
    },
    paddingLeft: {
      type: "select",
      label: "Padding Left",
      options: [
        { label: "None", value: "0" },
        { label: "Small (16px)", value: "16px" },
        { label: "Medium (32px)", value: "32px" },
        { label: "Large (48px)", value: "48px" },
      ],
    },
    paddingRight: {
      type: "select",
      label: "Padding Right",
      options: [
        { label: "None", value: "0" },
        { label: "Small (16px)", value: "16px" },
        { label: "Medium (32px)", value: "32px" },
        { label: "Large (48px)", value: "48px" },
      ],
    },
    maxWidth: {
      type: "select",
      label: "Content Width",
      options: [
        { label: "Narrow (600px)", value: "600px" },
        { label: "Medium (800px)", value: "800px" },
        { label: "Wide (1000px)", value: "1000px" },
        { label: "Full Width", value: "100%" },
      ],
    },
  },
  defaultProps: {
    backgroundColor: "#ffffff",
    paddingTop: "32px",
    paddingBottom: "32px",
    paddingLeft: "32px",
    paddingRight: "32px",
    maxWidth: "100%",
  },
  render: ({
    backgroundColor,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    maxWidth,
    puck,
  }) => {
    return (
      <section
        style={{
          backgroundColor,
          paddingTop,
          paddingBottom,
          paddingLeft,
          paddingRight,
        }}
      >
        <div style={{ maxWidth, margin: "0 auto" }}>
          {puck.renderDropZone({ zone: "section-content" })}
        </div>
      </section>
    );
  },
};
