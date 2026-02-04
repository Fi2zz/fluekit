<template>
  <div class="fluekit-wrap" :style="wrapStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { Clip, clipBehaviorToStyle } from "./Clip";
import { px2vw } from "./px2vw";

defineOptions({ inheritAttrs: false });

interface Props {
  direction?: "horizontal" | "vertical";
  alignment?: "start" | "end" | "center" | "spaceBetween" | "spaceAround" | "spaceEvenly";
  spacing?: number; // 主轴方向间距
  runAlignment?: "start" | "end" | "center" | "spaceBetween" | "spaceAround" | "spaceEvenly";
  runSpacing?: number; // 纵轴方向间距 (行间距)
  crossAxisAlignment?: "start" | "end" | "center";
  verticalDirection?: "down" | "up";
  clipBehavior?: Clip;
}
const props = withDefaults(defineProps<Props>(), {
  direction: "horizontal",
  alignment: "start",
  spacing: 0,
  runAlignment: "start",
  runSpacing: 0,
  crossAxisAlignment: "start",
  verticalDirection: "down",
  clipBehavior: Clip.none,
});

const justifyMap = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  spaceBetween: "space-between",
  spaceAround: "space-around",
  spaceEvenly: "space-evenly",
};

const alignMap = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
};
const wrapStyle = computed<CSSProperties>(() => {
  const isHorizontal = props.direction === "horizontal";
  return {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: isHorizontal
      ? props.verticalDirection === "down"
        ? "row"
        : "row-reverse"
      : props.verticalDirection === "down"
        ? "column"
        : "column-reverse",
    justifyContent: justifyMap[props.alignment],
    alignContent: justifyMap[props.runAlignment],
    alignItems: alignMap[props.crossAxisAlignment],
    gap: `${px2vw(props.runSpacing)} ${px2vw(props.spacing)}`,
    ...clipBehaviorToStyle(props.clipBehavior),
  };
});
</script>
