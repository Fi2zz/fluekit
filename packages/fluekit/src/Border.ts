import { px2vw } from "./px2vw";
import { CSSProperties } from "vue";
export type BorderStyleType = "none" | "solid" | "dashed" | "dotted" | "double";
export type BorderSide = {
  width?: number | string;
  color?: string;
  style?: BorderStyleType;
};

export function Border(side: BorderSide): BorderSide {
  return {
    width: side.width ? side.width : 1,
    color: side.color || "#000",
    style: side.style || "solid",
  };
}

// Static methods for Flutter-like API
Border.all = ({
  color,
  width,
  style,
}: {
  color?: string;
  width?: number | string;
  style?: BorderStyleType;
} = {}) => {
  const side = Border({ color, width, style });
  return {
    top: side,
    bottom: side,
    left: side,
    right: side,
  };
};

function borderSideToString(side?: BorderSide) {
  if (!side) return;
  const parts = [];
  const { width, color, style } = side;
  if (width) parts.push((width as number) > 1 ? px2vw(width) : width + "px");
  if (color) parts.push(color);
  if (style) parts.push(style);
  return `${parts.join(" ")}`;
}

export interface Borders {
  left?: BorderSide;
  top?: BorderSide;
  right?: BorderSide;
  bottom?: BorderSide;
}

export function borderToStyle(border: Borders): CSSProperties {
  if (!border) return undefined as unknown as CSSProperties;

  // Strict mode: Only accept explicit side properties.
  // Legacy single-side usage and 'all' property are no longer supported.

  return {
    borderLeft: borderSideToString(border.left),
    borderTop: borderSideToString(border.top),
    borderRight: borderSideToString(border.right),
    borderBottom: borderSideToString(border.bottom),
  };
}
