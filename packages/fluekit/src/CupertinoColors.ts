import { Color } from "./Color";

export const CupertinoColors = {
  // Utility
  withOpacity: (color: Color | string, opacity: number) =>
    (typeof color === "string" ? Color.fromString(color) : color).withOpacity(opacity),
  withAlpha: (color: Color | string, alpha: number) =>
    (typeof color === "string" ? Color.fromString(color) : color).withAlpha(alpha),
  withRed: (color: Color | string, red: number) =>
    (typeof color === "string" ? Color.fromString(color) : color).withRed(red),
  withGreen: (color: Color | string, green: number) =>
    (typeof color === "string" ? Color.fromString(color) : color).withGreen(green),
  withBlue: (color: Color | string, blue: number) =>
    (typeof color === "string" ? Color.fromString(color) : color).withBlue(blue),
  computeLuminance: (color: Color | string) =>
    (typeof color === "string" ? Color.fromString(color) : color).computeLuminance(),
  lighten: (color: Color | string, amount: number) => {
    // Re-implement or use Color helper
    return Color.fromString(typeof color === "string" ? color : color.toString()); // Placeholder logic, should use lighten/darken logic
  },
  darken: (color: Color | string, amount: number) => {
    return Color.fromString(typeof color === "string" ? color : color.toString()); // Placeholder logic
  },

  // Standard colors
  activeBlue: Color.fromString("#007AFF"),
  activeGreen: Color.fromString("#34C759"),
  activeOrange: Color.fromString("#FF9500"),
  white: Color.fromString("#FFFFFF"),
  black: Color.fromString("#000000"),
  lightBackgroundGray: Color.fromString("#EFEFF4"),
  extraLightBackgroundGray: Color.fromString("#EFEFF4"),
  darkBackgroundGray: Color.fromString("#171717"),

  // Label colors
  label: Color.fromString("#000000"),
  secondaryLabel: Color.fromString("rgba(60, 60, 67, 0.60)"),
  tertiaryLabel: Color.fromString("rgba(60, 60, 67, 0.30)"),
  quaternaryLabel: Color.fromString("rgba(60, 60, 67, 0.18)"),

  // System colors
  systemBlue: Color.fromString("#007AFF"),
  systemGreen: Color.fromString("#34C759"),
  systemIndigo: Color.fromString("#5856D6"),
  systemOrange: Color.fromString("#FF9500"),
  systemPink: Color.fromString("#FF2D55"),
  systemPurple: Color.fromString("#AF52DE"),
  systemRed: Color.fromString("#FF3B30"),
  systemTeal: Color.fromString("#5AC8FA"),
  systemYellow: Color.fromString("#FFCC00"),
  systemGrey: Color.fromString("#8E8E93"),
  systemGrey2: Color.fromString("#AEAEB2"),
  systemGrey3: Color.fromString("#C7C7CC"),
  systemGrey4: Color.fromString("#D1D1D6"),
  systemGrey5: Color.fromString("#E5E5EA"),
  systemGrey6: Color.fromString("#F2F2F7"),

  // Background colors
  systemBackground: Color.fromString("#FFFFFF"),
  secondarySystemBackground: Color.fromString("#F2F2F7"),
  tertiarySystemBackground: Color.fromString("#FFFFFF"),

  // Grouped background colors
  systemGroupedBackground: Color.fromString("#F2F2F7"),
  secondarySystemGroupedBackground: Color.fromString("#FFFFFF"),
  tertiarySystemGroupedBackground: Color.fromString("#F2F2F7"),

  // Separator colors
  separator: Color.fromString("rgba(60, 60, 67, 0.29)"),
  opaqueSeparator: Color.fromString("#C6C6C8"),

  // Link color
  link: Color.fromString("#007AFF"),

  // Destructive red
  destructiveRed: Color.fromString("#FF3B30"),
};
