"use client";

import * as React from "react";
import { useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import type { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Crop,
  Trash2,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/tiptap-ui-primitive/button";
import { ToolbarSeparator } from "@/components/tiptap-ui-primitive/toolbar";
import type { ImageAlign } from "@/components/tiptap-node/image-node/image-node-extension";
import { ImageCropDialog } from "@/components/tiptap-ui/image-edit-menu/image-crop-dialog";

import "@/components/tiptap-ui/image-edit-menu/image-edit-menu.scss";

const ALIGNMENTS: { value: ImageAlign; label: string; Icon: LucideIcon }[] = [
  { value: "left", label: "Alinhar à esquerda", Icon: AlignLeft },
  { value: "center", label: "Centralizar", Icon: AlignCenter },
  { value: "right", label: "Alinhar à direita", Icon: AlignRight },
];

const WIDTHS = ["25%", "50%", "75%", "100%"];

/**
 * Controls for an image already in the body: size, alignment and removal.
 *
 * Floats over the selected image instead of living in the main toolbar, so
 * the options only appear when they apply to something.
 */
export function ImageEditMenu({ editor }: { editor: Editor | null }) {
  const state = useEditorState({
    editor,
    selector: ({ editor: instance }) => {
      if (!instance?.isActive("image")) return null;
      const attrs = instance.getAttributes("image");
      return {
        align: (attrs.align as ImageAlign | null) ?? null,
        // An image with no explicit width fills the column, which is what
        // "100%" means here - so that button reads as active by default.
        width: (attrs.width as string | null) ?? "100%",
        src: (attrs.src as string | undefined) ?? "",
      };
    },
  });

  // Held separately from `state`: the dialog has to keep rendering with the
  // image it was opened on, and selecting inside it drops the node selection.
  const [cropSrc, setCropSrc] = React.useState<string | null>(null);

  if (!editor) return null;

  const setAlign = (align: ImageAlign) =>
    editor
      .chain()
      .focus()
      .updateAttributes("image", {
        align: state?.align === align ? null : align,
      })
      .run();

  const setWidth = (width: string) =>
    editor
      .chain()
      .focus()
      .updateAttributes("image", { width: width === "100%" ? null : width })
      .run();

  return (
    <>
      <BubbleMenu
        editor={editor}
        shouldShow={({ editor: instance }) => instance.isActive("image")}
        options={{ placement: "top", offset: 8 }}
        className="tiptap-image-edit-menu"
      >
        {ALIGNMENTS.map(({ value, label, Icon }) => (
          <Button
            key={value}
            type="button"
            data-style="ghost"
            data-active-state={state?.align === value ? "on" : "off"}
            aria-label={label}
            tooltip={label}
            onClick={() => setAlign(value)}
          >
            <Icon className="tiptap-button-icon" />
          </Button>
        ))}

        <ToolbarSeparator />

        {WIDTHS.map((width) => (
          <Button
            key={width}
            type="button"
            data-style="ghost"
            data-active-state={state?.width === width ? "on" : "off"}
            aria-label={`Largura ${width}`}
            tooltip={`Largura ${width}`}
            onClick={() => setWidth(width)}
          >
            <span className="tiptap-button-text">{width}</span>
          </Button>
        ))}

        <ToolbarSeparator />

        <Button
          type="button"
          data-style="ghost"
          aria-label="Cortar imagem"
          tooltip="Cortar imagem"
          disabled={!state?.src}
          onClick={() => state?.src && setCropSrc(state.src)}
        >
          <Crop className="tiptap-button-icon" />
        </Button>

        <Button
          type="button"
          data-style="ghost"
          aria-label="Remover imagem"
          tooltip="Remover imagem"
          onClick={() => editor.chain().focus().deleteSelection().run()}
        >
          <Trash2 className="tiptap-button-icon" />
        </Button>
      </BubbleMenu>

      {cropSrc && (
        <ImageCropDialog
          open
          onOpenChange={(next) => !next && setCropSrc(null)}
          src={cropSrc}
          onCropped={(url) => {
            // The old file loses its last reference here, which is what tells the
            // backend it can be deleted from storage.
            editor
              .chain()
              .focus()
              .updateAttributes("image", { src: url })
              .run();
            setCropSrc(null);
          }}
        />
      )}
    </>
  );
}
