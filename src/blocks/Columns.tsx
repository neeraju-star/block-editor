import type { ComponentConfig } from "@puckeditor/core";

export type ColumnsProps = {
  layout: "50-50" | "33-33-33" | "25-25-25-25" | "66-33" | "33-66";
  gap: string;
  verticalAlign: "top" | "center" | "bottom";
};

export const ColumnsBlock: ComponentConfig<ColumnsProps> = {
  label: "Columns",
  fields: {
    layout: {
      type: "select",
      label: "Layout",
      options: [
        { label: "2 Columns (50/50)", value: "50-50" },
        { label: "3 Columns (33/33/33)", value: "33-33-33" },
        { label: "4 Columns (25/25/25/25)", value: "25-25-25-25" },
        { label: "2 Columns (66/33)", value: "66-33" },
        { label: "2 Columns (33/66)", value: "33-66" },
      ],
    },
    gap: {
      type: "select",
      label: "Gap Between Columns",
      options: [
        { label: "None", value: "0" },
        { label: "Small (12px)", value: "12px" },
        { label: "Medium (24px)", value: "24px" },
        { label: "Large (36px)", value: "36px" },
      ],
    },
    verticalAlign: {
      type: "radio",
      label: "Vertical Alignment",
      options: [
        { label: "Top", value: "top" },
        { label: "Center", value: "center" },
        { label: "Bottom", value: "bottom" },
      ],
    },
  },
  defaultProps: {
    layout: "50-50",
    gap: "24px",
    verticalAlign: "top",
  },
  render: ({ layout, gap, verticalAlign, puck }) => {
    const layoutMap: Record<string, string[]> = {
      "50-50": ["1fr", "1fr"],
      "33-33-33": ["1fr", "1fr", "1fr"],
      "25-25-25-25": ["1fr", "1fr", "1fr", "1fr"],
      "66-33": ["2fr", "1fr"],
      "33-66": ["1fr", "2fr"],
    };
    const alignMap: Record<string, string> = {
      top: "flex-start",
      center: "center",
      bottom: "flex-end",
    };

    const columns = layoutMap[layout] || ["1fr", "1fr"];

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: columns.join(" "),
          gap,
          alignItems: alignMap[verticalAlign],
          padding: "0.5rem 0",
        }}
      >
        {columns.map((_, index) => (
          <div
            key={index}
            style={{
              minHeight: "60px",
              border: "1px dashed #e0e0e0",
              borderRadius: "4px",
              padding: "8px",
            }}
          >
            {puck.renderDropZone({ zone: `column-${index}` })}
          </div>
        ))}
      </div>
    );
  },
};
