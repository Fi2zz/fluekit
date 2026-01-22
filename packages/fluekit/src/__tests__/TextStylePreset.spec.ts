import { describe, it, expect } from "vitest";
import { TextStylePreset } from "../TextStylePreset";
import { isTextStyle, FontWeight } from "../TextStyle";
import { Colors } from "../Colors";
import { CupertinoColors } from "../CupertinoColors";

describe("TextStylePreset", () => {
  describe("Cupertino Styles", () => {
    it("should return valid TextStyle objects", () => {
      expect(isTextStyle(TextStylePreset.largeTitle)).toBe(true);
      expect(isTextStyle(TextStylePreset.body)).toBe(true);
    });

    it("should have correct properties for largeTitle", () => {
      const style = TextStylePreset.largeTitle;
      expect(style.fontSize).toBe(34);
      expect(style.fontWeight).toBe(FontWeight.normal);
      expect(style.letterSpacing).toBe(0.37);
    });

    it("should have correct properties for headline", () => {
      const style = TextStylePreset.headline;
      expect(style.fontSize).toBe(17);
      expect(style.fontWeight).toBe(FontWeight.w600);
      expect(style.letterSpacing).toBe(-0.41);
    });

    it("should have correct properties for action", () => {
      const style = TextStylePreset.action;
      expect(style.color).toBe(CupertinoColors.systemBlue);
    });
  });

  describe("Material Styles", () => {
    it("should return valid TextStyle objects", () => {
      expect(isTextStyle(TextStylePreset.displayLarge)).toBe(true);
      expect(isTextStyle(TextStylePreset.bodyMedium)).toBe(true);
    });

    it("should have correct properties for displayLarge", () => {
      const style = TextStylePreset.displayLarge;
      expect(style.fontSize).toBe(57);
      expect(style.fontWeight).toBe(FontWeight.w400);
      expect(style.letterSpacing).toBe(-0.25);
    });

    it("should have correct properties for headlineMedium", () => {
      const style = TextStylePreset.headlineMedium;
      expect(style.fontSize).toBe(28);
      expect(style.fontWeight).toBe(FontWeight.w400);
      expect(style.letterSpacing).toBe(0);
    });

    it("should have correct properties for labelSmall", () => {
      const style = TextStylePreset.labelSmall;
      expect(style.fontSize).toBe(11);
      expect(style.fontWeight).toBe(FontWeight.w500);
      expect(style.letterSpacing).toBe(0.5);
    });

    it("should use black87 as default color", () => {
      const style = TextStylePreset.bodyLarge;
      expect(style.color).toBe(Colors.black87);
    });
  });
});
