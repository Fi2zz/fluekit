<template>
  <GestureDetector @tap="toggle">
    <Container
      :width="trackWidth"
      :height="trackHeight"
      :padding="EdgeInsets.all(2)"
      :decoration="trackDecoration"
    >
      <AnimatedContainer
        :duration="200"
        :width="thumbSize"
        :height="thumbSize"
        :margin="thumbMargin"
        :decoration="thumbDecoration"
      />
    </Container>
  </GestureDetector>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Container from "./Container.vue";
import AnimatedContainer from "./AnimatedContainer.vue";
import GestureDetector from "./GestureDetector.vue";
import { BoxDecoration, BoxShape } from "./BoxDecoration";
import { BorderRadius } from "./BorderRadius";
import { EdgeInsets } from "./EdgeInsets";
import { Color } from "./Color";
interface Props {
  activeColor?: string | Color;
  activeTrackColor?: string | Color;
  inactiveThumbColor?: string | Color;
  inactiveTrackColor?: string | Color;
  variant?: "material" | "ios";
}

const props = withDefaults(defineProps<Props>(), {
  activeColor: "#FFF", // iOS Green
  activeTrackColor: "#34C759",
  inactiveThumbColor: "#FFFFFF",
  inactiveTrackColor: "#E9E9EA", // iOS Gray
  variant: "ios",
});

const model = defineModel("value", { type: Boolean, default: false });
const emit = defineEmits<{ (e: "change", value: boolean): void }>();
const toggle = () => {
  model.value = !model.value;
  emit("change", model.value);
};
const isIOS = computed(() => props.variant === "ios");
const trackWidth = computed(() => (isIOS.value ? 51 : 36));
const trackHeight = computed(() => (isIOS.value ? 31 : 20)); // iOS height 31
const thumbSize = computed(() => (isIOS.value ? 27 : 16));

const trackDecoration = computed(() => {
  const color = model.value ? props.activeTrackColor : props.inactiveTrackColor;
  return BoxDecoration({
    color: color,
    borderRadius: BorderRadius.circular(isIOS.value ? 100 : 10), // Pill shape for iOS
  });
});

const thumbDecoration = computed(() => {
  const color = model.value ? props.activeColor : props.inactiveThumbColor;
  return BoxDecoration({
    color: color,
    shape: BoxShape.circle,
    boxShadow: [
      {
        color: "rgba(0,0,0,0.3)",
        blurRadius: isIOS.value ? 3 : 1,
        offset: { x: 0, y: isIOS.value ? 2 : 1 },
      },
    ],
  });
});

const thumbMargin = computed(() => {
  // Simple approximation of sliding
  // iOS padding: 2px
  const padding = 2;
  const slideDistance = trackWidth.value - thumbSize.value - padding * 2;
  return EdgeInsets.only({ left: model.value ? slideDistance : 0 });
});
</script>
