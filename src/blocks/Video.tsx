import type { ComponentConfig } from "@puckeditor/core";

export type VideoProps = {
  url: string;
  width: string;
  alignment: "left" | "center" | "right";
  borderRadius: string;
};

export const VideoBlock: ComponentConfig<VideoProps> = {
  label: "Video",
  fields: {
    url: { type: "text", label: "YouTube or Vimeo URL" },
    width: {
      type: "select",
      label: "Width",
      options: [
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
        { label: "Rounded", value: "12px" },
      ],
    },
  },
  defaultProps: {
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    width: "100%",
    alignment: "center",
    borderRadius: "12px",
  },
  render: ({ url, width, alignment, borderRadius }) => {
    const justifyMap: Record<string, string> = {
      left: "flex-start",
      center: "center",
      right: "flex-end",
    };

    // Convert YouTube/Vimeo URLs to embed
    let embedUrl = url;
    const ytMatch = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
    );
    if (ytMatch) {
      embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}`;
    }
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      embedUrl = `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }

    return (
      <div
        style={{
          display: "flex",
          justifyContent: justifyMap[alignment],
          padding: "0.5rem 0",
        }}
      >
        <div
          style={{
            width,
            position: "relative",
            paddingBottom: "56.25%",
            height: 0,
            overflow: "hidden",
            borderRadius,
          }}
        >
          <iframe
            src={embedUrl}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded video"
          />
        </div>
      </div>
    );
  },
};
