import { px2vw } from "./px2vw";

import { CSSProperties } from "vue";
export type BorderRadiusValue = number | string;

export interface BorderRadiusProps {
  topLeft?: BorderRadiusValue;
  bottom?: BorderRadiusValue; // Deprecated or incorrect in previous implementation? Usually bottom implies bottom-left/right or similar?
  // Actually, standard BorderRadius has topLeft, topRight, bottomLeft, bottomRight.
  // 'bottom' is not standard. But I will keep what was there except 'all'.
  // Wait, let's look at previous implementation.
  // previous had: topLeft, bottom, topRight, bottomLeft, bottomRight, all.
  // 'bottom' seems weird for BorderRadius unless it meant 'bottomLeft' and 'bottomRight'.
  // But standard is TL, TR, BL, BR.
  // Let's stick to strict Flutter-like: TL, TR, BL, BR.
  topRight?: BorderRadiusValue;
  bottomLeft?: BorderRadiusValue;
  bottomRight?: BorderRadiusValue;
}

export type BorderRadiusType = BorderRadiusProps;

export function BorderRadius(borderRadius: BorderRadiusProps): BorderRadiusProps {
  const { topLeft, topRight, bottomLeft, bottomRight } = borderRadius;
  return {
    topLeft: topLeft || 0,
    topRight: topRight || 0,
    bottomLeft: bottomLeft || 0,
    bottomRight: bottomRight || 0,
  };
}

// Static methods for Flutter-like API
BorderRadius.all = (radius: BorderRadiusValue) => {
  return {
    topLeft: radius,
    topRight: radius,
    bottomLeft: radius,
    bottomRight: radius,
  };
};

BorderRadius.circular = (radius: BorderRadiusValue) => BorderRadius.all(radius);

BorderRadius.only = ({
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
}: {
  topLeft?: BorderRadiusValue;
  topRight?: BorderRadiusValue;
  bottomLeft?: BorderRadiusValue;
  bottomRight?: BorderRadiusValue;
}) => BorderRadius({ topLeft, topRight, bottomLeft, bottomRight });

BorderRadius.zero = BorderRadius({});

export function borderRadiusToStyle(props?: BorderRadiusProps) {
  if (!props) return {};
  const { topLeft, topRight, bottomLeft, bottomRight } = props;

  const css: CSSProperties = {};
  if (bottomLeft) css.borderBottomLeftRadius = px2vw(bottomLeft);
  if (bottomRight) css.borderBottomRightRadius = px2vw(bottomRight);
  if (topLeft) css.borderTopLeftRadius = px2vw(topLeft);
  if (topRight) css.borderTopRightRadius = px2vw(topRight);
  return css;
}
