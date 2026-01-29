import { reactive, inject, InjectionKey } from "vue";
import { EdgeInsets } from "./EdgeInsets";

export enum Orientation {
  portrait = "portrait",
  landscape = "landscape",
}

export interface MediaQueryData {
  size: { width: number; height: number };
  devicePixelRatio: number;
  platformBrightness: "light" | "dark";
  orientation: Orientation;
  disableAnimations: boolean;
  highContrast: boolean;
  padding: EdgeInsets;
  viewInsets: EdgeInsets;
}

export const MediaQueryKey: InjectionKey<MediaQueryData> = Symbol("MediaQuery");

// Global state
const globalState = reactive<MediaQueryData>({
  size: { width: 0, height: 0 },
  devicePixelRatio: 1,
  platformBrightness: "light",
  orientation: Orientation.portrait,
  disableAnimations: false,
  highContrast: false,
  padding: EdgeInsets.zero,
  viewInsets: EdgeInsets.zero,
});

let listenersAttached = false;

const updateGlobalState = () => {
  if (typeof window === "undefined") return;

  // Size & Ratio
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Deduplicate size update
  if (globalState.size.width !== width || globalState.size.height !== height) {
    globalState.size = { width, height };
    // Orientation (Derived from size matches Flutter behavior)
    const newOrientation = width > height ? Orientation.landscape : Orientation.portrait;
    if (globalState.orientation !== newOrientation) {
      globalState.orientation = newOrientation;
    }
  }

  const dpr = window.devicePixelRatio || 1;
  if (globalState.devicePixelRatio !== dpr) {
    globalState.devicePixelRatio = dpr;
  }

  // Media Queries
  const isDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  const newBrightness = isDark ? "dark" : "light";
  if (globalState.platformBrightness !== newBrightness) {
    globalState.platformBrightness = newBrightness;
  }

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const newDisableAnimations = !!reduceMotion;
  if (globalState.disableAnimations !== newDisableAnimations) {
    globalState.disableAnimations = newDisableAnimations;
  }

  const highContrast = window.matchMedia?.("(prefers-contrast: more)").matches;
  const newHighContrast = !!highContrast;
  if (globalState.highContrast !== newHighContrast) {
    globalState.highContrast = newHighContrast;
  }
};

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

const debouncedUpdateGlobalState = debounce(updateGlobalState, 100);

const attachListeners = () => {
  if (typeof window === "undefined" || listenersAttached) return;

  window.addEventListener("resize", debouncedUpdateGlobalState);

  const queries = [
    "(prefers-color-scheme: dark)",
    "(prefers-reduced-motion: reduce)",
    "(prefers-contrast: more)",
  ];

  queries.forEach((q) => {
    const mq = window.matchMedia?.(q);
    if (mq?.addEventListener) {
      mq.addEventListener("change", debouncedUpdateGlobalState);
    } else if (mq?.addListener) {
      mq.addListener(debouncedUpdateGlobalState);
    }
  });

  updateGlobalState();
  listenersAttached = true;
};

export function useMediaQuery(): MediaQueryData {
  attachListeners();
  // inject returns the provided value or the default value (globalState)
  // We cast globalState because reactive returns UnwrapNestedRefs<T> which is compatible enough
  return inject(MediaQueryKey, globalState as MediaQueryData);
}
