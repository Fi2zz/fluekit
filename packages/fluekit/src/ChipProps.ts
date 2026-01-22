import { type Component } from "vue";
import { BoxDecoration } from "./BoxDecoration";
import { Color } from "./Color";
import { TextStyle } from "./TextStyle";
export interface ChilpProps {
  label: string;
  avatar?: Component;
  backgroundColor?: string | Color;
  labelColor?: string | Color;
  deletable?: boolean;
  size?: "small" | "medium" | "large";
  width?: number | string;
  height?: number | string;
  decoration?: BoxDecoration;
  labelStyle?: TextStyle;
}

export type ChipEmits = {
  (e: "pressed"): void;
  (e: "delete"): void;
};

export type ChoiceChipEmits = ChipEmits & {
  (e: "selected", value: boolean): void;
};
export interface ChoiceChipProps extends ChilpProps {
  selected: boolean;
  selectedColor?: string | Color;
  selectedTextColor?: string | Color;
}
