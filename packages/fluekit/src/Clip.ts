/**
 * Clip
 * 对应 Flutter 的 Clip
 */

export const Clip = {
  none: "none",
  hardEdge: "hardEdge",
  antiAlias: "antiAlias",
  antiAliasWithSaveLayer: "antiAliasWithSaveLayer",
} as const;

export type Clip = keyof typeof Clip;
