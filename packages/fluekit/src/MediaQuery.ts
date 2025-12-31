import { reactive, inject, InjectionKey, UnwrapNestedRefs } from "vue";
import { Size } from "./Size";

export interface MediaQueryData {
  size: { width: number; height: number };
  devicePixelRatio: number;
  platformBrightness: "light" | "dark";
}

export const MediaQueryKey: InjectionKey<MediaQueryData> = Symbol("MediaQuery");

// Global state
const globalState = reactive<MediaQueryData>({
  size: { width: 0, height: 0 },
  devicePixelRatio: 1,
  platformBrightness: "light",
});

let listenersAttached = false;

const updateGlobalState = () => {
  if (typeof window === "undefined") return;
  globalState.size = { width: window.innerWidth, height: window.innerHeight };
  globalState.devicePixelRatio = window.devicePixelRatio || 1;
  const isDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  globalState.platformBrightness = isDark ? "dark" : "light";
};

const attachListeners = () => {
  if (typeof window === "undefined" || listenersAttached) return;
  window.addEventListener("resize", updateGlobalState);
  const darkModeQuery = window.matchMedia?.("(prefers-color-scheme: dark)");
  if (darkModeQuery?.addEventListener) {
    darkModeQuery.addEventListener("change", updateGlobalState);
  } else if (darkModeQuery?.addListener) {
    // Legacy support
    darkModeQuery.addListener(updateGlobalState);
  }
  updateGlobalState();
  listenersAttached = true;
};

export function useMediaQuery(): MediaQueryData {
  attachListeners();
  // inject returns the provided value or the default value (globalState)
  // We cast globalState because reactive returns UnwrapNestedRefs<T> which is compatible enough
  return inject(MediaQueryKey, globalState as MediaQueryData);
}
