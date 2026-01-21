export const BoxFit = {
  fitWidth: "fitWidth",
  fitHeight: "fitHeight",
  fill: "fill",
  contain: "contain",
  cover: "cover",
  none: "none",
  scaleDown: "scaleDown",
} as const;

type Valueof<T> = T[keyof T];
export type BoxFit = Valueof<typeof BoxFit>;
