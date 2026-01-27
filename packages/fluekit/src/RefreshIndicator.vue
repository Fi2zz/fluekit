<template>
  <div
    ref="containerRef"
    :style="containerStyle"
    @touchstart="handleStart"
    @touchmove="handleMove"
    @touchend="handleEnd"
    @mousedown="handleStart"
    @mousemove="handleMove"
    @mouseup="handleEnd"
    @mouseleave="handleEnd"
  >
    <!-- Refresh Spinner -->
    <div :style="spinnerStyle">
      <CupertinoActivityIndicator :radius="12" :color="color" :animating="isRefreshing" />
    </div>

    <div :style="contentStyle">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type CSSProperties } from "vue";
import { Color } from "./Color";
import { Colors } from "./Colors";
import CupertinoActivityIndicator from "./CupertinoActivityIndicator.vue";
import { CupertinoColors } from "./CupertinoColors";

defineOptions({ inheritAttrs: false });

interface Props {
  onRefresh: () => Promise<void>;
  color?: string | Color;
  backgroundColor?: string | Color;
  triggerDistance?: number;
}

const props = withDefaults(defineProps<Props>(), {
  color: () => CupertinoColors.systemGrey,
  backgroundColor: () => Colors.white,
  triggerDistance: 100,
});

const containerRef = ref<HTMLElement | null>(null);
const isRefreshing = ref(false);
const dragOffset = ref(0);
const startY = ref(0);
const isDragging = ref(false);

const containerStyle: CSSProperties = {
  position: "relative",
  height: "100%",
  overflow: "hidden",
};

const spinnerStyle = computed<CSSProperties>(() => {
  const top = isRefreshing.value
    ? 20 // Fixed position when refreshing
    : Math.min(dragOffset.value, props.triggerDistance * 1.5) - 40; // Parallax effect or similar

  return {
    position: "absolute",
    left: "50%",
    marginLeft: "-20px",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    transition: "top 0.2s, opacity 0.2s",
    top: `${top}px`,
    opacity: isDragging.value || isRefreshing.value || dragOffset.value > 0 ? 1 : 0,
    backgroundColor: typeof props.backgroundColor === "string" ? props.backgroundColor : undefined, // Simplify for now
  };
});

const contentStyle = computed<CSSProperties>(() => {
  return {
    height: "100%",
    transform: `translateY(${Math.min(dragOffset.value, props.triggerDistance)}px)`,
    transition: isDragging.value ? "none" : "transform 0.2s",
  };
});

const getClientY = (e: MouseEvent | TouchEvent) => {
  if ("touches" in e) {
    return e.touches[0]?.clientY || 0;
  }
  return e.clientY;
};

const handleStart = (e: MouseEvent | TouchEvent) => {
  if (isRefreshing.value) return;

  // Only start drag if we are at the top of the scroll container
  // We need to check if the first child (the scroll view) is scrolled to top
  const scrollElement = containerRef.value?.querySelector(".fluekit-scroll-view") as HTMLElement;
  if (scrollElement && scrollElement.scrollTop > 0) return;

  startY.value = getClientY(e);
  isDragging.value = true;
};

const handleMove = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value || isRefreshing.value) return;

  const currentY = getClientY(e);
  const delta = currentY - startY.value;

  if (delta > 0) {
    // Apply some resistance
    dragOffset.value = delta * 0.5;

    // Prevent default scroll if we are pulling down
    if (e.cancelable) {
      e.preventDefault();
    }
  } else {
    dragOffset.value = 0;
  }
};

const handleEnd = async () => {
  if (!isDragging.value || isRefreshing.value) return;
  isDragging.value = false;

  if (dragOffset.value >= props.triggerDistance) {
    isRefreshing.value = true;
    dragOffset.value = props.triggerDistance; // Snap to trigger distance
    try {
      await props.onRefresh();
    } finally {
      isRefreshing.value = false;
      dragOffset.value = 0;
    }
  } else {
    dragOffset.value = 0; // Snap back
  }
};
</script>
