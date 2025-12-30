<template>
  <Container :clip-behavior="clipBehavior" :decoration="decoration">
    <slot />
  </Container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Container from "./Container.vue";
import { BoxShape, BoxDecoration } from "./BoxDecoration";

interface Props {
  clipBehavior?: "none" | "hardEdge" | "antiAlias" | "antiAliasWithSaveLayer";
}

withDefaults(defineProps<Props>(), {
  clipBehavior: "antiAlias",
});

const decoration = computed(() => {
  return BoxDecoration({ shape: BoxShape.circle });
});
</script>
