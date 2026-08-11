"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { handleImageUpload } from "@/lib/tiptap-utils";

import {
  centeredRect,
  fitToAspect,
  moveRect,
  resizeRect,
  HANDLES,
  type Bounds,
  type Handle,
  type Rect,
} from "./crop-rect";

const ASPECTS: { label: string; value: number | null }[] = [
  { label: "Livre", value: null },
  { label: "1:1", value: 1 },
  { label: "4:3", value: 4 / 3 },
  { label: "3:4", value: 3 / 4 },
  { label: "16:9", value: 16 / 9 },
  { label: "9:16", value: 9 / 16 },
];

/** Screen-pixel size of a handle, and the smallest selection we allow. */
const HANDLE_PX = 12;
const MIN_SELECTION_PX = 24;

const HANDLE_CURSORS: Record<Handle, string> = {
  nw: "cursor-nwse-resize",
  n: "cursor-ns-resize",
  ne: "cursor-nesw-resize",
  e: "cursor-ew-resize",
  se: "cursor-nwse-resize",
  s: "cursor-ns-resize",
  sw: "cursor-nesw-resize",
  w: "cursor-ew-resize",
};

/** Where a handle sits on the selection, as CSS percentages. */
const HANDLE_POSITION: Record<Handle, { left: string; top: string }> = {
  nw: { left: "0%", top: "0%" },
  n: { left: "50%", top: "0%" },
  ne: { left: "100%", top: "0%" },
  e: { left: "100%", top: "50%" },
  se: { left: "100%", top: "100%" },
  s: { left: "50%", top: "100%" },
  sw: { left: "0%", top: "100%" },
  w: { left: "0%", top: "50%" },
};

type DragState = {
  handle: Handle | "move";
  startRect: Rect;
  pointerX: number;
  pointerY: number;
};

/** Letterbox the image inside the stage, the way `object-contain` would. */
function containIn(natural: Bounds, stage: Bounds) {
  if (!natural.width || !natural.height || !stage.width || !stage.height) {
    return { left: 0, top: 0, width: 0, height: 0, scale: 1 };
  }
  const scale = Math.min(
    stage.width / natural.width,
    stage.height / natural.height,
  );
  const width = natural.width * scale;
  const height = natural.height * scale;
  return {
    left: (stage.width - width) / 2,
    top: (stage.height - height) / 2,
    width,
    height,
    scale,
  };
}

/**
 * Keep PNGs as PNGs so transparency survives; everything else re-encodes as
 * JPEG, which is a lot smaller for photos.
 */
function outputFormat(src: string) {
  let isPng = false;
  try {
    isPng = new URL(src).pathname.toLowerCase().endsWith(".png");
  } catch {
    isPng = src.toLowerCase().includes(".png");
  }
  return isPng
    ? { type: "image/png", quality: undefined, extension: "png" }
    : { type: "image/jpeg", quality: 0.92, extension: "jpg" };
}

export type ImageCropDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  src: string;
  /** Receives the URL of the freshly uploaded, cropped image. */
  onCropped: (url: string) => void;
};

/**
 * Crop an image already in the memory body.
 *
 * The crop is baked into a new file rather than stored as parameters: the body
 * is persisted as plain HTML, so the result has to be a real image to survive a
 * save. The previous file stops being referenced and the backend collects it.
 */
