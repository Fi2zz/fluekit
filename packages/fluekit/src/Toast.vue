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
import { computed, ref, type CSSProperties } from "vue";
import Icon from "./Icon.vue";
import { Icons } from "./Icons";
import CupertinoActivityIndicator from "./CupertinoActivityIndicator.vue";

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

const activeToasts = ref<ActiveToast[]>([]);
let idCounter = 0;

// 计算每个 toast 的位置偏移
// 简单的策略：如果 position 相同，则叠加偏移？
// 为了简化，这里先只支持单例模式或简单的覆盖，多例叠加需要更复杂的布局管理
// 实际上，多例模式下，不同位置的 Toast 互不影响。相同位置的 Toast 应该堆叠。
// 由于 TransitionGroup + absolute/fixed positioning 比较难处理堆叠，
// 我们可以为每个位置维护一个列表，或者简化为：Toast 组件只负责渲染一个 Toast，
// 多例由外部管理器（Toast.ts）创建多个 Toast 实例来实现？
// 或者在这里实现堆叠逻辑。
//
// 考虑到 Vue 的响应式，我们在组件内管理列表是比较方便的。
// 但是不同位置的 Toast 需要不同的容器吗？
//
// 让我们采用简单的策略：
// 这个组件管理所有的 Toasts。
// 对于相同位置的 Toasts，我们需要计算 offset。

const getToastsByPosition = (pos: ToastPosition) => {
  return activeToasts.value.filter((t) => (t.options.position || "bottom-center") === pos);
};

// 计算样式（包含堆叠偏移）
// 注意：这需要在模板中为每个 item 计算 style，或者使用 computed 返回带样式的 items
// 但是 activeToasts 是 ref，直接在模板里遍历 activeToasts，然后用一个 method 计算 style
// 可能会有性能问题，但在 Toast 数量不多的情况下可以接受。

// 更好的方式：items 包含 style 属性。
// 但是 style 依赖于 items 数组的顺序。

const itemsWithStyle = computed(() => {
  const positionGroups: Record<string, ActiveToast[]> = {};

  return activeToasts.value.map((toast) => {
    const pos = toast.options.position || "bottom-center";
    if (!positionGroups[pos]) positionGroups[pos] = [];
    positionGroups[pos].push(toast);

    const index = positionGroups[pos].length - 1;
    const offset = index * 48; // 假设每个 Toast 高度 + 间距大约 48px

    // 根据位置计算 top/bottom/transform
    // 这里为了简化，暂不实现自动堆叠挤压，只实现单例覆盖 或者 简单的重叠
    // 如果用户需要多例堆叠，需要更复杂的逻辑。
    // 现在的需求是 "支持同时显示多个或 1 个"，
    // 我们可以简单地允许数组存在多个，但如果不处理堆叠，它们会重合。

    // 如果 options.single 为 true，则在添加时清空其他的。

    return {
      ...toast,
      style: {}, // 暂时不计算堆叠偏移，让它们重叠或者由 CSS 处理
    };
  });
});

const add = (options: ToastOptions) => {
  if (options.single) {
    clear();
  }

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
  const toast: ActiveToast = {
    id,
    options: resolvedOptions,
  };

  activeToasts.value.push(toast);

  const duration = options.duration !== undefined ? options.duration : 2000;
  if (duration > 0) {
    toast.timer = setTimeout(() => {
      remove(id);
    }, duration);
  }

  return id;
};

const remove = (id: number) => {
  const index = activeToasts.value.findIndex((t) => t.id === id);
  if (index !== -1) {
    const toast = activeToasts.value[index];
    if (toast && toast.timer) clearTimeout(toast.timer);
    activeToasts.value.splice(index, 1);
  }
};

const removeLast = () => {
  if (activeToasts.value.length > 0) {
    const last = activeToasts.value[activeToasts.value.length - 1];
    if (last) remove(last.id);
  }
};

const clear = () => {
  activeToasts.value.forEach((t) => {
    if (t.timer) clearTimeout(t.timer);
  });
  activeToasts.value = [];
};

defineExpose({
  add,
  remove,
  removeLast,
  clear,
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

const iconStyle: CSSProperties = {
  flexShrink: 0,
};

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
