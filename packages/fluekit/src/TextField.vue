<template>
  <div :style="wrapperStyle">
    <!-- Icon (Outside Left) -->
    <div v-if="$slots.icon || decoration?.icon" :style="iconStyle">
      <slot name="icon">
        <Icon
          :icon="decoration?.icon"
          :size="decoration?.iconSize"
          :color="decoration?.iconColor"
        />
      </slot>
    </div>

    <div :style="contentWrapperStyle">
      <!-- Input Container -->
      <div :style="containerStyle">
        <!-- Label -->
        <label v-if="decoration?.labelText && shouldShowLabel" :style="labelStyle">
          {{ decoration.labelText }}
        </label>
        <!-- Prefix Icon (Inside Left) -->
        <div v-if="$slots.prefixIcon || decoration?.prefixIcon" :style="prefixIconStyle">
          <slot name="prefixIcon">
            <Icon
              :icon="decoration?.prefixIcon"
              :size="decoration?.prefixIconSize"
              :color="decoration?.prefixIconColor"
            />
          </slot>
        </div>

        <!-- Prefix (Text/Widget) -->
        <div v-if="$slots.prefix || decoration?.prefixText" ref="prefixRef">
          <slot name="prefix">{{ decoration?.prefixText }}</slot>
        </div>

        <!-- Input Element Wrapper -->
        <div :style="inputWrapperStyle">
          <!-- Custom Placeholder -->
          <div v-if="!modelValue && placeholderText" :style="placeholderStyle">
            {{ placeholderText }}
          </div>

          <!-- Input Element -->
          <component
            :is="isMultiline ? 'textarea' : 'input'"
            ref="inputRef"
            :value="modelValue"
            :disabled="!enabled"
            :readonly="readOnly"
            :type="inputType"
            :rows="minLines || 1"
            :style="finalInputStyle"
            :maxlength="maxLength"
            :autocapitalize="textCapitalization"
            :enterkeyhint="textInputAction"
            :autocorrect="autocorrect ? 'on' : 'off'"
            @input="handleInput"
            @change="handleChange"
            @focus="handleFocus"
            @blur="handleBlur"
          />
        </div>

        <!-- Suffix (Text/Widget) -->
        <div v-if="$slots.suffix || decoration?.suffixText">
          <slot name="suffix">{{ decoration?.suffixText }}</slot>
        </div>

        <!-- Suffix Icon (Inside Right) -->
        <div v-if="$slots.suffixIcon || decoration?.suffixIcon" :style="suffixIconStyle">
          <slot name="suffixIcon">
            <Icon
              :icon="decoration?.suffixIcon"
              :size="decoration?.suffixIconSize"
              :color="decoration?.suffixIconColor"
            ></Icon>
          </slot>
        </div>
      </div>

      <!-- Helper/Error Text -->
      <div v-if="shouldShowFooter" :style="footerStyle">
        <div v-if="decoration?.errorText || decoration?.alwaysShowError" :style="errorStyle">
          {{ decoration?.errorText || "&nbsp;" }}
        </div>
        <div v-else-if="decoration?.helperText" :style="helperStyle">
          {{ decoration.helperText }}
        </div>

        <!-- Spacer if helper exists but we want counter on the right -->
        <div v-else :style="{ flex: 1 }"></div>

        <!-- Character Counter -->
        <div v-if="shouldShowCounter" :style="counterStyle">
          {{ decoration?.counterText || `${String(modelValue).length} / ${maxLength}` }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  useSlots,
  computed,
  type CSSProperties,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
import { BorderSide, borderSideToStyle } from "./Border";
import { BorderRadius, borderRadiusToStyle } from "./BorderRadius";
import { Color, resolveColor } from "./Color";
import { paddingToStyle } from "./EdgeInsets";
import {
  FloatingLabelBehavior,
  type InputBorder,
  type InputDecoration,
  UnderlineInputBorder,
} from "./InputDecoration";
import { type TextStyle, toCSSStyle as textStyleToCSS } from "./TextStyle";

import { boxConstraintsToStyle } from "./BoxConstraints";

import Icon from "./Icon.vue";

defineOptions({ inheritAttrs: false });

interface Props {
  modelValue?: string | number;
  decoration?: InputDecoration;
  enabled?: boolean;
  readOnly?: boolean;
  obscureText?: boolean;
  maxLines?: number | null; // 1 = input, >1 or null = textarea
  minLines?: number;
  keyboardType?: string; // 'text', 'number', 'email', 'multiline', etc.
  style?: TextStyle; // Text style
  cursorColor?: string | Color;
  autofocus?: boolean;
  autoGrow?: boolean;
  maxLength?: number;
  textAlign?: "left" | "center" | "right" | "justify" | "start" | "end";
  textInputAction?: "enter" | "done" | "go" | "next" | "previous" | "search" | "send";
  textCapitalization?: "none" | "sentences" | "words" | "characters";
  autocorrect?: boolean;
  modelModifiers?: Record<string, boolean>;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  enabled: true,
  readOnly: false,
  obscureText: false,
  maxLines: 1,
  autoGrow: false,
  textAlign: "start",
  autocorrect: true,
  modelModifiers: () => ({}),
});

