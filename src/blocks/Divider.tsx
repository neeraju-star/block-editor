import type { ComponentConfig } from "@puckeditor/core";

export type DividerProps = {
  style: "solid" | "dashed" | "dotted";
  color: string;
  thickness: string;
  width: string;
  alignment: "left" | "center" | "right";
  spacing: string;
};

export const DividerBlock: ComponentConfig<DividerProps> = {
  label: "Divider",
  fields: {
    style: {
      type: "select",
      label: "Style",
      options: [
        { label: "Solid Line", value: "solid" },
        { label: "Dashed Line", value: "dashed" },
        { label: "Dotted Line", value: "dotted" },
      ],
    },
    color: { type: "text", label: "Color (hex)" },
    thickness: {
      type: "select",
      label: "Thickness",
      options: [
        { label: "Thin (1px)", value: "1px" },
        { label: "Medium (2px)", value: "2px" },
        { label: "Thick (3px)", value: "3px" },
      ],
    },
    width: {
      type: "select",
      label: "Width",
      options: [
        { label: "25%", value: "25%" },
        { label: "50%", value: "50%" },
        { label: "75%", value: "75%" },
        { label: "100%", value: "100%" },
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
    spacing: {
      type: "select",
      label: "Vertical Spacing",
      options: [
        { label: "Small (8px)", value: "8px" },
        { label: "Medium (16px)", value: "16px" },
        { label: "Large (24px)", value: "24px" },
        { label: "Extra Large (32px)", value: "32px" },
      ],
    },
  },
  defaultProps: {
    style: "solid",
    color: "#e0e0e0",
    thickness: "1px",
    width: "100%",
    alignment: "center",
    spacing: "16px",
  },
  render: ({
    style: borderStyle,
    color,
    thickness,
    width,
    alignment,
    spacing,
  }) => {
    const marginMap: Record<string, string> = {
      left: "0 auto 0 0",
      center: "0 auto",
      right: "0 0 0 auto",
    };
    return (
      <div style={{ padding: `${spacing} 0` }}>
        <hr
          style={{
            border: "none",
            borderTop: `${thickness} ${borderStyle} ${color}`,
            width,
            margin: marginMap[alignment],
          }}
        />
      </div>
    );
  },
};
