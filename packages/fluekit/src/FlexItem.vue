<template>
  <div class="flex-item" :style="style" v-bind="safeAttrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, CSSProperties } from "vue";
import { px2vw } from "./px2vw";
import { useSafeAttrs } from "./useSafeAttrs";
import { FlexBoxAlignMap } from "./FlexProps";

defineOptions({ inheritAttrs: false });

// 定义 Props 接口
interface Props {
  // flex 值 (类似 Flutter 的 flex 属性)
  flex?: number;
  // FlexFit.loose (默认) or FlexFit.tight
  fit?: "loose" | "tight";
  // 对齐方式 (覆盖父容器的 crossAxisAlignment)
  alignSelf?: "auto" | "start" | "end" | "center" | "stretch" | "baseline";
  // 最小宽度/高度
  minSize?: number | string;
  // 最大宽度/高度
  maxSize?: number | string;
}

// 设置默认值
const props = withDefaults(defineProps<Props>(), {
  flex: 1,
  fit: "loose",
  alignSelf: "auto",
});

const safeAttrs = useSafeAttrs();

// 计算 CSS 样式
const style = computed(() => {
  const styles: CSSProperties = {};

  // 设置 flex 属性
  // Flutter Flexible: flex: flex 0 0 or flex 1 0 (if tight)
  // Flutter Expanded: Flexible(fit: FlexFit.tight) -> flex: flex 1 0

  if (props.fit === "tight") {
    styles.flex = `${props.flex} 1 0%`; // grow shrink basis=0
  } else {
    styles.flex = `${props.flex} 0 auto`; // grow=flex shrink=0 basis=auto
  }

  // 对齐方式
  if (props.alignSelf !== "auto") {
    styles.alignSelf = FlexBoxAlignMap[props.alignSelf!] || props.alignSelf;
  }

  // 最小尺寸
  if (props.minSize) {
    const min = px2vw(props.minSize);
    styles.minWidth = min;
    styles.minHeight = min;
  }
  // 最大尺寸
  if (props.maxSize) {
    const max = px2vw(props.maxSize);
    styles.maxWidth = max;
    styles.maxHeight = max;
  }

  return styles;
});
</script>
