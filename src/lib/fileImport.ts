import type { Data } from "@puckeditor/core";

// ============================================================
// FILE IMPORT — Convert .docx and .pdf files to Puck block data
// ============================================================

/** Supported file types for import */
export type ImportableFileType = "docx" | "pdf";

/** Detect file type from a File object */
export function detectFileType(file: File): ImportableFileType | null {
  const name = file.name.toLowerCase();
  if (name.endsWith(".docx")) return "docx";
  if (name.endsWith(".pdf")) return "pdf";

  // Also check MIME type as fallback
  if (
    file.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  )
    return "docx";
  if (file.type === "application/pdf") return "pdf";

  return null;
}

/** Read file as ArrayBuffer */
function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsArrayBuffer(file);
  });
}

/** Generate a unique ID for Puck blocks */
function uid(): string {
  return `imp-${crypto.randomUUID().slice(0, 8)}`;
}

// ============================================================
// HTML to Puck Blocks Converter (shared by docx import)
// ============================================================

interface PuckBlock {
  type: string;
  props: Record<string, string>;
}

function htmlToPuckBlocks(html: string): PuckBlock[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const blocks: PuckBlock[] = [];

  function processNode(node: Node): void {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = (node.textContent ?? "").trim();
      if (text) {
        blocks.push({
          type: "Text",
          props: {
            id: uid(),
            content: text,
            alignment: "left",
            fontSize: "16px",
            color: "#333333",
          },
        });
      }
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();

    // Headings
    if (/^h[1-6]$/.test(tag)) {
      const level = tag as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      blocks.push({
        type: "Heading",
        props: {
          id: uid(),
          text: el.textContent?.trim() ?? "",
          level,
          alignment: "left",
          color: "#1a1a2e",
        },
      });
      return;
    }

    // Paragraphs
    if (tag === "p") {
      const text = el.textContent?.trim() ?? "";
      if (text) {
        blocks.push({
          type: "Text",
          props: {
            id: uid(),
            content: text,
            alignment: "left",
            fontSize: "16px",
            color: "#333333",
          },
        });
      }
      return;
    }

    // Images
    if (tag === "img") {
      const src = el.getAttribute("src") ?? "";
      const alt = el.getAttribute("alt") ?? "";
      if (src) {
        blocks.push({
          type: "Image",
          props: {
            id: uid(),
            src,
            alt,
            width: "100%",
            alignment: "center",
            borderRadius: "0px",
          },
        });
      }
      return;
    }

    // Horizontal rules
    if (tag === "hr") {
      blocks.push({
        type: "Divider",
        props: {
          id: uid(),
          color: "#e0e0e0",
          thickness: "1px",
          width: "100%",
          margin: "16px",
        },
      });
      return;
    }

    // Lists (ul, ol) — collect items into a single Text block
    if (tag === "ul" || tag === "ol") {
      const items = Array.from(el.querySelectorAll("li"));
      const prefix = tag === "ol" ? "numbered" : "bullet";
      const text = items
        .map((li, i) => {
          const bullet = prefix === "numbered" ? `${i + 1}. ` : "• ";
          return bullet + (li.textContent?.trim() ?? "");
        })
        .join("\n");

      if (text) {
        blocks.push({
          type: "Text",
          props: {
            id: uid(),
            content: text,
            alignment: "left",
            fontSize: "16px",
            color: "#333333",
          },
        });
      }
      return;
    }

    // Tables — convert to text representation
    if (tag === "table") {
      const rows = Array.from(el.querySelectorAll("tr"));
      const text = rows
        .map((row) => {
          const cells = Array.from(row.querySelectorAll("td, th"));
          return cells.map((c) => c.textContent?.trim() ?? "").join(" | ");
        })
        .join("\n");

      if (text) {
        blocks.push({
          type: "Text",
          props: {
            id: uid(),
            content: text,
            alignment: "left",
            fontSize: "16px",
            color: "#333333",
          },
        });
      }
      return;
    }

    // Block-level containers — recurse into children
    if (
      ["div", "section", "article", "main", "header", "footer", "body"].includes(tag)
    ) {
      for (const child of Array.from(el.childNodes)) {
        processNode(child);
      }
      return;
    }

    // Fallback: treat as text
    const text = el.textContent?.trim() ?? "";
    if (text) {
      blocks.push({
        type: "Text",
        props: {
          id: uid(),
          content: text,
          alignment: "left",
          fontSize: "16px",
          color: "#333333",
        },
      });
    }
  }

  for (const child of Array.from(doc.body.childNodes)) {
    processNode(child);
  }

  return blocks;
}

// ============================================================
// Plain text to Puck Blocks (for PDF)
// ============================================================

function textToPuckBlocks(text: string): PuckBlock[] {
  const blocks: PuckBlock[] = [];
  const lines = text.split("\n");
  let paragraph = "";

  function flushParagraph(): void {
    const trimmed = paragraph.trim();
    if (trimmed) {
      blocks.push({
        type: "Text",
        props: {
          id: uid(),
          content: trimmed,
          alignment: "left",
          fontSize: "16px",
          color: "#333333",
        },
      });
    }
    paragraph = "";
  }

  for (const line of lines) {
    const trimmed = line.trim();

    // Empty lines separate paragraphs
    if (!trimmed) {
      flushParagraph();
      continue;
    }

    // Simple heuristic: short lines in ALL CAPS or ending with no period → treat as heading
    if (
      trimmed.length < 100 &&
      (trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed))
    ) {
      flushParagraph();
      blocks.push({
        type: "Heading",
        props: {
          id: uid(),
          text: trimmed,
          level: "h2",
          alignment: "left",
          color: "#1a1a2e",
        },
      });
      continue;
    }

    // Accumulate paragraph text
    if (paragraph) {
      paragraph += " " + trimmed;
    } else {
      paragraph = trimmed;
    }
  }

  flushParagraph();
  return blocks;
}

// ============================================================
// DOCX Import
// ============================================================

async function importDocx(file: File): Promise<Data> {
  const arrayBuffer = await readFileAsArrayBuffer(file);
  const mammoth = await import("mammoth");
  const result = await mammoth.default.convertToHtml({ arrayBuffer });
  const blocks = htmlToPuckBlocks(result.value);

  return {
    content: blocks,
    root: { props: {} },
  };
}

// ============================================================
// PDF Import
// ============================================================

async function importPdf(file: File): Promise<Data> {
  const arrayBuffer = await readFileAsArrayBuffer(file);
  const pdfjsLib = await import("pdfjs-dist");

  // Set worker source to CDN
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const textParts: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => {
        if ("str" in item) return item.str;
        return "";
      })
      .join(" ");
    textParts.push(pageText);
  }

  const fullText = textParts.join("\n\n");
  const blocks = textToPuckBlocks(fullText);

  return {
    content: blocks,
    root: { props: {} },
  };
}

// ============================================================
// Main Import Function
// ============================================================

export async function importFile(file: File): Promise<Data> {
  const type = detectFileType(file);

  if (type === "docx") {
    return importDocx(file);
  }

  if (type === "pdf") {
    return importPdf(file);
  }

  throw new Error(
    `Unsupported file type: ${file.name}. Please upload a .docx or .pdf file.`
  );
}

/** Extract a clean document name from a filename */
export function fileToDocName(file: File): string {
  const name = file.name;
  const lastDot = name.lastIndexOf(".");
  return lastDot > 0 ? name.slice(0, lastDot) : name;
}
