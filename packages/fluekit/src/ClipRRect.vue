<template>
  <Container :clip-behavior="clipBehavior" :decoration="decoration">
    <slot />
  </Container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Container from "./Container.vue";
import { BorderRadius } from "./BorderRadius";
import { BoxDecoration, Clip } from "./BoxDecoration";
interface Props {
  borderRadius?: BorderRadius;
  clipBehavior?: Clip;
}

const props = withDefaults(defineProps<Props>(), {
  clipBehavior: Clip.antiAlias,
});

const decoration = computed(() => {
  if (!props.borderRadius) return undefined;
  return BoxDecoration({ borderRadius: props.borderRadius });
});
</script>
