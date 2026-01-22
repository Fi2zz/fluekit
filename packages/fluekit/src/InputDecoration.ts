import { Component } from "vue";
import { BorderSide } from "./Border";
import { BorderRadius } from "./BorderRadius";
import { Color } from "./Color";
import { EdgeInsetsProps } from "./EdgeInsets";
import { TextStyle } from "./TextStyle";

import { BoxConstraints } from "./BoxConstraints";

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

/**
 * Defines how a floating label behaves.
 */
export const FloatingLabelBehavior = {
  /**
   * The label always floats above the input field.
   */
  always: "always",
  /**
   * The label floats when the input field is focused or has content.
   * This is the default behavior.
   */
  auto: "auto",
  /**
   * The label never floats. It behaves like a placeholder that disappears when content is entered.
   */
  never: "never",
} as const;

export interface InputDecoration {
  // --- Content ---
  labelText?: string;
  hintText?: string;
  helperText?: string;
  errorText?: string;

  // --- Icons ---
  // Note: In Vue, slots are preferred for complex content.
  // These properties can accept strings (rendered as text) or VNodes/Components (if supported by implementation).
  // For icons, usage of slots #icon, #prefixIcon, #suffixIcon is recommended.
  icon?: string | Component;
  prefixIcon?: string | Component;
  suffixIcon?: string | Component;

  prefixText?: string;
  suffixText?: string;

  // --- Icon Styles ---
  iconColor?: string | Color;
  prefixIconColor?: string | Color;
  suffixIconColor?: string | Color;

  iconSize?: string | number;
  prefixIconSize?: string | number;
  suffixIconSize?: string | number;

  // --- Borders ---
  border?: InputBorder;
  enabledBorder?: InputBorder;
  focusedBorder?: InputBorder;
  errorBorder?: InputBorder;
  focusedErrorBorder?: InputBorder;
  disabledBorder?: InputBorder;

  // --- Layout & Density ---
  filled?: boolean;
  fillColor?: string | Color;
  contentPadding?: number | number[] | EdgeInsetsProps;

  isDense?: boolean; // Reduces vertical padding
  isCollapsed?: boolean; // Removes all padding and borders

  // --- Constraints ---
  constraints?: BoxConstraints;
  helperMaxLines?: number;
  errorMaxLines?: number;
  helperConstraints?: BoxConstraints;
  errorConstraints?: BoxConstraints;

  // --- Label Control ---
  floatingLabelBehavior?: keyof typeof FloatingLabelBehavior;

  // --- Counter ---
  counterText?: string; // If null, hides default counter. If string, replaces it.

  // --- Text Styles ---
  labelStyle?: TextStyle;
  floatingLabelStyle?: TextStyle; // Style when label is floating
  hintStyle?: TextStyle;
  helperStyle?: TextStyle;
  errorStyle?: TextStyle;
  counterStyle?: TextStyle;

  // --- Text Alignment ---
  errorTextAlign?: "left" | "right" | "center" | "justify" | "start" | "end";
  helperTextAlign?: "left" | "right" | "center" | "justify" | "start" | "end";

  // --- Behavior ---
  /**
   * Whether the error text should always be shown (reserving space),
   * even if [errorText] is null or empty.
   */
  alwaysShowError?: boolean;
}

export function InputDecoration(options: InputDecoration = {}): InputDecoration {
  options.floatingLabelBehavior = options.floatingLabelBehavior || FloatingLabelBehavior.never;
  return options;
}