const slots = useSlots();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
  (e: "focus", event: FocusEvent): void;
  (e: "blur", event: FocusEvent): void;
  (e: "submit", value: string): void;
}>();

const isComponent = (icon: InputDecoration["icon"]) => {
  return typeof icon === "object" || typeof icon === "function";
};

const inputRef = ref<HTMLInputElement | HTMLTextAreaElement | null>(null);
const isFocused = ref(false);
const prefixRef = ref<HTMLElement | null>(null);
const prefixWidth = ref(0);
let _ro: ResizeObserver | null = null;
const _autoGrow = () => {
  const el = inputRef.value as HTMLTextAreaElement | null;
  if (!el || !isMultiline.value) return;

  if (!props.autoGrow) {
    el.style.height = "";
    el.style.minHeight = "";
    el.style.maxHeight = "";
    return;
  }

  const cs = window.getComputedStyle(el);
  const lh = parseFloat(cs.lineHeight || "0") || parseFloat(cs.fontSize || "16") * 1.2;
  const min = (props.minLines || 1) * lh;
  el.style.minHeight = `${Math.round(min)}px`;
  if (props.maxLines && props.maxLines > 1) {
    const max = props.maxLines * lh;
    el.style.maxHeight = `${Math.round(max)}px`;
  } else {
    el.style.maxHeight = "";
  }
  el.style.height = "auto";
  el.style.height = `${Math.max(Math.round(min), el.scrollHeight)}px`;
};

onMounted(() => {
  if (prefixRef.value) {
    _ro = new ResizeObserver(() => {
      prefixWidth.value = Math.round(prefixRef.value!.getBoundingClientRect().width);
    });
    _ro.observe(prefixRef.value);
    prefixWidth.value = Math.round(prefixRef.value.getBoundingClientRect().width);
  }
  nextTick(_autoGrow);
});

onBeforeUnmount(() => {
  if (_ro) {
    _ro.disconnect();
    _ro = null;
  }
});

const isMultiline = computed(() => {
  return props.maxLines === null || props.maxLines > 1 || props.keyboardType === "multiline";
});

const inputType = computed(() => {
  if (isMultiline.value) return undefined; // textarea doesn't need type
  if (props.obscureText) return "password";
  return props.keyboardType === "number" ? "number" : "text"; // Simplified
});

const isFloating = computed(() => {
  const behavior = props.decoration?.floatingLabelBehavior || FloatingLabelBehavior.auto;

  if (behavior === FloatingLabelBehavior.never) return false;
  if (behavior === FloatingLabelBehavior.always) return true;

  // Auto behavior
  return (
    isFocused.value ||
    (props.modelValue !== "" && props.modelValue !== null && props.modelValue !== undefined)
  );
});

