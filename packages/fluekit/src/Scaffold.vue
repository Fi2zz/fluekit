<template>
  <Container v-bind="root">
    <LayoutBuilder>
      <template #default="{ constraints }">
        <Stack fit="expand">
          <Column expanded>
            <div style="width: 100%" v-if="hasHeader" ref="headerRef">
              <slot name="navigationBar" v-if="!$slots.appBar" />
              <slot name="appBar" v-if="!$slots.navigationBar" />
            </div>
            <SizedBox width="100%" :height="calculateBodyHeight(constraints.maxHeight)">
              <Stack fit="expand"> <slot /> </Stack>
            </SizedBox>
            <div style="width: 100%" v-if="hasFooter" ref="footerRef">
              <slot name="bottomTabBar" v-if="!$slots.bottomNavigationBar" />
              <slot name="bottomNavigationBar" v-if="!$slots.bottomTabBar" />
            </div>
          </Column>
          <slot v-if="$slots.drawer" name="drawer" :open="isDrawerOpen" :close="closeDrawer" />
          <slot
            v-if="$slots['end-drawer']"
            name="end-drawer"
            :open="isDrawerOpen"
            :close="closeDrawer"
          />
        </Stack>
      </template>
    </LayoutBuilder>
  </Container>
</template>

<script setup lang="ts">
import { computed, provide, ref, useSlots } from "vue";
import { BoxDecoration, Clip } from "./BoxDecoration";
import { Color } from "./Color";
import Column from "./Column.vue";
import Container from "./Container.vue";
import { CupertinoColors } from "./CupertinoColors";
import LayoutBuilder from "./LayoutBuilder.vue";
import SizedBox from "./SizedBox.vue";
import Stack from "./Stack.vue";
defineOptions({ inheritAttrs: false, name: "Scaffold" });
export interface ScaffoldProps {
  backgroundColor?: string | Color;
}
const props = withDefaults(defineProps<ScaffoldProps>(), {
  backgroundColor: () => CupertinoColors.systemBackground, // iOS system background
});
const slots = useSlots();
const hasDrawer = computed(() => !!slots.drawer || !!slots["end-drawer"]);
const isDrawerOpen = ref(false);
const openDrawer = () => (isDrawerOpen.value = true);
const closeDrawer = () => (isDrawerOpen.value = false);
const headerRef = ref<HTMLDivElement>();
const footerRef = ref<HTMLDivElement>();
const hasHeader = computed(() => !!slots.navigationBar || !!slots.appBar);
const hasFooter = computed(() => !!slots.bottomTabBar || !!slots.bottomNavigationBar);

const defaultHeaderHeight = computed(() => {
  return slots.appBar ? 56 : 44;
});
const defaultFooterHeight = computed(() => {
  return slots.bottomTabBar ? 56 : 50;
});

const headerHeight = computed(() =>
  hasHeader.value ? headerRef.value?.clientHeight || defaultHeaderHeight.value : 0,
);
const footerHeight = computed(() =>
  hasFooter.value ? footerRef.value?.clientHeight || defaultFooterHeight.value : 0,
);
const calculateBodyHeight = (maxHeight: number | string | undefined) => {
  if (typeof maxHeight !== "number" || !Number.isFinite(maxHeight)) return "100%";
  return maxHeight - headerHeight.value - footerHeight.value;
};
const root = computed(() => {
  return {
    decoration: BoxDecoration({ color: props.backgroundColor }),
    clipBehavior: Clip.hardEdge,
    width: "100%",
    height: "100%",
  };
});

// Provide control methods to children (e.g. AppBar leading icon)
// provide("Scaffold.bodyHeight", bodyHeight.value); // Deprecated: LayoutBuilder handles height now
provide("Scaffold.openDrawer", openDrawer);
provide("Scaffold.closeDrawer", closeDrawer);
provide("Scaffold.hasDrawer", hasDrawer);
</script>
