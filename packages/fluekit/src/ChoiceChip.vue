<template>
  <Chip
    :label="label"
    :avatar="avatar"
    :backgroundColor="selected ? selectedColor : backgroundColor"
    :labelColor="selected ? 'white' : labelColor"
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
import { Colors } from "./Colors";

defineOptions({ inheritAttrs: false });

interface Props {
  label: string;
  selected: boolean;
  avatar?: Component;
  backgroundColor?: string | Color;
  selectedColor?: string | Color;
  labelColor?: string | Color;
}

const props = withDefaults(defineProps<Props>(), {
  backgroundColor: "#E0E0E0",
  selectedColor: () => Colors.blue, // Primary color typically
  selected: false,
});

const emit = defineEmits<{
  (e: "selected", value: boolean): void;
}>();

const handlePress = () => {
  emit("selected", !props.selected);
};
</script>
