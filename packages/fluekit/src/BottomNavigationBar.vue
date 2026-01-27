<template>
  <Container
    :height="height"
    :color="computedBackgroundColor"
    :decoration="decoration"
    :padding="padding"
  >
    <Row main-axis-alignment="spaceAround" cross-axis-alignment="center" expanded>
      <GestureDetector
        v-for="(item, index) in items"
        :key="index"
        @tap="() => handleTap(index)"
        behavior="opaque"
      >
        <Container
          color="transparent"
          :padding="EdgeInsets.symmetric({ horizontal: 8, vertical: 4 })"
        >
          <Column main-axis-alignment="center" cross-axis-alignment="center" :gap="isIOS ? 2 : 4">
            <!-- Icon -->
            <component :is="getIcon(item, index)" :size="iconSize" :color="getColor(index)" />

            <!-- Label -->
            <Text v-if="shouldShowLabel(index)" :style="getLabelStyle(index)">
              {{ item.label }}
            </Text>
          </Column>
        </Container>
      </GestureDetector>
    </Row>
  </Container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Container from "./Container.vue";
import Row from "./Row.vue";
import Column from "./Column.vue";
import Text from "./Text.vue";
import GestureDetector from "./GestureDetector.vue";
import { EdgeInsets } from "./EdgeInsets";
import { BoxDecoration } from "./BoxDecoration";
import { Border } from "./Border";
import { TextStyle, FontWeight } from "./TextStyle";
import { BoxShadow } from "./BoxShadow";

export interface BottomNavigationBarItem {
  icon: any;
  activeIcon?: any;
  label: string;
}

interface Props {
  items: BottomNavigationBarItem[];
  currentIndex: number;
  variant?: "material" | "ios";
  backgroundColor?: string;
  selectedItemColor?: string;
  unselectedItemColor?: string;
  showSelectedLabels?: boolean;
  showUnselectedLabels?: boolean;
  elevation?: number;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "material",
  selectedItemColor: undefined, // Defaults will be calculated
  unselectedItemColor: undefined,
  showSelectedLabels: true,
  showUnselectedLabels: true,
  elevation: 8,
});

const emit = defineEmits<{
  (e: "update:currentIndex", index: number): void;
  (e: "tap", index: number): void;
}>();

const isIOS = computed(() => props.variant === "ios");

const height = computed(() => (isIOS.value ? 50 : 56));

const computedBackgroundColor = computed(() => {
  if (props.backgroundColor) return props.backgroundColor;
  return isIOS.value ? "rgba(249, 249, 249, 0.94)" : "#FFFFFF";
});

const activeColor = computed(() => {
  if (props.selectedItemColor) return props.selectedItemColor;
  return isIOS.value ? "#007AFF" : "#2196F3";
});

const inactiveColor = computed(() => {
  if (props.unselectedItemColor) return props.unselectedItemColor;
  return isIOS.value ? "#8E8E93" : "#757575";
});

const decoration = computed(() => {
  if (isIOS.value) {
    return BoxDecoration({
      border: Border.only({
        top: {
          color: "rgba(0, 0, 0, 0.3)",
          width: 0.5,
          style: "solid",
        },
      }),
      backdropFilter: "blur(20px)",
    });
  } else {
    return BoxDecoration({
      boxShadow: [
        BoxShadow({
          color: "rgba(0, 0, 0, 0.2)",
          blurRadius: props.elevation,
          offset: { x: 0, y: -2 },
        }),
      ],
    });
  }
});

const padding = computed(() => {
  // iOS needs bottom padding for home indicator on iPhone X+ (handled by safe area usually, but here simple)
  // For now simple padding
  return EdgeInsets.zero;
});

const iconSize = computed(() => (isIOS.value ? 28 : 24));

const handleTap = (index: number) => {
  emit("update:currentIndex", index);
  emit("tap", index);
};

const getIcon = (item: BottomNavigationBarItem, index: number) => {
  if (index === props.currentIndex && item.activeIcon) {
    return item.activeIcon;
  }
  return item.icon;
};

const getColor = (index: number) => {
  return index === props.currentIndex ? activeColor.value : inactiveColor.value;
};

const shouldShowLabel = (index: number) => {
  if (isIOS.value) return true;
  if (index === props.currentIndex) return props.showSelectedLabels;
  return props.showUnselectedLabels;
};

const getLabelStyle = (index: number) => {
  const isSelected = index === props.currentIndex;
  return TextStyle({
    fontSize: isIOS.value ? 10 : 12, // iOS uses 10pt captions
    fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
    color: getColor(index),
    fontFamily: isIOS.value ? "-apple-system, BlinkMacSystemFont, sans-serif" : undefined,
  });
};
</script>