const shouldShowLabel = computed(() => {
  // If behavior is never, we still show label but it behaves like placeholder?
  // No, in Flutter, if FloatingLabelBehavior.never, the label is NOT shown if there is content (it acts as hint).
  // But our implementation of label is separate from input::placeholder.
  // If behavior is never, we might want to hide the label element if it's not floating (i.e. use placeholder).
  // However, for simplicity here, we assume labelText always renders the label element,
  // and isFloating determines its position.
  // If behavior is never, isFloating is false. So label sits inside.
  // BUT, if input has content, the label overlaps text if it doesn't float.
  // So if behavior is never, we should probably hide label if content exists?
  // Flutter logic: If never, label replaces hint. When focused/has text, label disappears?
  // Let's stick to standard behavior:
  // If never, it stays inline. If content exists, it must disappear to avoid overlap.

  if (props.decoration?.floatingLabelBehavior === FloatingLabelBehavior.never) {
    const hasContent =
      props.modelValue !== "" && props.modelValue !== null && props.modelValue !== undefined;
    if (hasContent) return false;
    // Also if focused, we usually want to type, so label should disappear?
    // In Material 3, 'never' behaves like a placeholder.
    if (isFocused.value) return false;
  }
  return true;
});

// When label is present and not floating, hide hint to avoid overlap with label.
const placeholderText = computed(() => {
  if (props.decoration?.labelText && shouldShowLabel.value && !isFloating.value) return "";
  return props.decoration?.hintText || "";
});

watch(
  () => props.modelValue,
  () => nextTick(_autoGrow),
);
watch(isMultiline, (v) => v && nextTick(_autoGrow));
watch(
  () => props.maxLines,
  () => nextTick(_autoGrow),
);
watch(
  () => props.minLines,
  () => nextTick(_autoGrow),
);
watch(
  () => props.autoGrow,
  () => nextTick(_autoGrow),
);

// Styles
const currentBorder = computed<InputBorder | undefined>(() => {
  if (props.decoration?.errorText) {
    if (isFocused.value && props.decoration.focusedErrorBorder) {
      return props.decoration.focusedErrorBorder;
    }
    if (props.decoration.errorBorder) {
      return props.decoration.errorBorder;
    }
  }

  if (!props.enabled && props.decoration?.disabledBorder) return props.decoration.disabledBorder;
  if (isFocused.value && props.decoration?.focusedBorder) return props.decoration.focusedBorder;
  if (props.enabled && props.decoration?.enabledBorder) return props.decoration.enabledBorder;
  return props.decoration?.border; // Default fallback
});

const containerStyle = computed<CSSProperties>(() => {
  if (props.decoration?.isCollapsed) {
    return {
      display: "flex",
      alignItems: isMultiline.value ? "flex-start" : "center",
      position: "relative",
      width: "100%",
    };
  }

  const css: CSSProperties = {
    display: "flex",
    alignItems: isMultiline.value ? "flex-start" : "center",
    position: "relative",
    transition: "all 0.2s ease",
    width: "100%", // ensure it fills space in row
    ...boxConstraintsToStyle(props.decoration?.constraints),
  };

  // Border logic
  const border = currentBorder.value || UnderlineInputBorder(); // Default to Underline if not specified? Or maybe none?
  // Flutter defaults to Underline in Material.

  if (border.isOutline) {
    // Outline border logic
    const side = border.borderSide || BorderSide({ width: 1, color: "#888" });
    const radius = border.borderRadius || BorderRadius.all(4);
    Object.assign(css, borderSideToStyle(side));
    Object.assign(css, borderRadiusToStyle(radius));
    // Override border style to specific key if borderSideToStyle returns generic 'border'
    // Actually borderSideToStyle returns 'border: 1px solid color'.

    // Padding
    const isDense = props.decoration?.isDense;
    // Standard M3: 16px horizontal. Dense: 12px?
    // Vertical: Standard ~16px, Dense ~12px.
    // Let's use simple defaults.
    const py = isDense ? 8 : 16;
    const px = isDense ? 8 : 12;

    if (props.decoration?.contentPadding) {
      if (Array.isArray(props.decoration.contentPadding)) {
        css.padding = props.decoration.contentPadding.map((v) => `${v}px`).join(" ");
      } else if (typeof props.decoration.contentPadding === "number") {
        css.padding = `${props.decoration.contentPadding}px`;
      } else {
        // EdgeInsets
        Object.assign(css, paddingToStyle(props.decoration.contentPadding));
      }
    } else {
      css.padding = `${py}px ${px}px`;
    }
  } else {
    // Underline logic
    const side = border.borderSide || BorderSide({ width: 1, color: "#888" });
    css.borderBottom = `${side.width}px ${side.style || "solid"} ${resolveColor(side.color)}`;
    css.borderRadius = "0"; // No radius for underline usually

    const isDense = props.decoration?.isDense;
    const py = isDense ? 8 : 12; // Underline usually has less vertical padding?

    if (props.decoration?.contentPadding) {
      if (Array.isArray(props.decoration.contentPadding)) {
        css.padding = props.decoration.contentPadding.map((v) => `${v}px`).join(" ");
      } else if (typeof props.decoration.contentPadding === "number") {
        css.padding = `${props.decoration.contentPadding}px`;
      } else {
        // EdgeInsets
        Object.assign(css, paddingToStyle(props.decoration.contentPadding));
      }
    } else {
      css.padding = `${py}px 0`;
    }
  }

  // Background
  if (props.decoration?.filled) {
    css.backgroundColor = resolveColor(props.decoration.fillColor) || "#f0f0f0";
  }

  return css;
});

