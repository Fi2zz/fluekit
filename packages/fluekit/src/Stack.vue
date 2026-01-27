<template>
  <div :style="stackStyle">
    <div v-for="(child, index) in children" :key="index" :style="{ gridArea: '1 / 1 / 2 / 2' }">
      <component :is="child" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties, useSlots } from "vue";
import { provideStackContext } from "./useStack";
import { Alignment, alignmentToGrid } from "./Alignment";
import { StackFit } from "./FlexProps";

defineOptions({ inheritAttrs: false });

interface StackProps {
  /** 对齐方式 */
  alignment?: Alignment;
  /** 裁剪行为 */
  clipBehavior?: "none" | "hardEdge" | "antiAlias" | "clip";
  /** 文本方向 */
  textDirection?: "ltr" | "rtl";
  /** 堆叠方式 */
  fit?: StackFit;
}

const props = withDefaults(defineProps<StackProps>(), {
  alignment: Alignment.topLeft,
  clipBehavior: "none",
  textDirection: "ltr",
  fit: StackFit.loose,
});

const slots = useSlots();
const children = computed(() => {
  const defaultSlot = (slots as any).default;
  return defaultSlot ? defaultSlot() : [];
});

const clipBehaviorMap = {
  clip: "hidden",
  hardEdge: "hidden",
  antiAlias: "hidden",
  none: "visible",
};

const stackStyle = computed((): CSSProperties => {
  const gridAlignment = alignmentToGrid(props.alignment);

  const style: CSSProperties = {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr",
    ...gridAlignment,
    overflow: clipBehaviorMap[props.clipBehavior],
    direction: props.textDirection,
    boxSizing: "border-box",
  };

  if (props.fit === StackFit.expand) {
    style.width = "100%";
    style.height = "100%";
  }
  return style;
});

provideStackContext();
</script>
