<template>
  <TransitionGroup
    tag="div"
    class="fluekit-toast-container"
    :css="false"
    @enter="onEnter"
    @leave="onLeave"
  >
    <div v-for="item in activeToasts" :key="item.id" :style="getToastStyle(item)">
      <div :style="contentStyle">
        <CupertinoActivityIndicator
          v-if="item.options.type === 'loading'"
          :radius="10"
          :color="item.options.textColor || '#ffffff'"
          :style="iconStyle"
        />
        <Icon
          v-else-if="item.options.icon"
          :icon="item.options.icon"
          :size="20"
          :style="iconStyle"
        />
        <span>{{ item.options.message }}</span>
      </div>
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { ref, type CSSProperties } from "vue";
import CupertinoActivityIndicator from "./CupertinoActivityIndicator.vue";
import Icon from "./Icon.vue";
import { Icons } from "./Icons";

export type ToastPosition =
  | "center"
  | "top-center"
  | "bottom-center"
  | "top-left"
  | "bottom-left"
  | "top-right"
  | "bottom-right"
  | "center-left"
  | "center-right";

export type ToastType = "success" | "failed" | "error" | "loading" | "info" | "warning";

export interface ToastOptions {
  message: string;
  duration?: number;
  position?: ToastPosition;
  type?: ToastType;
  icon?: string;
  zIndex?: number;
  backgroundColor?: string;
  textColor?: string;
  // 是否只允许同时显示一个 toast
  single?: boolean;
}

interface ActiveToast {
  id: number;
  options: ToastOptions;
  timer?: number;
}

const visibleToasts = ref(1);
const activeToasts = ref<ActiveToast[]>([]);
let idCounter = 0;

function removeVisible(options: ToastOptions) {
  if (options.single || visibleToasts.value == 1) clear();
  else if (activeToasts.value.length > visibleToasts.value) {
    activeToasts.value.splice(activeToasts.value.length - visibleToasts.value);
  }
}

const add = (options: ToastOptions) => {
  removeVisible(options);
  const resolvedOptions = { ...options };
  if (resolvedOptions.type && !resolvedOptions.icon) {
    switch (resolvedOptions.type) {
      case "success":
        resolvedOptions.icon = Icons.checkCircle;
        break;
      case "failed":
      case "error":
        resolvedOptions.icon = Icons.cancel;
        break;
      case "info":
        resolvedOptions.icon = Icons.info;
        break;
      case "warning":
        resolvedOptions.icon = Icons.warning;
        break;
    }
  }
  const id = idCounter++;
  const toast: ActiveToast = { id, options: resolvedOptions };
  activeToasts.value.push(toast);
  const duration = options.duration !== undefined ? options.duration : 2000;
  if (duration > 0) {
    toast.timer = setTimeout(() => {
      remove(id);
    }, duration);
  }

  return id;
};

function remove(id: number) {
  const index = activeToasts.value.findIndex((t) => t.id === id);
  if (index !== -1) {
    const toast = activeToasts.value[index];
    if (toast && toast.timer) clearTimeout(toast.timer);
    activeToasts.value.splice(index, 1);
  }
}

function removeLast() {
  if (activeToasts.value.length > 0) {
    const last = activeToasts.value[activeToasts.value.length - 1];
    if (last) remove(last.id);
  }
}

function slice() {
  // activeToasts.value = activeToasts.value.slice(0, visibleToasts.value);
}

function clear() {
  activeToasts.value.forEach((t) => {
    if (t.timer) clearTimeout(t.timer);
  });
  activeToasts.value = [];
}

function setVisibleToasts(count: number) {
  visibleToasts.value = count;
}

defineExpose({
  add,
  remove,
  removeLast,
  clear,
  setVisibleToasts,
});
// Styles
const baseToastStyle: CSSProperties = {
  position: "fixed",
  padding: "8px 16px",
  borderRadius: "8px",
  fontSize: "14px",
  lineHeight: "20px",
  maxWidth: "80vw",
  wordBreak: "break-all",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
};

const contentStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const iconStyle: CSSProperties = { flexShrink: 0 };
const positionStyles: Record<string, CSSProperties> = {
  center: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
  "top-center": { top: "24px", left: "50%", transform: "translateX(-50%)" },
  "bottom-center": { bottom: "48px", left: "50%", transform: "translateX(-50%)" },
  "top-left": { top: "24px", left: "24px" },
  "top-right": { top: "24px", right: "24px" },
  "bottom-left": { bottom: "24px", left: "24px" },
  "bottom-right": { bottom: "24px", right: "24px" },
  "center-left": { top: "50%", left: "24px", transform: "translateY(-50%)" },
  "center-right": { top: "50%", right: "24px", transform: "translateY(-50%)" },
};

const getToastStyle = (item: ActiveToast): CSSProperties => {
  const pos = item.options.position || "bottom-center";
  return {
    ...baseToastStyle,
    ...positionStyles[pos],
    zIndex: item.options.zIndex || 2000,
    backgroundColor: item.options.backgroundColor || "rgba(0, 0, 0, 0.8)",
    color: item.options.textColor || "#ffffff",
  };
};

const onEnter = (el: Element, done: () => void) => {
  const element = el as HTMLElement;
  const baseTransform = element.style.transform || "";

  element.animate(
    [
      { opacity: 0, transform: `${baseTransform} scale(0.9)` },
      { opacity: 1, transform: `${baseTransform} scale(1)` },
    ],
    {
      duration: 300,
      easing: "ease",
    },
  ).onfinish = done;
};

const onLeave = (el: Element, done: () => void) => {
  const element = el as HTMLElement;
  const baseTransform = element.style.transform || "";

  element.animate(
    [
      { opacity: 1, transform: `${baseTransform} scale(1)` },
      { opacity: 0, transform: `${baseTransform} scale(0.9)` },
    ],
    {
      duration: 300,
      easing: "ease",
    },
  ).onfinish = done;
};
</script>
