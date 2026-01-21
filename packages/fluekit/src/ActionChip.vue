<template>
  <Chip
    :label="label"
    :avatar="avatar"
    :backgroundColor="backgroundColor"
    :labelColor="labelColor"
    @pressed="handlePress"
  >
    <template #avatar v-if="$slots.avatar">
      <slot name="avatar" />
    </template>
  </Chip>
</template>

<script setup lang="ts">
import { type Component } from "vue";
import Chip from "./Chip.vue";
import { Color } from "./Color";

defineOptions({ inheritAttrs: false });

interface Props {
  label: string;
  avatar?: Component;
  backgroundColor?: string | Color;
  labelColor?: string | Color;
}
withDefaults(defineProps<Props>(), { backgroundColor: "#E0E0E0" });
const emit = defineEmits<{ (e: "pressed"): void }>();
const handlePress = () => emit("pressed");
</script>
