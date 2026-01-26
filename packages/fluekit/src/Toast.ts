import { createApp, type ComponentPublicInstance } from "vue";
import ToastComponent, { type ToastOptions } from "./Toast.vue";

let toastInstance: ComponentPublicInstance<any> | null = null;
let container: HTMLElement | null = null;

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

export const Toast = {
  show(message: string, options: Omit<ToastOptions, "message"> = {}): ToastInstance {
    const instance = initToast();
    const id = instance?.add({
      message,
      ...options,
    });

    return {
      hide: () => {
        if (id !== undefined) {
          instance?.remove(id);
        }
      },
    };
  },

  success(message: string, options: Omit<ToastOptions, "message" | "type"> = {}) {
    return this.show(message, { ...options, type: "success" });
  },

  failed(message: string, options: Omit<ToastOptions, "message" | "type"> = {}) {
    return this.show(message, { ...options, type: "failed" });
  },

  error(message: string, options: Omit<ToastOptions, "message" | "type"> = {}) {
    return this.show(message, { ...options, type: "error" });
  },

  info(message: string, options: Omit<ToastOptions, "message" | "type"> = {}) {
    return this.show(message, { ...options, type: "info" });
  },

  warning(message: string, options: Omit<ToastOptions, "message" | "type"> = {}) {
    return this.show(message, { ...options, type: "warning" });
  },

  loading(message: string, options: Omit<ToastOptions, "message" | "type"> = {}) {
    return this.show(message, { ...options, type: "loading" });
  },

  hide(all: boolean = false) {
    if (all) {
      toastInstance?.clear();
    } else {
      toastInstance?.removeLast();
    }
  },
};
