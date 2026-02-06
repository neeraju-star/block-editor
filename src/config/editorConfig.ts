import type { Config } from "@puckeditor/core";
import {
  HeadingBlock,
  TextBlock,
  ImageBlock,
  ButtonBlock,
  VideoBlock,
  SocialLinksBlock,
  SpacerBlock,
  DividerBlock,
  MenuBlock,
  HtmlEmbedBlock,
  SectionBlock,
  ColumnsBlock,
} from "../blocks";

export const editorConfig: Config = {
  categories: {
    layout: {
      title: "Layout",
      components: ["Section", "Columns", "Spacer", "Divider"],
    },
    content: {
      title: "Content",
      components: ["Heading", "Text", "Image", "Button"],
    },
    media: {
      title: "Media",
      components: ["Video", "SocialLinks"],
    },
    navigation: {
      title: "Navigation",
      components: ["Menu"],
    },
    advanced: {
      title: "Advanced",
      components: ["HtmlEmbed"],
    },
  },
  components: {
    Heading: HeadingBlock as any,
    Text: TextBlock as any,
    Image: ImageBlock as any,
    Button: ButtonBlock as any,
    Video: VideoBlock as any,
    SocialLinks: SocialLinksBlock as any,
    Spacer: SpacerBlock as any,
    Divider: DividerBlock as any,
    Menu: MenuBlock as any,
    HtmlEmbed: HtmlEmbedBlock as any,
    Section: SectionBlock as any,
    Columns: ColumnsBlock as any,
  },
};
