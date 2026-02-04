/**
 * Clip
 * 对应 Flutter 的 Clip
 */

import { CSSProperties } from "vue";

export const Clip = {
  none: "none",
  hardEdge: "hardEdge",
  antiAlias: "antiAlias",
  antiAliasWithSaveLayer: "antiAliasWithSaveLayer",
} as const;

export type Clip = keyof typeof Clip;
export function clipBehaviorToStyle(clipBehavior: Clip): CSSProperties {
  const overflow = clipBehavior === "none" ? undefined : "hidden";
  return {
    overflow,
  };
}
