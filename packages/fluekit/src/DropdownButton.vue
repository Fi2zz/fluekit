<template>
  <Stack ref="triggerRef">
    <GestureDetector @tap="toggleMenu">
      <Container
        :decoration="buttonDecoration"
        :padding="padding"
        :width="expanded ? '100%' : undefined"
      >
        <Row :mainAxisAlignment="MainAxisAlignment.spaceBetween" :expanded="expanded">
          <Text :style="textStyle">{{ displayLabel }}</Text>
          <Icon :icon="icon" :color="iconColor" :size="24" />
        </Row>
      </Container>
    </GestureDetector>

    <Overlay
      :visible="isOpen"
      :color="'transparent'"
      :zIndex="999"
      @tap="closeMenu"
      position="fixed"
    />

    <transition :css="false" @enter="onEnter" @leave="onLeave">
      <div v-if="isOpen" :style="menuStyle">
        <Container :constraints="constraints" :decoration="menuDecoration">
          <template v-for="(item, index) in normalizedItems" :key="index">
            <GestureDetector
              @pan-start="hoveredIndex = index"
              @pan-end="hoveredIndex = -1"
              @click="handleSelect(item)"
            >
              <Container v-bind="itemStyle(index)">
                <Row :mainAxisAlignment="MainAxisAlignment.spaceBetween">
                  <Text :style="itemTextStyle(item)">{{ item.label }}</Text>
                  <Icon
                    v-if="isSelected(item)"
                    :icon="Icons.check"
                    :size="18"
                    :color="primaryColor"
                  />
                </Row>
              </Container>
            </GestureDetector>
          </template>
        </Container>
      </div>
    </transition>
  </Stack>
</template>

<script setup lang="ts">
import { computed, ref, type ComponentPublicInstance, type CSSProperties } from "vue";
import { Border, Borders, BorderSide } from "./Border";
import { BorderRadius } from "./BorderRadius";
import { BoxConstraints } from "./BoxConstraints";
import { BoxDecoration } from "./BoxDecoration";
import { BoxShadow } from "./BoxShadow";
import { Color } from "./Color";
import { Colors } from "./Colors";
import Container from "./Container.vue";
import { EdgeInsets } from "./EdgeInsets";
import { MainAxisAlignment } from "./FlexProps";
import GestureDetector from "./GestureDetector.vue";
import Icon from "./Icon.vue";
import { Icons } from "./Icons";
import { Offset } from "./Offset";
import Overlay from "./Overlay.vue";
import Row from "./Row.vue";
import Stack from "./Stack.vue";
import Text from "./Text.vue";
import { FontWeight, TextStyle } from "./TextStyle";
import { useZIndex } from "./usePosition";
import { CupertinoColors } from "./CupertinoColors";

interface DropdownItem {
  label: string;
  value: any;
}

interface Props {
  modelValue?: any;
  items: (DropdownItem | string)[];
  variant?: "material" | "ios";
  placeholder?: string;
  expanded?: boolean;
  multiple?: boolean;
  icon?: any;
  iconColor?: string | Color;
  textColor?: string | Color;
  color?: string | Color; // Button background color
  menuColor?: string | Color; // Menu background color
  elevation?: number;
  offset?: Offset;
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  variant: "ios",
  placeholder: "Select",
  expanded: false,
  multiple: false,
  elevation: 8,
  offset: () => Offset(0, 4),
  color: "transparent",
});

const emit = defineEmits(["update:modelValue", "change"]);

const isOpen = ref(false);
const hoveredIndex = ref(-1);
const triggerRef = ref<ComponentPublicInstance | null>(null);
const menuPositionStyle = ref<CSSProperties>({});
const transformOrigin = ref("top left");

const isIos = computed(() => props.variant === "ios");

const normalizedItems = computed<DropdownItem[]>(() => {
  return props.items.map((item) => {
    if (typeof item === "string") {
      return { label: item, value: item };
    }
    return item;
  });
});

