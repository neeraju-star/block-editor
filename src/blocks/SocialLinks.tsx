import type { ComponentConfig } from "@puckeditor/core";

export type SocialLinksProps = {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  size: "small" | "medium" | "large";
  alignment: "left" | "center" | "right";
  color: string;
};

const SocialIcon = ({
  platform,
  size,
  color,
}: {
  platform: string;
  size: number;
  color: string;
}) => {
  const icons: Record<string, string> = {
    facebook: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
    twitter: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
    instagram: "M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm3.5-6.5a1 1 0 110-2 1 1 0 010 2z",
    linkedin: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z",
    youtube: "M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z",
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={icons[platform] || ""} />
    </svg>
  );
};

export const SocialLinksBlock: ComponentConfig<SocialLinksProps> = {
  label: "Social Links",
  fields: {
    facebook: { type: "text", label: "Facebook URL" },
    twitter: { type: "text", label: "Twitter / X URL" },
    instagram: { type: "text", label: "Instagram URL" },
    linkedin: { type: "text", label: "LinkedIn URL" },
    youtube: { type: "text", label: "YouTube URL" },
    size: {
      type: "radio",
      label: "Icon Size",
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
    color: { type: "text", label: "Icon Color (hex)" },
  },
  defaultProps: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    youtube: "",
    size: "medium",
    alignment: "center",
    color: "#555555",
  },
  render: ({
    facebook,
    twitter,
    instagram,
    linkedin,
    youtube,
    size,
    alignment,
    color,
  }) => {
    const iconSizes: Record<string, number> = {
      small: 20,
      medium: 28,
      large: 36,
    };
    const iconSize = iconSizes[size];
    const justifyMap: Record<string, string> = {
      left: "flex-start",
      center: "center",
      right: "flex-end",
    };

    const links = [
      { platform: "facebook", url: facebook },
      { platform: "twitter", url: twitter },
      { platform: "instagram", url: instagram },
      { platform: "linkedin", url: linkedin },
      { platform: "youtube", url: youtube },
    ].filter((l) => l.url);

    return (
      <div
        style={{
          display: "flex",
          justifyContent: justifyMap[alignment],
          gap: "16px",
          padding: "0.75rem 0",
          flexWrap: "wrap",
        }}
      >
        {links.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: iconSize + 16,
              height: iconSize + 16,
              borderRadius: "50%",
              backgroundColor: `${color}10`,
              transition: "background-color 0.2s",
            }}
          >
            <SocialIcon
              platform={link.platform}
              size={iconSize}
              color={color}
            />
          </a>
        ))}
      </div>
    );
  },
};
