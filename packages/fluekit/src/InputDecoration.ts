import { Component } from "vue";
import { BorderSide } from "./Border";
import { BorderRadius } from "./BorderRadius";
import { Color } from "./Color";
import { EdgeInsets, EdgeInsetsProps } from "./EdgeInsets";
import { TextStyle } from "./TextStyle";

import { BoxConstraints } from "./BoxConstraints";
import { CopyWith, createCopyWith, isPlainObject, PropsWithCopyWith } from "./utils";

export interface InputBorder {
  borderSide?: BorderSide;
  borderRadius?: BorderRadius;
  isOutline?: boolean; // Internal flag to distinguish outline vs underline
}
export const InputBorder = { none: NoInputBorder() };
export function NoInputBorder() {
  return {
    borderSide: BorderSide({ width: 0, style: "none", color: "transparent" }),
    borderRadius: BorderRadius.all(0),
    isOutline: false,
  } as InputBorder;
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

const INPUI_DECORATION_SYMBOL = Symbol("InputDecoration");

interface InputDecorationProps {
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
  contentPadding?: EdgeInsets;

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

export interface InputDecoration extends PropsWithCopyWith<InputDecoration>, InputDecorationProps {
  [INPUI_DECORATION_SYMBOL]: true;
}
export function InputDecoration(props: InputDecorationProps): InputDecoration {
  props = props || {};
  props.floatingLabelBehavior = props.floatingLabelBehavior || FloatingLabelBehavior.never;
  return {
    ...props,

    [INPUI_DECORATION_SYMBOL]: true,
    copyWith: createCopyWith<InputDecorationProps>(props) as CopyWith<InputDecoration>,
  };
}

/**
 * 类型守卫：检查对象是否通过 BoxDecoration 构造函数创建
 */
export function isInputDecoration(value: any): value is InputDecoration {
  if (!isPlainObject(value)) return false;
  return INPUI_DECORATION_SYMBOL in value;
}
