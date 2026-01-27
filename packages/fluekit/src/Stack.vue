<template>
  <div :style="stackStyle">
    <div v-for="(child, index) in children" :key="index" :style="gridItemStyle">
      <div :style="childStyle">
        <component :is="child" />
      </div>
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
  const style: CSSProperties = {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr",
    // We remove gridAlignment here because we are handling it in the wrapper
    // ...gridAlignment,
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

const wrapperAlignmentStyle = computed((): CSSProperties => {
  // Convert grid alignment (justify-items/align-items) to flex alignment (justify-content/align-items)
  // alignmentToGrid returns { justifyItems, alignItems }
  const grid = alignmentToGrid(props.alignment);

  // Map Grid to Flex
  // Grid justify-items (horizontal) -> Flex align-items (if column) or justify-content (if row)?
  // We use flexDirection: 'column' for the wrapper.
  // So horizontal alignment = align-items.
  // Vertical alignment = justify-content.

  const mapAlign = (val: string | undefined) => {
    if (val === "start") return "flex-start";
    if (val === "end") return "flex-end";
    if (val === "center") return "center";
    return "flex-start"; // default
  };

  return {
    alignItems: mapAlign(grid.justifyItems), // Horizontal
    justifyContent: mapAlign(grid.alignItems), // Vertical
  };
});

const gridItemStyle = computed(() => {
  return Object.assign(
    {
      gridArea: "1 / 1 / 2 / 2",
      // If stack alignment is set, we need to allow the child to override it if it wants to expand.
      // But we can't know if the child wants to expand without inspecting it.
      // However, we can set width/height to 100% on the wrapper and use flexbox for alignment?
      // If we do that, we lose the grid alignment features.

      // Flutter logic:
      // Stack fits loose: Stack size = max child size.
      // Aligned children are positioned within that size.
      // If a child is width: 100%, it matches the Stack size.
      // If a child is height: 100%, it matches the Stack size.
      // If a child is width: 100% and height: 100%, it matches the Stack size.

      // Flutter logic:
      // Stack fits expand: Stack size = max child size.
      // Aligned children are positioned within that size.
      // If a child is width: 100%, it matches the Stack size.
      // If a child is height: 100%, it matches the Stack size.
      // If a child is width: 100% and height: 100%, it matches the Stack size.

      // In CSS Grid:
      // If we have justify-items: center (from Stack alignment), the grid item (wrapper) is centered and shrinks.
      // Child width: 100% means 100% of the shrunk wrapper -> 0 if empty.

      // FIX: We need to set the wrapper to fill the cell, but apply the alignment to the child inside the wrapper.
      // So the wrapper is ALWAYS width: 100%; height: 100%; grid-area: 1/1/2/2.
      // And the wrapper itself is a Flex/Grid container that implements the alignment.
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      pointerEvents: "none", // Allow clicks to pass through empty areas
    },
    wrapperAlignmentStyle.value,
  ) as CSSProperties;
});

const childStyle: CSSProperties = {
  pointerEvents: "auto",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
};

provideStackContext();
</script>
