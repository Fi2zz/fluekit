<template>
  <Container :decoration="containerDecoration" clip-behavior="hardEdge">
    <Row>
      <GestureDetector v-for="(item, index) in items" :key="index" @tap="handleTap(item.value)">
        <Container
          :padding="padding"
          :decoration="getItemDecoration(item.value, index)"
          alignment="center"
        >
          <Text :style="getItemTextStyle(item.value)">{{ item.label }}</Text>
        </Container>
      </GestureDetector>
    </Row>
  </Container>
</template>

<script setup lang="ts" generic="T extends string | number | boolean">
import { computed } from "vue";
import Container from "./Container.vue";
import Row from "./Row.vue";
import Text from "./Text.vue";
import GestureDetector from "./GestureDetector.vue";
import { BoxDecoration } from "./BoxDecoration";
import { Border, BorderSide } from "./Border";
import { EdgeInsets } from "./EdgeInsets";
import { TextStyle } from "./TextStyle";
import { BorderRadius } from "./BorderRadius";

export interface SegmentedControlItem<T> {
  value: T;
  label: string;
}

export interface SegmentedControlProps<T> {
  modelValue: T;
  items: SegmentedControlItem<T>[];
  selectedColor?: string;
  unselectedColor?: string;
  borderColor?: string;
  padding?: EdgeInsets;
}

const props = withDefaults(defineProps<SegmentedControlProps<T>>(), {
  selectedColor: "#007AFF", // iOS default blue
  unselectedColor: "transparent",
  borderColor: "#007AFF",
  padding: () => EdgeInsets.symmetric({ vertical: 8, horizontal: 16 }),
});

const emit = defineEmits<{
  (e: "update:modelValue", value: T): void;
  (e: "change", value: T): void;
}>();

const handleTap = (value: T) => {
  if (value !== props.modelValue) {
    emit("update:modelValue", value);
    emit("change", value);
  }
};

const containerDecoration = computed(() => {
  return BoxDecoration({
    border: Border.all({
      color: props.borderColor,
      width: 1,
    }),
    borderRadius: BorderRadius.circular(4),
  });
});

const getItemDecoration = (value: T, index: number) => {
  const isSelected = value === props.modelValue;
  const isLast = index === props.items.length - 1;

  return BoxDecoration({
    color: isSelected ? props.selectedColor : props.unselectedColor,
    border: !isLast
      ? Border.only({
          right: BorderSide({
            color: props.borderColor,
            width: 1,
          }),
        })
      : undefined,
  });
};

const getItemTextStyle = (value: T) => {
  const isSelected = value === props.modelValue;
  return TextStyle({
    color: isSelected ? "#FFFFFF" : props.borderColor,
    fontSize: 13,
  });
};
</script>
