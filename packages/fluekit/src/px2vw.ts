import { isMobile } from "./device";
import { isNumberPx, isPureNumber } from "./utils";

let DEFAULT_VW = 750;
let shouldTransform = isMobile;
export function setTransform(value: boolean) {
  shouldTransform = value;
}
export function setDefaultVW(value: number) {
  if (!isPureNumber(`${value}`)) throw new Error("defaultVW must be a number");
  if (value <= 0) throw new Error("defaultVW must be greater than 0");
  DEFAULT_VW = value;
}
const EXCLUDED_VALUES = ["0px", "0", "+0", "-0", "0%", "+0%", "-0%", "-0px", "+0px"];
const nonTransform = (px: string) =>
  px.endsWith("vw") || px.endsWith("%") || px.endsWith("PX") || EXCLUDED_VALUES.includes(px);

export function px2vw(px: string | number | undefined | null): string {
  if (!shouldTransform) return keep(px) as string;
  if (typeof px == "undefined" || px == null || (typeof px === "number" && !Number.isFinite(px)))
    return undefined as unknown as string;
  if (px === 0) return "0";
  if (typeof px == "string") {
    px = px.trim();
    if (px == "") return undefined as unknown as string;
    if (nonTransform(px)) return px;

    // Explicit 'px' unit means DO NOT transform to vw, just return as is (normalized to number if needed or string)
    // But wait, the user requirement is: "100px -> 100px".
    // Currently: isNumberPx("100px") is true.
    // Logic below: if(isNumberPx(px)) px = px.slice(0, -2); -> becomes "100" -> continues to transform.
    // We need to change this: if it HAS "px", we should return it AS IS (or maybe ensure it's valid).
    if (isNumberPx(px)) return px;
    if (!isPureNumber(px)) return px;
  }
  px = Number(px);
  const designWidth = DEFAULT_VW / 100;
  return `${Math.round((px / designWidth) * 100000) / 100000}vw`;
}
export function keep(value?: number | string | null) {
  // console.log("keep", value);
  if (typeof value === "number") {
    return `${value}px`;
  }
  if (isPureNumber(`${value}`)) return `${value}px`;
  // if (value + 0 == value) return `${value}px`;
  if (isNumberPx(`${value}`)) return value;
  return value as unknown as string;
}
