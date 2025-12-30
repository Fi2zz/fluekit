<template>
  <Expanded :flex="flex" />
</template>

<script setup lang="ts">
import Expanded from "./Expanded.vue";

interface Props {
  flex?: number;
}

withDefaults(defineProps<Props>(), {
  flex: 1,
});
</script>
