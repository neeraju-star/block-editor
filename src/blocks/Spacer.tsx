import type { ComponentConfig } from "@puckeditor/core";

export type SpacerProps = {
  height: string;
};

export const SpacerBlock: ComponentConfig<SpacerProps> = {
  label: "Spacer",
  fields: {
    height: {
      type: "select",
      label: "Height",
      options: [
        { label: "Extra Small (8px)", value: "8px" },
        { label: "Small (16px)", value: "16px" },
        { label: "Medium (32px)", value: "32px" },
        { label: "Large (48px)", value: "48px" },
        { label: "Extra Large (64px)", value: "64px" },
        { label: "XXL (96px)", value: "96px" },
      ],
    },
  },
  defaultProps: {
    height: "32px",
  },
  render: ({ height }) => {
    return (
      <div
        style={{
          height,
          width: "100%",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "11px",
            color: "#ccc",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          ↕ {height}
        </div>
      </div>
    );
  },
};
