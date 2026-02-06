import type { ComponentConfig } from "@puckeditor/core";

export type MenuProps = {
  items: string;
  alignment: "left" | "center" | "right";
  color: string;
  fontSize: string;
  separator: string;
};

export const MenuBlock: ComponentConfig<MenuProps> = {
  label: "Menu",
  fields: {
    items: {
      type: "textarea",
      label: "Menu Items (one per line: Label | URL)",
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
    color: { type: "text", label: "Link Color (hex)" },
    fontSize: {
      type: "select",
      label: "Font Size",
      options: [
        { label: "Small (13px)", value: "13px" },
        { label: "Normal (15px)", value: "15px" },
        { label: "Large (17px)", value: "17px" },
      ],
    },
    separator: {
      type: "select",
      label: "Separator",
      options: [
        { label: "Pipe ( | )", value: "|" },
        { label: "Dot ( · )", value: "·" },
        { label: "Dash ( — )", value: "—" },
        { label: "None", value: "" },
      ],
    },
  },
  defaultProps: {
    items: "Home | #\nAbout | #about\nServices | #services\nContact | #contact",
    alignment: "center",
    color: "#4361ee",
    fontSize: "15px",
    separator: "|",
  },
  render: ({ items, alignment, color, fontSize, separator }) => {
    const parsedItems = items
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [label, url] = line.split("|").map((s) => s.trim());
        return { label: label || "Link", url: url || "#" };
      });

    const justifyMap: Record<string, string> = {
      left: "flex-start",
      center: "center",
      right: "flex-end",
    };

    return (
      <nav
        style={{
          display: "flex",
          justifyContent: justifyMap[alignment],
          gap: "8px",
          flexWrap: "wrap",
          padding: "0.75rem 0",
          alignItems: "center",
        }}
      >
        {parsedItems.map((item, index) => (
          <span key={index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {index > 0 && separator && (
              <span style={{ color: "#ccc", fontSize }}>{separator}</span>
            )}
            <a
              href={item.url}
              style={{
                color,
                fontSize,
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              {item.label}
            </a>
          </span>
        ))}
      </nav>
    );
  },
};
