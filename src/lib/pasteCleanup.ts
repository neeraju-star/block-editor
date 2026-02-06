// ============================================================
// PASTE CLEANUP — Clean Word/Google Docs HTML on paste
// ============================================================

/**
 * Clean HTML pasted from Microsoft Word, Google Docs, or other rich-text sources.
 * Strips proprietary styles and tags while preserving meaningful structure.
 */
export function cleanWordHtml(html: string): string {
  let cleaned = html;

  // 1. Remove XML declarations and processing instructions
  cleaned = cleaned.replace(/<\?xml[^>]*>/gi, "");

  // 2. Remove conditional comments (<!--[if ...]> ... <![endif]-->)
  cleaned = cleaned.replace(/<!--\[if[^]*?<!\[endif\]-->/gi, "");

  // 3. Remove regular HTML comments
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, "");

  // 4. Remove Office/Word namespace tags (<o:p>, <w:...>, <m:...>, <st1:...>)
  cleaned = cleaned.replace(/<\/?(?:o|w|m|st\d+):[^>]*>/gi, "");

  // 5. Remove <xml> blocks
  cleaned = cleaned.replace(/<xml[^>]*>[\s\S]*?<\/xml>/gi, "");

  // 6. Remove <style> blocks (Word embeds huge style blocks)
  cleaned = cleaned.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");

  // 7. Remove <meta> tags
  cleaned = cleaned.replace(/<meta[^>]*\/?>/gi, "");

  // 8. Remove <link> tags
  cleaned = cleaned.replace(/<link[^>]*\/?>/gi, "");

  // 9. Remove all class attributes
  cleaned = cleaned.replace(/\s*class="[^"]*"/gi, "");
  cleaned = cleaned.replace(/\s*class='[^']*'/gi, "");

  // 10. Remove all style attributes containing mso- properties,
  //     or just remove all inline styles for simplicity
  cleaned = cleaned.replace(/\s*style="[^"]*"/gi, "");
  cleaned = cleaned.replace(/\s*style='[^']*'/gi, "");

  // 11. Remove data-* attributes
  cleaned = cleaned.replace(/\s*data-[a-z-]+="[^"]*"/gi, "");

  // 12. Remove lang, dir and other common Word attributes
  cleaned = cleaned.replace(/\s*lang="[^"]*"/gi, "");
  cleaned = cleaned.replace(/\s*dir="[^"]*"/gi, "");

  // 13. Convert <b> to <strong>
  cleaned = cleaned.replace(/<b(\s|>)/gi, "<strong$1");
  cleaned = cleaned.replace(/<\/b>/gi, "</strong>");

  // 14. Convert <i> to <em>
  cleaned = cleaned.replace(/<i(\s|>)/gi, "<em$1");
  cleaned = cleaned.replace(/<\/i>/gi, "</em>");

  // 15. Remove empty paragraphs (Word loves <p>&nbsp;</p>)
  cleaned = cleaned.replace(/<p[^>]*>\s*(&nbsp;|\u00A0)?\s*<\/p>/gi, "");

  // 16. Remove empty spans
  cleaned = cleaned.replace(/<span[^>]*>\s*<\/span>/gi, "");

  // 17. Collapse multiple <br> into paragraph breaks
  cleaned = cleaned.replace(/(<br\s*\/?\s*>){3,}/gi, "<br><br>");

  // 18. Remove empty tags (nested empty spans, divs, etc.)
  cleaned = cleaned.replace(/<(\w+)[^>]*>\s*<\/\1>/gi, "");

  // 19. Normalize whitespace (collapse multiple spaces, remove leading/trailing)
  cleaned = cleaned.replace(/\n\s*\n/g, "\n");
  cleaned = cleaned.trim();

  return cleaned;
}

/**
 * Convert pasted HTML to clean plain text, preserving structure.
 * Used for fields that accept plain text (like Puck's textarea).
 */
export function htmlToPlainText(html: string): string {
  // First clean the Word HTML
  const cleaned = cleanWordHtml(html);

  // Parse the cleaned HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(cleaned, "text/html");

  function extractText(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent ?? "";
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return "";

    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();

    // Block-level elements get newlines
    const blockTags = [
      "p",
      "div",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "li",
      "tr",
      "br",
      "hr",
      "blockquote",
      "pre",
    ];
    const isBlock = blockTags.includes(tag);

    // Line break
    if (tag === "br") return "\n";

    // Horizontal rule
    if (tag === "hr") return "\n---\n";

    // List items
    if (tag === "li") {
      const parent = el.parentElement;
      const isOrdered = parent?.tagName.toLowerCase() === "ol";
      const index = parent
        ? Array.from(parent.children).indexOf(el) + 1
        : 1;
      const prefix = isOrdered ? `${index}. ` : "• ";
      const childText = Array.from(el.childNodes).map(extractText).join("");
      return prefix + childText.trim() + "\n";
    }

    const childText = Array.from(el.childNodes).map(extractText).join("");

    if (isBlock) {
      return "\n" + childText.trim() + "\n";
    }

    return childText;
  }

  const result = extractText(doc.body);

  // Clean up multiple newlines
  return result.replace(/\n{3,}/g, "\n\n").trim();
}
