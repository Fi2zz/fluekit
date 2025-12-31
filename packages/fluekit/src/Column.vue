<template>
  <FlexBox
    direction="column"
    :main-axis-alignment="mainAxisAlignment"
    :main-axis-size="mainAxisSize"
    :cross-axis-alignment="crossAxisAlignment"
    :wrap="wrap"
    :gap="gap"
    :expanded="expanded"
  >
    <slot />
  </FlexBox>
</template>

<script setup lang="ts">
import { FlexBoxProps, MainAxisSize } from "./FlexProps";
import FlexBox from "./FlexBox.vue";
defineOptions({ inheritAttrs: false });
withDefaults(defineProps<FlexBoxProps>(), {
  mainAxisSize: MainAxisSize.max,
});
</script>
