<template>
  <Chip
    :label="label"
    :avatar="avatar"
    :backgroundColor="backgroundColor"
    :labelColor="labelColor"
    @pressed="() => $emit('pressed')"
    @delete="() => $emit('delete')"
  >
    <template #avatar v-if="$slots.avatar">
      <slot name="avatar" />
    </template>
  </Chip>
</template>

<script setup lang="ts">
import Chip from "./Chip.vue";
import { ChilpProps, ChipEmits } from "./ChipProps";
defineOptions({ inheritAttrs: false });
defineProps<ChilpProps>();
const emit = defineEmits<ChipEmits>();
</script>
