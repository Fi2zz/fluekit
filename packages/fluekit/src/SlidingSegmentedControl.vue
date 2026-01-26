<template>
  <Container v-bind="rootContainer">
    <Stack :fit="StackFit.expand">
      <AnimatedContainer v-bind="thumb" />
      <Row mainAxisAlignment="spaceBetween" crossAxisAlignment="center" expanded>
        <Expanded v-for="(value, key) in options" :key="key" :flex="1">
          <GestureDetector @tap="handleTap(key)">
            <Container alignment="center" height="100%" color="transparent">
              <Text :style="buildLabelTextStyle(key)" :data="value"></Text>
            </Container>
          </GestureDetector>
        </Expanded>
      </Row>
    </Stack>
  </Container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Container from "./Container.vue";
import Row from "./Row.vue";
import Stack from "./Stack.vue";
import Expanded from "./Expanded.vue";
import Text from "./Text.vue";
import GestureDetector from "./GestureDetector.vue";
import AnimatedContainer from "./AnimatedContainer.vue";
import { Color } from "./Color";
import { EdgeInsets } from "./EdgeInsets";
import { BoxDecoration } from "./BoxDecoration";
import { BorderRadius } from "./BorderRadius";
import { BoxShadow } from "./BoxShadow";
import { TextStyle, FontWeight } from "./TextStyle";
import { StackFit } from "./FlexProps";
defineOptions({ inheritAttrs: false });
interface Props {
  modelValue: string | number;
  options: Record<string | number, string>; // Map of value -> label
  disabledKeys?: (string | number)[]; // Keys that are disabled
  backgroundColor?: string | Color;
  thumbColor?: string | Color;
  decoration?: BoxDecoration;
  thumbDecoration?: BoxDecoration;
  padding?: EdgeInsets;
  height?: number | string;
  labelTextStyleBuilder?: (
    value: string | number,
    selected: boolean,
    disabled?: boolean,
  ) => TextStyle;
}
const props = withDefaults(defineProps<Props>(), {
  disabledKeys: () => [],
  backgroundColor: "#EEEEF0", // Cupertino systemGrey5
  thumbColor: "#FFFFFF",
  padding: () => EdgeInsets.all(2),
  height: 32,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();
const handleTap = (key: string | number) => {
  if (props.disabledKeys.includes(key)) return;
  emit("update:modelValue", key);
};
const rootContainer = computed(() => {
  return {
    padding: props.padding,
    decoration:
      props.decoration ||
      BoxDecoration({
        borderRadius: BorderRadius.circular(8),
        color: props.backgroundColor,
      }),
    alignment: "center",
    width: "100%",
    height: props.height,
  };
});

const thumbDecoration = computed(() => {
  if (props.thumbDecoration) return props.thumbDecoration;

  return BoxDecoration({
    color: props.thumbColor,
    borderRadius: BorderRadius.circular(6),
    boxShadow: [
      BoxShadow({
        color: "rgba(0,0,0,0.12)",
        blurRadius: 4,
        offset: { x: 0, y: 2 },
      }),
    ],
  });
});
function buildLabelTextStyle(value: string | number) {
  const disabled = props.disabledKeys.includes(value);
  const labelTextStyle = props.labelTextStyleBuilder?.(
    value,
    props.modelValue == value,
    disabled,
  ) || {
    color: disabled ? "rgba(0,0,0,0.38)" : "#000000",
  };
  return TextStyle({ fontSize: 12, fontWeight: FontWeight.w500, ...labelTextStyle });
}

const keys = computed(() => Object.keys(props.options));
const selectedIndex = computed(() => keys.value.indexOf(String(props.modelValue)));
const count = computed(() => keys.value.length);
const thumbMargin = computed(() => {
  // We simulate the slide by adjusting the left margin
  // Since AnimatedContainer handles transition, we just calculate the position
  // Note: This simple percentage based margin works because we are inside a Stack/Row structure
  // where each item has equal width.
  // Ideally, we would use Positioned, but AnimatedContainer maps easier to margin for simple translation here
  // or we could implement AnimatedPositioned later.
  // For now, let's use margin-left percentage.
  return EdgeInsets.only({ left: `${selectedIndex.value * (100 / count.value)}%` });
});

const thumb = computed(() => ({
  width: `${100 / count.value}%`,
  height: "100%",
  duration: 200,
  decoration: thumbDecoration.value,
  margin: thumbMargin.value,
}));
</script>
