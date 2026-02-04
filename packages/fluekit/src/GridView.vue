<template>
  <ScrollView
    :scroll-direction="scrollDirection"
    :padding="padding"
    :physics="physics"
    :clip-behavior="clipBehavior"
    :shrink-wrap="shrinkWrap"
  >
    <div class="grid-view-content" :style="gridStyle">
      <!-- 模式1: 静态子元素 -->
      <slot v-if="!itemCount" />
      <!-- 模式2: 构建器模式 -->
      <template v-else>
        <template v-for="index in itemCount" :key="index - 1">
          <slot name="item" :index="index - 1"></slot>
        </template>
      </template>
    </div>
  </ScrollView>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { Clip } from "./Clip";
import { px2vw } from "./px2vw";
import { GridViewProps } from "./Scrollable";
import ScrollView from "./ScrollView.vue";
defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<GridViewProps>(), {
  scrollDirection: "vertical",
  physics: "bouncing",
  shrinkWrap: false,
  clipBehavior: Clip.hardEdge,
  crossAxisCount: 2,
  mainAxisSpacing: 0,
  crossAxisSpacing: 0,
  childAspectRatio: 1.0,
});

const gridStyle = computed<CSSProperties>(() => {
  const isVertical = props.scrollDirection === "vertical";
  const mainGap =
    typeof props.mainAxisSpacing === "number"
      ? px2vw(props.mainAxisSpacing)
      : props.mainAxisSpacing;
  const crossGap =
    typeof props.crossAxisSpacing === "number"
      ? px2vw(props.crossAxisSpacing)
      : props.crossAxisSpacing;

  return {
    display: "grid",
    // 垂直滚动：主轴是行，交叉轴是列
    gridTemplateColumns: isVertical ? `repeat(${props.crossAxisCount}, 1fr)` : "none",
    gridTemplateRows: !isVertical ? `repeat(${props.crossAxisCount}, 1fr)` : "none",
    gridAutoFlow: isVertical ? "row" : "column",
    gap: isVertical ? `${mainGap} ${crossGap}` : `${crossGap} ${mainGap}`,
    // 确保 Grid 容器尺寸能够撑开 ScrollView
    minWidth: isVertical ? "100%" : "max-content",
    minHeight: isVertical ? "max-content" : "100%",
  };
});
</script>
