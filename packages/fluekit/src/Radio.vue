<template>
  <GestureDetector @tap="select">
    <Row main-axis-size="min" cross-axis-alignment="center" :gap="8">
      <slot v-if="labelPosition === 'left'" />
      <Container
        v-if="!hideIcon"
        :width="20"
        :height="20"
        :decoration="outerDecoration"
        alignment="center"
        flex="none"
      >
        <Container v-if="isSelected" :width="10" :height="10" :decoration="innerDecoration" />
      </Container>
      <slot v-if="labelPosition === 'right'" />
    </Row>
  </GestureDetector>
</template>

<script setup lang="ts" generic="T">
import { computed, inject } from "vue";
import Container from "./Container.vue";
import Row from "./Row.vue";
import GestureDetector from "./GestureDetector.vue";
import { BoxDecoration, BoxShape } from "./BoxDecoration";
import { Border } from "./Border";
import { RadioGroupKey } from "./RadioTypes";
import { Color } from "./Color";

export interface RadioProps<T> {
  value: T;
  groupValue?: T;
  onChanged?: (value: T) => void;
  activeColor?: string | Color;
  fillColor?: string | Color;
  labelPosition?: "left" | "right";
  hideIcon?: boolean;
}
const props = withDefaults(defineProps<RadioProps<T>>(), {
  activeColor: "#007AFF", // iOS Blue
  labelPosition: "right",
  hideIcon: false,
});

const emit = defineEmits<{
  (e: "update:groupValue", value: T): void;
  (e: "change", value: T): void;
}>();

const group = inject(RadioGroupKey, null);

const isSelected = computed(() => {
  if (group) {
    return props.value === group.groupValue.value;
  }
  return props.value === props.groupValue;
});

const isDisabled = computed(() => {
  return group?.disabled?.value;
});

const effectiveActiveColor = computed(() => {
  if (group && group.activeColor?.value) {
    return group.activeColor.value;
  }
  return props.activeColor;
});

const select = () => {
  if (isDisabled.value) return;
  if (isSelected.value) return; // Already selected

  if (group) {
    group.updateValue(props.value);
  } else {
    if (props.onChanged) {
      props.onChanged(props.value);
    }
    emit("update:groupValue", props.value);
    emit("change", props.value);
  }
};

const outerDecoration = computed(() => {
  return BoxDecoration({
    shape: BoxShape.circle,
    border: Border.all({
      color: isSelected.value ? effectiveActiveColor.value : "rgba(0,0,0,0.25)", // iOS inactive color like
      width: 2,
      style: "solid",
    }),
    color: props.fillColor,
  });
});

const innerDecoration = computed(() => {
  return BoxDecoration({
    shape: BoxShape.circle,
    color: effectiveActiveColor.value,
  });
});
</script>