const wrapperStyle = computed<CSSProperties>(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  position: "relative",
  marginTop: "16px",
  fontFamily: "inherit",
  width: "100%",
}));

const iconStyle = computed<CSSProperties>(() => ({
  marginRight: "16px",
  marginTop: "12px",
  display: "flex",
  alignItems: "center",
  color: resolveColor(props.decoration?.iconColor) || "inherit",
}));

const contentWrapperStyle: CSSProperties = {
  flex: 1,
  position: "relative",
  display: "flex",
  flexDirection: "column",
};

const prefixIconStyle = computed<CSSProperties>(() => ({
  display: "flex",
  alignItems: "center",
  padding: "0 8px",
  color: resolveColor(props.decoration?.prefixIconColor) || "#666",
  paddingLeft: 0,
}));

const suffixIconStyle = computed<CSSProperties>(() => ({
  display: "flex",
  alignItems: "center",
  padding: "0 8px",
  color: resolveColor(props.decoration?.suffixIconColor) || "#666",
  paddingRight: 0,
}));

const inputWrapperStyle: CSSProperties = {
  flex: 1,
  position: "relative",
  display: "flex",
};

const finalInputStyle = computed<CSSProperties>(() => {
  const css: CSSProperties = {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    padding: 0,
    margin: 0,
    width: "100%",
    fontFamily: "inherit",
    fontSize: "16px",
    color: "inherit",
    resize: "none",
    ...textStyleToCSS(props.style),
  };
  if (props.cursorColor) {
    css.caretColor = resolveColor(props.cursorColor);
  }
  if (props.textAlign) {
    css.textAlign = props.textAlign;
  }
  return css;
});

const placeholderStyle = computed<CSSProperties>(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: "none",
  color: hintColor.value,
  fontSize: hintFontStyle.value,
  textAlign: props.textAlign || "start",
  whiteSpace: isMultiline.value ? "pre-wrap" : "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  ...textStyleToCSS(props.decoration?.hintStyle),
}));

const footerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "4px",
};

const labelStyle = computed<CSSProperties>(() => {
  const css: CSSProperties = {
    position: "absolute",
    zIndex: 1,
    // Adjust left based on prefixIcon presence
    left: `${(currentBorder.value?.isOutline ? 12 : 0) + (prefixWidth.value || 0) + (props.decoration?.prefixIcon || slots.prefixIcon ? 40 : 0)}px`,
    top: currentBorder.value?.isOutline ? "50%" : "0", // Center vertically initially
    transform: "translateY(-50%)",
    pointerEvents: "none",
    transition: "all 0.2s ease",
    color: "#666",
    ...textStyleToCSS(props.decoration?.labelStyle),
  };

  if (isFloating.value) {
    css.top = "0";
    css.transform = "translateY(-100%) scale(0.75)";
    css.transformOrigin = "left bottom";
    if (isFocused.value) {
      css.color = "#2196F3"; // Active color
    }
    // Apply floatingLabelStyle if available
    if (props.decoration?.floatingLabelStyle) {
      Object.assign(css, textStyleToCSS(props.decoration.floatingLabelStyle));
    }
  }

  return css;
});

