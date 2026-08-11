import { Image } from "@tiptap/extension-image";

export type ImageAlign = "left" | "center" | "right";

const ALIGN_STYLES: Record<ImageAlign, string> = {
  left: "margin-left: 0; margin-right: auto",
  center: "margin-left: auto; margin-right: auto",
  right: "margin-left: auto; margin-right: 0",
};

/**
 * The stock Image node stores nothing but `src`/`alt`/`title`, so there is no
 * way to lay an image out once it is in the document. This adds `width` and
 * `align`, written into the tag as inline styles (plus `data-align`, which is
 * what parsing reads back) so a memory keeps its layout across saves - the
 * body is persisted as plain HTML, so anything not in the markup is lost.
 */
export const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),

      width: {
        default: null,
        parseHTML: (element) =>
          element.style.width || element.getAttribute("width") || null,
        renderHTML: (attributes) =>
          attributes.width ? { style: `width: ${attributes.width}` } : {},
      },

      align: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-align"),
        renderHTML: (attributes) => {
          const align = attributes.align as ImageAlign | null;
          if (!align) return {};
          return { "data-align": align, style: ALIGN_STYLES[align] };
        },
      },
    };
  },
});
