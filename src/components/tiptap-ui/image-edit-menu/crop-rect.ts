/**
 * Geometry for the crop selection.
 *
 * Every rectangle here is in the image's *natural* pixels, not screen pixels -
 * that way the selection survives a window resize, and exporting to canvas is
 * a straight copy with no conversion.
 */

export type Rect = { x: number; y: number; width: number; height: number };

export type Bounds = { width: number; height: number };

/** Corners and edges of the selection, named by compass direction. */
export type Handle = "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w";

export const HANDLES: Handle[] = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/** The largest rectangle of the given ratio that fits, centred on `bounds`. */
export function centeredRect(bounds: Bounds, aspect: number | null): Rect {
  if (!aspect) return { x: 0, y: 0, ...bounds };

  let width = bounds.width;
  let height = width / aspect;
  if (height > bounds.height) {
    height = bounds.height;
    width = height * aspect;
  }

  return {
    x: (bounds.width - width) / 2,
    y: (bounds.height - height) / 2,
    width,
    height,
  };
}

/**
 * Reshape an existing selection to a new ratio, keeping its centre where it is
 * so switching from 16:9 to 1:1 doesn't jump the crop across the image.
 */
export function fitToAspect(
  rect: Rect,
  aspect: number | null,
  bounds: Bounds,
): Rect {
  if (!aspect) return rect;

  const centerX = rect.x + rect.width / 2;
  const centerY = rect.y + rect.height / 2;

  let width = rect.width;
  let height = width / aspect;
  if (height > rect.height) {
    height = rect.height;
    width = height * aspect;
  }

  const scale = Math.min(bounds.width / width, bounds.height / height, 1);
  width *= scale;
  height *= scale;

  return {
    x: clamp(centerX - width / 2, 0, bounds.width - width),
    y: clamp(centerY - height / 2, 0, bounds.height - height),
    width,
    height,
  };
}

/** Drag the whole selection, stopping at the edges of the image. */
export function moveRect(
  start: Rect,
  dx: number,
  dy: number,
  bounds: Bounds,
): Rect {
  return {
    ...start,
    x: clamp(start.x + dx, 0, bounds.width - start.width),
    y: clamp(start.y + dy, 0, bounds.height - start.height),
  };
}

/**
 * Drag one handle.
 *
 * The corner (or side) opposite the handle stays put, which is what makes the
 * gesture feel right: grabbing the top-left pins the bottom-right. With a ratio
 * locked, the horizontal handles and the corners are driven by width and the
 * vertical ones by height, and the other dimension follows.
 */
export function resizeRect(
  start: Rect,
  handle: Handle,
  dx: number,
  dy: number,
  bounds: Bounds,
  aspect: number | null,
  minSize: number,
): Rect {
  const west = handle.includes("w");
  const east = handle.includes("e");
  const north = handle.includes("n");
  const south = handle.includes("s");

  const anchorX = west ? start.x + start.width : start.x;
  const anchorY = north ? start.y + start.height : start.y;

  const maxWidth = west ? anchorX : bounds.width - anchorX;
  const maxHeight = north ? anchorY : bounds.height - anchorY;

  // Floor these before anything else: dragging a handle past the opposite side
  // produces a negative size, and a negative would invert the scale factors
  // below and flip the selection inside out.
  let width = Math.max(minSize, start.width + (east ? dx : west ? -dx : 0));
  let height = Math.max(minSize, start.height + (south ? dy : north ? -dy : 0));

  if (aspect) {
    if (west || east) height = width / aspect;
    else width = height * aspect;

    // Shrink to whatever fits in both directions, then grow back to the minimum
    // if that overshot. Both steps scale the pair together - clamping the sides
    // independently is what would break the ratio.
    const shrink = Math.min(maxWidth / width, maxHeight / height, 1);
    width *= shrink;
    height *= shrink;

    const grow = Math.max(minSize / width, minSize / height, 1);
    width *= grow;
    height *= grow;
  } else {
    width = clamp(width, minSize, maxWidth);
    height = clamp(height, minSize, maxHeight);
  }

  return {
    x: west ? anchorX - width : anchorX,
    y: north ? anchorY - height : anchorY,
    width,
    height,
  };
}
