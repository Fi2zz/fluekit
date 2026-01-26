import { createVNode, render } from "vue";
import AlertDialog from "./AlertDialog.vue";
import type { AlertDialogProps } from "./AlertDialog.vue";

export interface AlertDialogOptions extends Omit<AlertDialogProps, "visible"> {
  onOk?: () => void;
  onClose?: () => void;
}

export const showAlertDialog = (options: AlertDialogOptions) => {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const close = () => {
    render(null, container);
    document.body.removeChild(container);
    options.onClose?.();
  };

  const handleOk = () => {
    options.onOk?.();
    close();
  };

  const vnode = createVNode(AlertDialog, {
    ...options,
    visible: true,
    "onUpdate:visible": (val: boolean) => {
      if (!val) close();
    },
    onClose: close,
    onOk: handleOk,
  });

  render(vnode, container);

  return {
    close,
  };
};
