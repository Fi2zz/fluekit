<template>
  <Container :clip-behavior="clipBehavior" :decoration="decoration">
    <slot />
  </Container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Container from "./Container.vue";
import { BoxShape, BoxDecoration, Clip } from "./BoxDecoration";
interface Props {
  clipBehavior?: Clip;
}
withDefaults(defineProps<Props>(), { clipBehavior: Clip.antiAlias });
const decoration = computed(() => {
  return BoxDecoration({ shape: BoxShape.circle });
});
</script>
