import type { ComponentConfig } from "@puckeditor/core";

export type ButtonProps = {
  label: string;
  url: string;
  variant: "primary" | "secondary" | "outline";
  size: "small" | "medium" | "large";
  alignment: "left" | "center" | "right";
  color: string;
  borderRadius: string;
};

export const ButtonBlock: ComponentConfig<ButtonProps> = {
  label: "Button",
  fields: {
    label: { type: "text", label: "Button Text" },
    url: { type: "text", label: "Link URL" },
    variant: {
      type: "select",
      label: "Style",
      options: [
        { label: "Primary (Filled)", value: "primary" },
        { label: "Secondary (Light)", value: "secondary" },
        { label: "Outline", value: "outline" },
      ],
    },
    size: {
      type: "radio",
      label: "Size",
      options: [
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
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
    color: { type: "text", label: "Brand Color (hex)" },
    borderRadius: {
      type: "select",
      label: "Corners",
      options: [
        { label: "Sharp", value: "0" },
        { label: "Rounded", value: "6px" },
        { label: "Pill", value: "50px" },
      ],
    },
  },
  defaultProps: {
    label: "Click Here",
    url: "#",
    variant: "primary",
    size: "medium",
    alignment: "center",
    color: "#4361ee",
    borderRadius: "6px",
  },
  render: ({ label, url, variant, size, alignment, color, borderRadius }) => {
    const paddings: Record<string, string> = {
      small: "8px 20px",
      medium: "12px 32px",
      large: "16px 44px",
    };
    const fontSizes: Record<string, string> = {
      small: "13px",
      medium: "15px",
      large: "17px",
    };
    const justifyMap: Record<string, string> = {
      left: "flex-start",
      center: "center",
      right: "flex-end",
    };

    const baseStyle: React.CSSProperties = {
      display: "inline-block",
      padding: paddings[size],
      fontSize: fontSizes[size],
      fontWeight: 600,
      textDecoration: "none",
      borderRadius,
      cursor: "pointer",
      transition: "all 0.2s ease",
      border: `2px solid ${color}`,
      fontFamily: "inherit",
    };

    const variantStyles: Record<string, React.CSSProperties> = {
      primary: {
        backgroundColor: color,
        color: "#ffffff",
      },
      secondary: {
        backgroundColor: `${color}15`,
        color: color,
      },
      outline: {
        backgroundColor: "transparent",
        color: color,
      },
    };

    return (
      <div
        style={{
          display: "flex",
          justifyContent: justifyMap[alignment],
          padding: "0.5rem 0",
        }}
      >
        <a href={url} style={{ ...baseStyle, ...variantStyles[variant] }}>
          {label}
        </a>
      </div>
    );
  },
};