const selectedItem = computed(() => {
  if (props.multiple) {
    if (!Array.isArray(props.modelValue)) return [];
    return normalizedItems.value.filter((item) => props.modelValue.includes(item.value));
  }
  return normalizedItems.value.find((item) => item.value === props.modelValue);
});

const displayLabel = computed(() => {
  if (props.multiple) {
    const selected = selectedItem.value as DropdownItem[];
    if (selected.length === 0) return props.placeholder;
    return selected.map((item) => item.label).join(", ");
  }
  const selected = selectedItem.value as DropdownItem | undefined;
  return selected ? selected.label : props.placeholder;
});

const icon = computed(() => props.icon || Icons.caretBottom);
const iconColor = computed(() => props.iconColor || (isIos.value ? Colors.blue : Colors.black54));
const primaryColor = computed(() => (isIos.value ? CupertinoColors.systemBlue : Colors.blue));

const padding = computed(() => {
  return EdgeInsets.symmetric({ horizontal: 12, vertical: 12 });
});
const buttonDecoration = computed(() => {
  // Simple underline for material, rounded rect for iOS or if color provided
  if (isIos.value) {
    return BoxDecoration({
      color: props.color === "transparent" ? Colors.grey200 : props.color,
      borderRadius: BorderRadius.circular(8),
    });
  }
  return BoxDecoration({
    color: props.color,
    border:
      props.color === "transparent"
        ? Border.only({ bottom: { width: 1, color: Colors.grey400 } })
        : undefined,
  });
});

const menuDecoration = computed(() => {
  if (isIos.value) {
    return BoxDecoration({
      color: "rgba(255, 255, 255, 0.85)", // More translucent
      borderRadius: BorderRadius.circular(12),
      boxShadow: [BoxShadow({ color: "rgba(0,0,0,0.15)", blurRadius: 20, offset: Offset(0, 4) })],
    });
  }
  return BoxDecoration({
    color: props.menuColor || Colors.white,
    borderRadius: BorderRadius.circular(4),
    boxShadow: [
      BoxShadow({
        color: "rgba(0,0,0,0.2)",
        blurRadius: 5,
        offset: Offset(0, 5),
        spreadRadius: -1,
      }),
      BoxShadow({
        color: "rgba(0,0,0,0.14)",
        blurRadius: 10,
        offset: Offset(0, 6),
        spreadRadius: 1,
      }),
    ],
  });
});

const textStyle = computed(() => {
  return TextStyle({
    fontSize: 16,
    color: props.textColor || Colors.black87,
    fontWeight: isIos.value ? FontWeight.w500 : FontWeight.w400,
  });
});

const hoverColor = computed(() => (isIos.value ? Colors.grey200 : Colors.grey100));
const constraints = BoxConstraints({ minWidth: 120 });
const menuStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    position: "absolute",
    zIndex: useZIndex(),
    minWidth: "100%",
    ...menuPositionStyle.value,
  };

  // Apply backdrop filter for iOS
  if (isIos.value) {
    style.backdropFilter = "blur(20px)";
    // @ts-expect-error webkit prefix
    style.webkitBackdropFilter = "blur(20px)";
  }

  return style;
});

const itemStyle = (index: number) => {
  let border: Borders | undefined;
  // | "none";

  if (isIos.value) {
    border = Border.only({
      bottom: BorderSide({ width: 1, color: Colors.grey300 }),
    });
  } else {
    border = undefined;
  }

  const decoration = BoxDecoration({
    color: hoveredIndex.value === index ? hoverColor.value : "transparent",
    border,
  });
  return {
    width: "100%",
    decoration,
    padding: EdgeInsets.symmetric({ horizontal: 16, vertical: 12 }),
  };
  // return {
  //   cursor: "pointer",
  //   borderBottom: isIos.value ? `1px solid ${Colors.grey300}` : "none",
  // } as CSSProperties;
};

