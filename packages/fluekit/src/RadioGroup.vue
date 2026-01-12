<template>
  <div class="flue-radio-group">
    <slot />
  </div>
</template>

<script setup lang="ts" generic="T">
import { provide, toRefs } from "vue";
import { RadioGroupKey } from "./RadioTypes";

export interface RadioGroupProps<T> {
  value?: T; // The currently selected value (v-model:value or v-model)
  activeColor?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<RadioGroupProps<T>>(), {
  disabled: false,
});

const emit = defineEmits<{
  (e: "update:value", value: T): void;
  (e: "change", value: T): void;
}>();

const updateValue = (val: T) => {
  if (props.value === val) return;
  emit("update:value", val);
  emit("change", val);
};

const { value, activeColor, disabled } = toRefs(props);

provide(RadioGroupKey, {
  groupValue: value,
  updateValue,
  activeColor,
  disabled,
});
</script>
