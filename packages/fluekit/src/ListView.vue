<template>
  <component
    :is="onRefresh ? RefreshIndicator : 'div'"
    :onRefresh="onRefresh"
    class="fluekit-list-view-wrapper"
  >
    <ScrollView
      :scroll-direction="scrollDirection"
      :padding="padding"
      :physics="physics"
      :clip-behavior="clipBehavior"
      :shrink-wrap="shrinkWrap"
    >
      <div class="list-view-content" :style="contentStyle">
        <slot v-if="!itemCount" />
        <template v-else>
          <template v-for="index in itemCount" :key="index - 1">
            <slot name="item" :index="index - 1"></slot>
            <div v-if="separator && index < itemCount" class="list-view-separator">
              <slot name="separator" :index="index - 1"></slot>
            </div>
          </template>
        </template>
      </div>
    </ScrollView>
  </component>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import type { EdgeInsets } from "./EdgeInsets";
import ScrollView from "./ScrollView.vue";
import RefreshIndicator from "./RefreshIndicator.vue";

defineOptions({ inheritAttrs: false });

interface Props {
  scrollDirection?: "vertical" | "horizontal";
  padding?: EdgeInsets;
  physics?: "bouncing" | "clamping" | "never" | "always";
  shrinkWrap?: boolean;
  itemCount?: number;
  itemExtent?: number;
  separator?: boolean; // 是否启用分隔符
  clipBehavior?: "none" | "hardEdge" | "antiAlias";
  onRefresh?: () => Promise<void>;
}

const props = withDefaults(defineProps<Props>(), {
  scrollDirection: "vertical",
  physics: "bouncing",
  shrinkWrap: false,
  clipBehavior: "hardEdge",
  separator: false,
});

const contentStyle = computed<CSSProperties>(() => {
  const isVertical = props.scrollDirection === "vertical";
  return {
    display: "flex",
    flexDirection: isVertical ? "column" : "row",
    gap: "0px", // 默认无间距，由 separator 控制
    // 在横向滚动时，强制 Flex 容器宽度适应内容，防止子元素收缩，从而触发 ScrollView 滚动
    minWidth: isVertical ? "100%" : "max-content",
  };
});
</script>

<style scoped>
.fluekit-list-view-wrapper {
  height: 100%;
  width: 100%;
  display: block;
  overflow: hidden;
}
</style>
