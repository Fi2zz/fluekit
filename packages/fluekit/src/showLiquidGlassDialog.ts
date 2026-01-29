import { createVNode, render, type VNode } from "vue";
import LiquidGlassDialog from "./LiquidGlassDialog.vue";
import type { LiquidGlassDialogProps } from "./LiquidGlassDialog.vue";

export interface LiquidGlassDialogOptions extends Omit<LiquidGlassDialogProps, "modelValue"> {
  onClose?: () => void;
  onAfterClose?: () => void;
}

export const showLiquidGlassDialog = (options: LiquidGlassDialogOptions) => {
  const container = document.createElement("div");
  document.body.appendChild(container);

  let vnode: VNode | null = null;

  const destroy = () => {
    if (container) {
      render(null, container);
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    }
    options.onAfterClose?.();
  };

  const close = () => {
    renderComponent(false);
    options.onClose?.();
  };

  const renderComponent = (visible: boolean) => {
    vnode = createVNode(LiquidGlassDialog, {
      ...options,
      modelValue: visible,
      "onUpdate:modelValue": (val: boolean) => {
        if (!val) {
          renderComponent(false);
        }
      },
      onClose: () => options.onClose?.(),
      onAfterClose: () => destroy(),
    });
    render(vnode, container);
  };

  renderComponent(true);
  return {
    close,
  };
};
