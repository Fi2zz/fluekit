import { px2vw } from "./px2vw";

export interface EdgeInsetsProps {
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  horizontal?: number | string;
  vertical?: number | string;
}

export type EdgeInsets = EdgeInsetsProps;

export function EdgeInsets(edgeInsets: EdgeInsetsProps): EdgeInsetsProps {
  const { top, right, bottom, left, horizontal, vertical } = edgeInsets;
  return {
    top: top ?? vertical ?? 0,
    right: right ?? horizontal ?? 0,
    bottom: bottom ?? vertical ?? 0,
    left: left ?? horizontal ?? 0,
  };
}

// Static methods for Flutter-like API
EdgeInsets.all = (value: number | string) => {
  return {
    top: value,
    right: value,
    bottom: value,
    left: value,
  };
};

EdgeInsets.symmetric = ({
  vertical,
  horizontal,
}: {
  vertical?: number | string;
  horizontal?: number | string;
}) => EdgeInsets({ vertical, horizontal });

EdgeInsets.only = ({
  top,
  right,
  bottom,
  left,
}: {
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
}) => EdgeInsets({ top, right, bottom, left });

EdgeInsets.zero = EdgeInsets({});

export function edgeInsetsToStyle(
  type: "margin" | "padding",
  edgeInsets: EdgeInsetsProps | undefined,
) {
  if (!edgeInsets) return {};

  // Re-normalize just in case it's a raw object from props that bypassed the factory
  const normalized = EdgeInsets(edgeInsets);

  return {
    [`${type}Top`]: px2vw(normalized.top),
    [`${type}Right`]: px2vw(normalized.right),
    [`${type}Bottom`]: px2vw(normalized.bottom),
    [`${type}Left`]: px2vw(normalized.left),
  };
}

export const paddingToStyle = (value?: EdgeInsetsProps) => edgeInsetsToStyle("padding", value);
export const marginToStyle = (value?: EdgeInsetsProps) => edgeInsetsToStyle("margin", value);
