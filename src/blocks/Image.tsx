import type { ComponentConfig } from "@puckeditor/core";

export type ImageProps = {
  src: string;
  alt: string;
  width: string;
  alignment: "left" | "center" | "right";
  borderRadius: string;
};

export const ImageBlock: ComponentConfig<ImageProps> = {
  label: "Image",
  fields: {
    src: { type: "text", label: "Image URL" },
    alt: { type: "text", label: "Alt Text" },
    width: {
      type: "select",
      label: "Width",
      options: [
        { label: "Small (25%)", value: "25%" },
        { label: "Medium (50%)", value: "50%" },
        { label: "Large (75%)", value: "75%" },
        { label: "Full Width (100%)", value: "100%" },
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
    borderRadius: {
      type: "select",
      label: "Corners",
      options: [
        { label: "Sharp", value: "0" },
        { label: "Slightly Rounded", value: "8px" },
        { label: "Rounded", value: "16px" },
        { label: "Circle", value: "50%" },
      ],
    },
  },
  defaultProps: {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    alt: "Placeholder image",
    width: "100%",
    alignment: "center",
    borderRadius: "8px",
  },
  render: ({ src, alt, width, alignment, borderRadius }) => {
    const justifyMap: Record<string, string> = {
      left: "flex-start",
      center: "center",
      right: "flex-end",
    };
    return (
      <div
        style={{
          display: "flex",
          justifyContent: justifyMap[alignment],
          padding: "0.5rem 0",
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            width,
            maxWidth: "100%",
            height: "auto",
            borderRadius,
            display: "block",
          }}
        />
      </div>
    );
  },
};
