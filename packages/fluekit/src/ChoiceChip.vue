<template>
  <Chip
    :labelStyle="labelStyle"
    :decoration="decoration"
    :deletable="deletable"
    :label="label"
    :avatar="avatar"
    :backgroundColor="selected ? selectedColor : backgroundColor"
    :labelColor="selected ? selectedTextColor : labelColor"
    @pressed="() => $emit('selected', !selected)"
  >
    <template #avatar v-if="$slots.avatar">
      <slot name="avatar" />
    </template>
  </Chip>
</template>

<script setup lang="ts">
import Chip from "./Chip.vue";
import { ChoiceChipEmits, ChoiceChipProps } from "./ChipProps";
import { Colors } from "./Colors";
defineOptions({ inheritAttrs: false });
defineEmits<ChoiceChipEmits>();
withDefaults(defineProps<ChoiceChipProps>(), {
  backgroundColor: "#E0E0E0",
  selectedColor: () => Colors.blue, // Primary color typically
  selected: false,
  selectedTextColor: () => Colors.white,
});
</script>