const helperStyle = computed<CSSProperties>(() => {
  const css: CSSProperties = {
    flex: 1, // Allow text to take available space for alignment
    fontSize: "12px",
    color: "#666",
    ...textStyleToCSS(props.decoration?.helperStyle),
  };
  if (props.decoration?.helperTextAlign) {
    css.textAlign = props.decoration.helperTextAlign;
  }
  if (props.decoration?.helperMaxLines) {
    css.display = "-webkit-box";
    css.WebkitLineClamp = props.decoration.helperMaxLines.toString();
    css.WebkitBoxOrient = "vertical";
    css.overflow = "hidden";
  }
  if (props.decoration?.helperConstraints) {
    Object.assign(css, boxConstraintsToStyle(props.decoration.helperConstraints));
  }
  return css;
});

const errorStyle = computed<CSSProperties>(() => {
  const css: CSSProperties = {
    flex: 1, // Allow text to take available space for alignment
    fontSize: "12px",
    color: "#f44336",
    ...textStyleToCSS(props.decoration?.errorStyle),
  };
  if (props.decoration?.errorTextAlign) {
    css.textAlign = props.decoration.errorTextAlign;
  }
  if (props.decoration?.errorMaxLines) {
    css.display = "-webkit-box";
    css.WebkitLineClamp = props.decoration.errorMaxLines.toString();
    css.WebkitBoxOrient = "vertical";
    css.overflow = "hidden";
  }
  if (props.decoration?.errorConstraints) {
    Object.assign(css, boxConstraintsToStyle(props.decoration.errorConstraints));
  }
  return css;
});

const counterStyle = computed<CSSProperties>(() => {
  return {
    fontSize: "12px",
    color: "#666",
    marginLeft: "auto",
    ...textStyleToCSS(props.decoration?.counterStyle),
  };
});

const hintColor = computed(() => {
  if (props.decoration?.hintStyle?.color) {
    return resolveColor(props.decoration.hintStyle.color);
  }
  return "#999"; // Default hint color
});

const hintFontStyle = computed(() => {
  // We can pass font size, weight, etc. via a serialized string or individual vars
  // For simplicity, we just use color for placeholder for now, as full style injection is complex via v-bind in scoped styles
  // But let's try to support font size at least if provided
  return props.decoration?.hintStyle?.fontSize
    ? `${props.decoration.hintStyle.fontSize}px`
    : "inherit";
});

const shouldShowCounter = computed(() => {
  return (props.maxLength && props.maxLength > 0) || props.decoration?.counterText;
});

const shouldShowFooter = computed(() => {
  return (
    props.decoration?.errorText ||
    props.decoration?.helperText ||
    shouldShowCounter.value ||
    props.decoration?.alwaysShowError
  );
});

// Events
const emitValue = (value: string | number) => {
  if (props.modelModifiers?.trim && typeof value === "string") {
    value = value.trim();
  }
  if (props.modelModifiers?.number) {
    const n = parseFloat(value as string);
    if (!isNaN(n)) {
      value = n;
    }
  }
  emit("update:modelValue", value);
};

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  nextTick(_autoGrow);

  if (!props.modelModifiers?.lazy) {
    emitValue(target.value);
  }
};

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (props.modelModifiers?.lazy) {
    emitValue(target.value);
  }
};

const handleFocus = (e: FocusEvent) => {
  isFocused.value = true;
  emit("focus", e);
};

const handleBlur = (e: FocusEvent) => {
  isFocused.value = false;
  emit("blur", e);
};
</script>
