import { ComputedRef, CSSProperties, inject, provide, computed } from "vue";

const TRANSITION_STYLE_KEY = Symbol("transitionStyle");
export function injectTransition() {
  return inject(
    TRANSITION_STYLE_KEY,
    computed(() => ({})),
  ) as ComputedRef<CSSProperties>;
}
export function provideTransiationStyle(style: ComputedRef<CSSProperties>) {
  provide(TRANSITION_STYLE_KEY, style);
}
