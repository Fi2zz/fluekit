import { createVNode, render } from "vue";
import SnackBarComponent from "./SnackBarComponent.vue";

let timer: number | undefined;

export class SnackBar {
  static show(options: {
    content: string;
    actionLabel?: string;
    onAction?: () => void;
    duration?: number;
  }) {
    // Basic implementation: append to body
    // In a real app, this should probably use a Provider/Context to sit above other content properly

    // Clear previous
    const existing = document.getElementById("fluekit-snackbar");
    if (existing) {
      render(null, existing);
      document.body.removeChild(existing);
      if (timer) clearTimeout(timer);
    }

    const container = document.createElement("div");
    container.id = "fluekit-snackbar";
    document.body.appendChild(container);

    const vnode = createVNode(SnackBarComponent, {
      content: options.content,
      actionLabel: options.actionLabel,
      onAction: options.onAction,
      duration: options.duration,
      onClose: () => {
        if (container.parentNode) {
          render(null, container);
          document.body.removeChild(container);
        }
      },
    });

    render(vnode, container);
  }
}
