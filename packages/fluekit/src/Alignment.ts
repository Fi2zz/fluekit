import { CSSProperties } from "vue";

/**
 * Alignment Geometry
 * 对应 Flutter 的 Alignment 常量
 */
export const Alignment = {
  topLeft: "topLeft",
  topCenter: "topCenter",
  topRight: "topRight",
  centerLeft: "centerLeft",
  center: "center",
  centerRight: "centerRight",
  bottomLeft: "bottomLeft",
  bottomCenter: "bottomCenter",
  bottomRight: "bottomRight",
} as const;

export type Alignment = keyof typeof Alignment | string;

/**
 * 将 Alignment 转换为 Flexbox 样式
 * @param alignment
 * @param direction "row" (default) or "column"
 */
export function alignmentToFlex(
  alignment: Alignment,
  direction: "row" | "column" = "row",
): CSSProperties {
  if (!alignment) return {};
  const align = alignment as keyof typeof Alignment;

  // Mapping logic
  // justify-content (main axis), align-items (cross axis)
  // For Row: main=horizontal, cross=vertical
  // For Column: main=vertical, cross=horizontal

  let justifyContent = "flex-start";
  let alignItems = "flex-start";

  // Parse horizontal
  if (align.toLowerCase().includes("left")) {
    // horizontal start
  } else if (align.toLowerCase().includes("right")) {
    // horizontal end
  } else {
    // horizontal center (center, topCenter, bottomCenter)
  }

  // To simplify, let's use a lookup table for standard values
  // { horizontal, vertical }
  // horizontal: flex-start, center, flex-end
  // vertical: flex-start, center, flex-end

  const map: Record<string, { x: string; y: string }> = {
    topLeft: { x: "flex-start", y: "flex-start" },
    topCenter: { x: "center", y: "flex-start" },
    topRight: { x: "flex-end", y: "flex-start" },
    centerLeft: { x: "flex-start", y: "center" },
    center: { x: "center", y: "center" },
    centerRight: { x: "flex-end", y: "center" },
    bottomLeft: { x: "flex-start", y: "flex-end" },
    bottomCenter: { x: "center", y: "flex-end" },
    bottomRight: { x: "flex-end", y: "flex-end" },
  };

  const pos = map[align] || { x: "flex-start", y: "flex-start" }; // default fallback

  if (direction === "row") {
    justifyContent = pos.x;
    alignItems = pos.y;
  } else {
    justifyContent = pos.y;
    alignItems = pos.x;
  }

  return { justifyContent, alignItems };
}

// Alias for compatibility if needed, or prefer using alignmentToFlex directly
export const alignmentToStyle = alignmentToFlex;

/**
 * 将 Alignment 转换为 CSS background-position / object-position 字符串
 * e.g. "left top", "center", "right bottom"
 */
export function alignmentToCssPosition(alignment: Alignment): string {
  const map: Record<string, string> = {
    topLeft: "left top",
    topCenter: "center top",
    topRight: "right top",
    centerLeft: "left center",
    center: "center",
    centerRight: "right center",
    bottomLeft: "left bottom",
    bottomCenter: "center bottom",
    bottomRight: "right bottom",
  };
  return map[alignment as string] || "center";
}

/**
 * 将 Alignment 转换为 CSS transform-origin
 */
export function alignmentToOrigin(alignment: Alignment): string {
  // Usually same as css position for transform-origin
  return alignmentToCssPosition(alignment);
}

/**
 * 将 Alignment 转换为 Grid Alignment (justify-items / align-items)
 * 用于 Stack
 */
export function alignmentToGrid(alignment: Alignment): CSSProperties {
  const map: Record<string, { justifyItems: string; alignItems: string }> = {
    topLeft: { justifyItems: "start", alignItems: "start" },
    topCenter: { justifyItems: "center", alignItems: "start" },
    topRight: { justifyItems: "end", alignItems: "start" },
    centerLeft: { justifyItems: "start", alignItems: "center" },
    center: { justifyItems: "center", alignItems: "center" },
    centerRight: { justifyItems: "end", alignItems: "center" },
    bottomLeft: { justifyItems: "start", alignItems: "end" },
    bottomCenter: { justifyItems: "center", alignItems: "end" },
    bottomRight: { justifyItems: "end", alignItems: "end" },
  };

  const res = map[alignment as string] || { justifyItems: "start", alignItems: "start" };
  return res;
}