export function ImageCropDialog({
  open,
  onOpenChange,
  src,
  onCropped,
}: ImageCropDialogProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const dragRef = React.useRef<DragState | null>(null);

  const [image, setImage] = React.useState<HTMLImageElement | null>(null);
  const [loadError, setLoadError] = React.useState(false);
  const [stage, setStage] = React.useState<Bounds>({ width: 0, height: 0 });
  const [rect, setRect] = React.useState<Rect | null>(null);
  const [aspect, setAspect] = React.useState<number | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

  // Load the source separately from the <img> we render, so the natural size is
  // known before the first paint of the selection. crossOrigin is what keeps
  // the canvas untainted later - without it toBlob would throw on export.
  React.useEffect(() => {
    if (!open || !src) return;

    setImage(null);
    setLoadError(false);
    setRect(null);
    setAspect(null);

    const element = new window.Image();
    element.crossOrigin = "anonymous";

    let cancelled = false;
    element.onload = () => {
      if (cancelled) return;
      setImage(element);
      setRect({
        x: 0,
        y: 0,
        width: element.naturalWidth,
        height: element.naturalHeight,
      });
    };
    element.onerror = () => {
      if (!cancelled) setLoadError(true);
    };
    element.src = src;

    return () => {
      cancelled = true;
    };
  }, [open, src]);

  // The stage is sized by the viewport, so the selection has to be re-projected
  // whenever it changes.
  React.useEffect(() => {
    const node = stageRef.current;
    if (!node || !open) return;

    const observer = new ResizeObserver(([entry]) => {
      setStage({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [open]);

  const natural: Bounds = React.useMemo(
    () => ({
      width: image?.naturalWidth ?? 0,
      height: image?.naturalHeight ?? 0,
    }),
    [image],
  );

  const fit = React.useMemo(() => containIn(natural, stage), [natural, stage]);

  const handleAspectChange = (value: number | null) => {
    setAspect(value);
    setRect((current) => {
      if (!current) return current;
      return value === null
        ? current
        : fitToAspect(centeredRect(natural, value), value, natural);
    });
  };

  const startDrag =
    (handle: Handle | "move") => (event: React.PointerEvent<HTMLElement>) => {
      if (!rect) return;
      event.preventDefault();
      event.stopPropagation();
      event.currentTarget.setPointerCapture(event.pointerId);
      dragRef.current = {
        handle,
        startRect: rect,
        pointerX: event.clientX,
        pointerY: event.clientY,
      };
    };

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (!drag || !fit.scale) return;

    // Pointer travel is in screen pixels; the selection lives in natural ones.
    const dx = (event.clientX - drag.pointerX) / fit.scale;
    const dy = (event.clientY - drag.pointerY) / fit.scale;

    setRect(
      drag.handle === "move"
        ? moveRect(drag.startRect, dx, dy, natural)
        : resizeRect(
            drag.startRect,
            drag.handle,
            dx,
            dy,
            natural,
            aspect,
            MIN_SELECTION_PX / fit.scale,
          ),
    );
  };

  const endDrag = (event: React.PointerEvent<HTMLElement>) => {
    if (!dragRef.current) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    dragRef.current = null;
  };

  const handleApply = async () => {
    if (!image || !rect) return;

    setIsSaving(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(rect.width));
      canvas.height = Math.max(1, Math.round(rect.height));

      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas 2D não disponível");

      const { type, quality, extension } = outputFormat(src);
      if (type === "image/jpeg") {
        // JPEG has no alpha; without this, transparent source pixels turn black.
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }

      context.drawImage(
        image,
        rect.x,
        rect.y,
        rect.width,
        rect.height,
        0,
        0,
        canvas.width,
        canvas.height,
      );

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, type, quality),
      );
      if (!blob) throw new Error("Não foi possível gerar a imagem cortada");

      const url = await handleImageUpload(
        new File([blob], `corte-${Date.now()}.${extension}`, { type }),
      );

      onCropped(url);
      onOpenChange(false);
    } catch (error) {
      console.error("Falha ao cortar a imagem", error);
      setLoadError(true);
    } finally {
      setIsSaving(false);
    }
  };

  const selection = rect
    ? {
        left: fit.left + rect.x * fit.scale,
        top: fit.top + rect.y * fit.scale,
        width: rect.width * fit.scale,
        height: rect.height * fit.scale,
      }
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Cortar imagem</DialogTitle>
          <DialogDescription>
            Arraste as arestas ou os cantos para ajustar o corte.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap gap-1">
          {ASPECTS.map((option) => (
            <Button
              key={option.label}
              type="button"
              size="sm"
              variant={aspect === option.value ? "default" : "outline"}
              className={cn(
                "cursor-pointer !transition-colors",
                aspect === option.value && "bg-violet-500 hover:bg-violet-600",
              )}
              onClick={() => handleAspectChange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>

        <div
          ref={stageRef}
          className="relative h-[55vh] w-full touch-none overflow-hidden rounded-md bg-gray-900 select-none"
        >
          {loadError && (
            <p className="text-muted-foreground absolute inset-0 flex items-center justify-center px-6 text-center text-sm">
              Não foi possível carregar esta imagem para edição.
            </p>
          )}

          {!loadError && !image && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <Loader2 className="animate-spin" size={20} />
            </div>
          )}

          {image && selection && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                draggable={false}
                crossOrigin="anonymous"
                className="pointer-events-none absolute"
                style={{
                  left: fit.left,
                  top: fit.top,
                  width: fit.width,
                  height: fit.height,
                }}
              />

              <div
                onPointerDown={startDrag("move")}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                className="absolute cursor-move"
                style={{
                  ...selection,
                  // Dims everything outside the selection in one shot, instead
                  // of four separately positioned mask elements.
                  boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.55)",
                  outline: "1px solid rgba(255, 255, 255, 0.9)",
                }}
              >
                {HANDLES.map((handle) => (
                  <span
                    key={handle}
                    onPointerDown={startDrag(handle)}
                    onPointerMove={onPointerMove}
                    onPointerUp={endDrag}
                    onPointerCancel={endDrag}
                    className={cn(
                      "absolute rounded-xs border border-gray-400 bg-white",
                      HANDLE_CURSORS[handle],
                    )}
                    style={{
                      width: HANDLE_PX,
                      height: HANDLE_PX,
                      ...HANDLE_POSITION[handle],
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer !transition-colors"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            disabled={!image || !rect || isSaving}
            onClick={handleApply}
            className="cursor-pointer bg-violet-500 text-white !transition-colors hover:bg-violet-600"
          >
            {isSaving ? "Salvando..." : "Aplicar corte"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
