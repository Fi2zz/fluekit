<template>
  <FlexBox
    direction="row"
    :main-axis-alignment="mainAxisAlignment"
    :main-axis-size="mainAxisSize"
    :cross-axis-alignment="crossAxisAlignment"
    :wrap="wrap"
    :gap="gap"
    :as="as"
    :expanded="expanded"
  >
    <slot />
  </FlexBox>
</template>

<script setup lang="ts">
import FlexBox from "./FlexBox.vue";
import { CrossAxisAlignment, FlexBoxProps, MainAxisAlignment, MainAxisSize } from "./FlexProps";
defineOptions({ inheritAttrs: false });
withDefaults(defineProps<FlexBoxProps>(), {
  mainAxisAlignment: MainAxisAlignment.start,
  mainAxisSize: MainAxisSize.max,
  crossAxisAlignment: CrossAxisAlignment.center,
});
</script>
