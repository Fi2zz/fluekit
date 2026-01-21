<template>
  <Container height="48" color="transparent" width="100%">
    <Stack>
      <!-- Indicator -->
      <Positioned bottom="0" height="2" width="100%" v-if="showIndicator">
        <AnimatedContainer v-bind="indicatorProps" />
      </Positioned>
      <!-- Tabs -->
      <Row mainAxisSize="max">
        <Expanded v-for="(tab, index) in tabs" :key="index" :flex="1">
          <GestureDetector @tap="handleTap(index)">
            <Container height="48" alignment="center" color="transparent">
              <Row mainAxisSize="min" crossAxisAlignment="center" :gap="8">
                <component :is="tab.icon" v-if="typeof tab === 'object' && tab.icon" />
                <Text :style="labelTextStyle(index)" :data="labelText(tab)" />
              </Row>
            </Container>
          </GestureDetector>
        </Expanded>
      </Row>
    </Stack>
  </Container>
</template>

<script setup lang="ts">
import { computed, type Component } from "vue";
import Container from "./Container.vue";
import Row from "./Row.vue";
import Stack from "./Stack.vue";
import Expanded from "./Expanded.vue";
import Text from "./Text.vue";
import GestureDetector from "./GestureDetector.vue";
import AnimatedContainer from "./AnimatedContainer.vue";
import { Color } from "./Color";
import { Colors } from "./Colors";
import { EdgeInsets } from "./EdgeInsets";
import { TextStyle, FontWeight } from "./TextStyle";
import Positioned from "./Positioned.vue";

defineOptions({ inheritAttrs: false });

interface TabItem {
  text?: string;
  icon?: Component;
}

interface Props {
  modelValue: number;
  tabs: (string | TabItem)[];
  indicatorColor?: string | Color;
  labelColor?: string | Color;
  unselectedLabelColor?: string | Color;
  showIndicator?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  indicatorColor: () => Colors.blue,
  labelColor: () => Colors.blue,
  unselectedLabelColor: "rgba(0, 0, 0, 0.6)",
  showIndicator: true,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const handleTap = (index: number) => {
  emit("update:modelValue", index);
};

function labelTextStyle(index: number) {
  return TextStyle({
    color: props.modelValue === index ? props.labelColor : props.unselectedLabelColor,
    fontWeight: FontWeight.w500,
    fontSize: 14,
  });
}
function labelText(tab: TabItem | string) {
  return typeof tab === "string" ? tab : tab.text;
}

const count = computed(() => props.tabs.length);

const indicatorMargin = computed(() => {
  return EdgeInsets.only({ left: `${props.modelValue * (100 / count.value)}%` });
});
const indicatorProps = computed(() => {
  return {
    duration: 300,
    width: `${100 / count.value}%`,
    height: 2,
    color: props.indicatorColor,
    margin: indicatorMargin.value,
    alignment: "bottomLeft",
  };
});
</script>
