import { createApp, type ComponentPublicInstance } from "vue";
import ToastComponent, { type ToastOptions } from "./ToastComponent.vue";

let toastInstance: ComponentPublicInstance<any> | null = null;
let container: HTMLElement | null = null;
export let toastCount = 1;

export function setVisibleToasts(count: number) {
  toastCount = count;
}
const initToast = () => {
  if (toastInstance) return toastInstance;

  container = document.createElement("div");
  document.body.appendChild(container);

  const app = createApp(ToastComponent);
  toastInstance = app.mount(container);
  return toastInstance;
};
export interface ToastInstance {
  hide: () => void;
}
export function hideToast(all: boolean = false) {
  if (all) {
    toastInstance?.clear();
  } else {
    toastInstance?.removeLast();
  }
}
export function showToast(
  message: string,
  options: Omit<ToastOptions, "message"> = {},
): ToastInstance {
  const instance = initToast();
  instance?.setVisibleToasts(toastCount);
  const id = instance?.add({ message, ...options });
  return {
    hide: () => {
      if (id !== undefined) instance?.remove(id);
    },
  };
}

export const Toast = {
  show: showToast,
  success(message: string, options: Omit<ToastOptions, "message" | "type"> = {}) {
    return showToast(message, { ...options, type: "success" });
  },
  failed(message: string, options: Omit<ToastOptions, "message" | "type"> = {}) {
    return showToast(message, { ...options, type: "failed" });
  },
  error(message: string, options: Omit<ToastOptions, "message" | "type"> = {}) {
    return showToast(message, { ...options, type: "error" });
  },
  info(message: string, options: Omit<ToastOptions, "message" | "type"> = {}) {
    return showToast(message, { ...options, type: "info" });
  },
  warning(message: string, options: Omit<ToastOptions, "message" | "type"> = {}) {
    return showToast(message, { ...options, type: "warning" });
  },
  loading(message: string, options: Omit<ToastOptions, "message" | "type"> = {}) {
    return showToast(message, { ...options, type: "loading" });
  },
  hide: hideToast,
};
export type Toast = typeof Toast;
export { Toast as toast };
