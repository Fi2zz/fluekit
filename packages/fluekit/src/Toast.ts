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
    const id = instance?.add({ message, ...options });
    return {
      hide: () => {
        if (id !== undefined) instance?.remove(id);
      },
    };
  },

  hide(all: boolean = false) {
    if (all) {
      toastInstance?.clear();
    } else {
      toastInstance?.removeLast();
    }
  },
};
