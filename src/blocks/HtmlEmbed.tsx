import type { ComponentConfig } from "@puckeditor/core";

export type HtmlEmbedProps = {
  code: string;
};

export const HtmlEmbedBlock: ComponentConfig<HtmlEmbedProps> = {
  label: "HTML Embed",
  fields: {
    code: { type: "textarea", label: "HTML Code" },
  },
  defaultProps: {
    code: '<div style="padding: 20px; background: #f0f4ff; border-radius: 8px; text-align: center; color: #4361ee;"><strong>Custom HTML Block</strong><br/>Paste any HTML here</div>',
  },
  render: ({ code }) => {
    return <div dangerouslySetInnerHTML={{ __html: code }} />;
  },
};
