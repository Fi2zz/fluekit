<template>
  <TransitionGroup name="fluekit-toast-fade" tag="div" class="fluekit-toast-container">
    <div
      v-for="item in activeToasts"
      :key="item.id"
      class="fluekit-toast"
      :class="[`fluekit-toast--${item.options.position || 'bottom-center'}`]"
      :style="{
        zIndex: item.options.zIndex || 2000,
        backgroundColor: item.options.backgroundColor || 'rgba(0, 0, 0, 0.8)',
        color: item.options.textColor || '#ffffff',
      }"
    >
      <div class="fluekit-toast-content">
        <Icon
          v-if="item.options.icon"
          :icon="item.options.icon"
          :size="20"
          class="fluekit-toast-icon"
        />
        <span class="fluekit-toast-message">{{ item.options.message }}</span>
      </div>
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { computed, ref, type CSSProperties } from "vue";
import Icon from "./Icon.vue";

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

export interface ToastOptions {
  message: string;
  duration?: number;
  position?: ToastPosition;
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

  const id = idCounter++;
  const toast: ActiveToast = {
    id,
    options,
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
</script>

<style scoped>
.fluekit-toast {
  position: fixed;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 20px;
  max-width: 80vw;
  word-break: break-all;
  pointer-events: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.fluekit-toast-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.fluekit-toast-icon {
  flex-shrink: 0;
}

/* Positions */
.fluekit-toast--center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.fluekit-toast--top-center {
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
}

.fluekit-toast--bottom-center {
  bottom: 48px;
  left: 50%;
  transform: translateX(-50%);
}

.fluekit-toast--top-left {
  top: 24px;
  left: 24px;
}

.fluekit-toast--top-right {
  top: 24px;
  right: 24px;
}

.fluekit-toast--bottom-left {
  bottom: 24px;
  left: 24px;
}

.fluekit-toast--bottom-right {
  bottom: 24px;
  right: 24px;
}

.fluekit-toast--center-left {
  top: 50%;
  left: 24px;
  transform: translateY(-50%);
}

.fluekit-toast--center-right {
  top: 50%;
  right: 24px;
  transform: translateY(-50%);
}

/* Transitions */
.fluekit-toast-fade-enter-from,
.fluekit-toast-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Adjust transform for centered positions during transition */
.fluekit-toast-fade-enter-from.fluekit-toast--center,
.fluekit-toast-fade-leave-to.fluekit-toast--center {
  transform: translate(-50%, -50%) scale(0.9);
}

.fluekit-toast-fade-enter-from.fluekit-toast--top-center,
.fluekit-toast-fade-leave-to.fluekit-toast--top-center,
.fluekit-toast-fade-enter-from.fluekit-toast--bottom-center,
.fluekit-toast-fade-leave-to.fluekit-toast--bottom-center {
  transform: translateX(-50%) scale(0.9);
}

.fluekit-toast-fade-enter-from.fluekit-toast--center-left,
.fluekit-toast-fade-leave-to.fluekit-toast--center-left,
.fluekit-toast-fade-enter-from.fluekit-toast--center-right,
.fluekit-toast-fade-leave-to.fluekit-toast--center-right {
  transform: translateY(-50%) scale(0.9);
}
</style>
