<template>
  <div class="fluekit-animation" :style="computedStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { animationToStyle, type AnimationOptions } from "./Animation";

interface Props {
  animation: AnimationOptions;
}

const props = defineProps<Props>();

const computedStyle = computed<CSSProperties>(() => {
  return animationToStyle(props.animation) as CSSProperties;
});
</script>

<style scoped>
.fluekit-animation {
  display: contents; /* Allows child layout to behave as if this wrapper doesn't exist, mostly */
  /* OR display: block/inline-block depending on needs. 
     If we want the animation to affect layout (e.g. transform), we need a block-level wrapper. 
     display: contents doesn't support transform/animation on itself in some browsers/contexts correctly 
     if the animation is on the wrapper.
     
     Actually, `display: contents` elements generally do NOT render a box, so properties like transform, 
     animation, etc. won't work on them. 
     So we MUST use a real element like div.
  */
  display: inherit;
}
</style>
