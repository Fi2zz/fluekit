<template>
  <GestureDetector @tap="select">
    <Container :width="20" :height="20" :decoration="outerDecoration" alignment="center">
      <Container v-if="isSelected" :width="10" :height="10" :decoration="innerDecoration" />
    </Container>
  </GestureDetector>
</template>

<script setup lang="ts" generic="T">
import { computed } from "vue";
import Container from "./Container.vue";
import GestureDetector from "./GestureDetector.vue";
import { BoxDecoration, BoxShape } from "./BoxDecoration";
import { Border } from "./Border";

export interface RadioProps<T> {
  value: T;
  groupValue: T;
  onChanged?: (value: T) => void;
  activeColor?: string;
}

const props = defineProps<RadioProps<T>>();

const emit = defineEmits<{
  (e: "update:groupValue", value: T): void;
}>();

const isSelected = computed(() => props.value === props.groupValue);

const select = () => {
  if (props.onChanged) {
    props.onChanged(props.value);
  }
  emit("update:groupValue", props.value);
};

const outerDecoration = computed(() => {
  return BoxDecoration({
    shape: BoxShape.circle,
    border: Border.all({
      color: isSelected.value ? props.activeColor : "rgba(0,0,0,0.54)",
      width: 2,
      style: "solid",
    }),
  });
});

const innerDecoration = computed(() => {
  return BoxDecoration({
    shape: BoxShape.circle,
    color: props.activeColor,
  });
});
</script>