const itemTextStyle = (item: DropdownItem) => {
  const isSelected = item.value === props.modelValue;
  return TextStyle({
    fontSize: 16,
    color: isSelected ? primaryColor.value : Colors.black87,
    fontWeight: isSelected ? FontWeight.w500 : FontWeight.w400,
  });
};

const isSelected = (item: DropdownItem) => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.includes(item.value);
  }
  return item.value === props.modelValue;
};

const calculatePosition = () => {
  const el = (triggerRef.value as any)?.$el || triggerRef.value;
  if (!el || !el.getBoundingClientRect) return;

  const rect = (el as HTMLElement).getBoundingClientRect();
  const { innerWidth, innerHeight } = window;

  const spaceBelow = innerHeight - rect.bottom;
  const spaceAbove = rect.top;
  const spaceLeft = rect.left;
  const spaceRight = innerWidth - rect.right;

  const newStyle: CSSProperties = {};

  let originY = "top";
  let originX = "center";

  // Vertical Logic
  if (spaceBelow < 250 && spaceAbove > spaceBelow) {
    newStyle.bottom = "100%";
    newStyle.top = "auto";
    originY = "bottom";
    newStyle.marginBottom = `${props.offset.y}px`;
  } else {
    newStyle.top = "100%";
    newStyle.bottom = "auto";
    originY = "top";
    newStyle.marginTop = `${props.offset.y}px`;
  }

  // Horizontal Logic
  if (spaceLeft < 100) {
    newStyle.left = "0";
    newStyle.right = "auto";
    newStyle.transform = "none";
    originX = "left";
    newStyle.marginLeft = `${props.offset.x}px`;
  } else if (spaceRight < 100) {
    newStyle.right = "0";
    newStyle.left = "auto";
    newStyle.transform = "none";
    originX = "right";
    newStyle.marginRight = `${-props.offset.x}px`;
  } else {
    newStyle.left = "50%";
    newStyle.right = "auto";
    newStyle.transform = "translateX(-50%)";
    originX = "center";
    newStyle.marginLeft = `${props.offset.x}px`;
  }

  transformOrigin.value = `${originY} ${originX}`;
  menuPositionStyle.value = newStyle;
};

const toggleMenu = async () => {
  if (!isOpen.value) {
    calculatePosition();
  }
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};

const handleSelect = (item: DropdownItem) => {
  if (props.multiple) {
    const currentValues = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
    const index = currentValues.indexOf(item.value);

    if (index === -1) {
      currentValues.push(item.value);
    } else {
      currentValues.splice(index, 1);
    }

    emit("update:modelValue", currentValues);
    emit("change", currentValues);
    // Keep menu open for multiple selection
  } else {
    emit("update:modelValue", item.value);
    emit("change", item.value);
    closeMenu();
  }
};

// Animation logic reused from PopupMenuButton
const onEnter = (el: Element, done: () => void) => {
  const element = el as HTMLElement;
  element.style.transformOrigin = transformOrigin.value;
  let currentTransform = (element.style.transform || "").trim();
  if (currentTransform == "none") currentTransform = "";
  const keyframes = [
    { opacity: 0, transform: `${currentTransform} scale(0.95) translateY(-5px)`.trim() },
    { opacity: 1, transform: `${currentTransform} scale(1) translateY(0)`.trim() },
  ];
  const options: KeyframeAnimationOptions = {
    duration: 250,
    easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  };

  element.animate(keyframes, options).onfinish = done;
};

const onLeave = (el: Element, done: () => void) => {
  const element = el as HTMLElement;
  element.style.transformOrigin = transformOrigin.value;
  let currentTransform = (element.style.transform || "").trim();
  if (currentTransform == "none") currentTransform = "";
  const keyframes = [
    { opacity: 1, transform: `${currentTransform} scale(1)`.trim() },
    { opacity: 0, transform: `${currentTransform} scale(0.95)`.trim() },
  ];

  const options: KeyframeAnimationOptions = {
    duration: 100,
    easing: "ease-in",
  };

  element.animate(keyframes, options).onfinish = done;
};
</script>
