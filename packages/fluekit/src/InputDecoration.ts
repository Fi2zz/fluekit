import { BorderSide } from "./Border";
import { BorderRadius } from "./BorderRadius";
import { TextStyle } from "./TextStyle";
import { Color } from "./Color";

export interface InputBorder {
  borderSide?: BorderSide;
  borderRadius?: BorderRadius;
  isOutline?: boolean; // Internal flag to distinguish outline vs underline
}

export function OutlineInputBorder(
  options: {
    borderSide?: BorderSide;
    borderRadius?: BorderRadius;
  } = {},
): InputBorder {
  return {
    borderSide: options.borderSide ?? BorderSide({ color: "#000000", width: 1 }),
    borderRadius: options.borderRadius ?? BorderRadius.all(4),
    isOutline: true,
  };
}

export function UnderlineInputBorder(
  options: {
    borderSide?: BorderSide;
    borderRadius?: BorderRadius; // Usually specific corners
  } = {},
): InputBorder {
  return {
    borderSide: options.borderSide ?? BorderSide({ color: "#000000", width: 1 }),
    borderRadius: options.borderRadius ?? BorderRadius.all(0),
    isOutline: false,
  };
}

export interface InputDecoration {
  labelText?: string;
  hintText?: string;
  helperText?: string;
  errorText?: string;

  // Icons (we'll use slots in Vue mostly, but props can accept strings or simple types)
  // In Vue component, we will check slots 'prefix', 'suffix', 'prefixIcon', 'suffixIcon'.
  // These props might be strings for text prefixes?
  prefixText?: string;
  suffixText?: string;

  // Borders
  border?: InputBorder;
  enabledBorder?: InputBorder;
  focusedBorder?: InputBorder;
  errorBorder?: InputBorder;
  disabledBorder?: InputBorder;

  // Style
  filled?: boolean;
  fillColor?: string | Color;

  contentPadding?: number | number[]; // simplistic padding

  // Label Style
  labelStyle?: TextStyle;
  hintStyle?: TextStyle;
  helperStyle?: TextStyle;
  errorStyle?: TextStyle;
}
