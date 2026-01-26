<template>
  <div
    class="fluekit-text-field-wrapper"
    :class="{
      'is-focused': isFocused,
      'is-disabled': !enabled,
      'has-error': !!decoration?.errorText,
      'is-collapsed': decoration?.isCollapsed,
      'is-dense': decoration?.isDense,
    }"
  >
    <!-- Icon (Outside Left) -->
    <div v-if="$slots.icon || decoration?.icon" class="fluekit-input-icon">
      <slot name="icon">
        <Icon
          :icon="decoration?.icon"
          :size="decoration?.iconSize"
          :color="decoration?.iconColor"
        />
      </slot>
    </div>

    <div class="fluekit-text-field-content">
      <!-- Input Container -->
      <div class="fluekit-input-container" :style="containerStyle">
        <!-- Label -->
        <label
          v-if="decoration?.labelText && shouldShowLabel"
          class="fluekit-input-label"
          :class="{ 'is-floating': isFloating }"
          :style="labelStyle"
        >
          {{ decoration.labelText }}
        </label>
        <!-- Prefix Icon (Inside Left) -->
        <div v-if="$slots.prefixIcon || decoration?.prefixIcon" class="fluekit-input-prefix-icon">
          <slot name="prefixIcon">
            <Icon
              :icon="decoration?.prefixIcon"
              :size="decoration?.prefixIconSize"
              :color="decoration?.prefixIconColor"
            />
          </slot>
        </div>

        <!-- Prefix (Text/Widget) -->
        <div
          v-if="$slots.prefix || decoration?.prefixText"
          class="fluekit-input-prefix"
          ref="prefixRef"
        >
          <slot name="prefix">{{ decoration?.prefixText }}</slot>
        </div>

        <!-- Input Element -->
        <component
          :is="isMultiline ? 'textarea' : 'input'"
          ref="inputRef"
          class="fluekit-input-element"
          :value="modelValue"
          :disabled="!enabled"
          :readonly="readOnly"
          :type="inputType"
          :placeholder="placeholderText"
          :rows="minLines || 1"
          :style="inputStyle"
          :maxlength="maxLength"
          :autocapitalize="textCapitalization"
          :enterkeyhint="textInputAction"
          :autocorrect="autocorrect ? 'on' : 'off'"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />

        <!-- Suffix (Text/Widget) -->
        <div v-if="$slots.suffix || decoration?.suffixText" class="fluekit-input-suffix">
          <slot name="suffix">{{ decoration?.suffixText }}</slot>
        </div>

        <!-- Suffix Icon (Inside Right) -->
        <div v-if="$slots.suffixIcon || decoration?.suffixIcon" class="fluekit-input-suffix-icon">
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
      <div v-if="shouldShowFooter" class="fluekit-input-footer">
        <div
          v-if="decoration?.errorText || decoration?.alwaysShowError"
          class="fluekit-input-helper is-error"
          :style="errorStyle"
          :class="{ 'is-invisible': !decoration?.errorText }"
        >
          {{ decoration?.errorText || "&nbsp;" }}
        </div>
        <div v-else-if="decoration?.helperText" class="fluekit-input-helper" :style="helperStyle">
          {{ decoration.helperText }}
        </div>

        <!-- Spacer if helper exists but we want counter on the right -->
        <div v-else class="fluekit-input-helper-spacer"></div>

        <!-- Character Counter -->
        <div v-if="shouldShowCounter" class="fluekit-input-counter" :style="counterStyle">
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

const inputStyle = computed<CSSProperties>(() => {
  const css: CSSProperties = {
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

const labelStyle = computed<CSSProperties>(() => {
  const css: CSSProperties = {
    position: "absolute",
    // Adjust left based on prefixIcon presence
    // If prefixIcon exists, label should start after it?
    // In Material, label starts at start of content area (including prefixIcon?) No, normally it overlays content.
    // If isOutline, label is usually inside the border padding.
    // If prefixIcon is present, label should probably be offset?
    // This is complex in CSS. For now, we assume standard behavior where label is left-aligned.
    // Ideally we'd measure prefixIcon width too.
    // If prefixIcon is present, we need to add its width (usually 48px if using standard icon size + padding)
    // Or we can rely on `prefixWidth` if we measure it?
    // But prefixWidth only measures .fluekit-input-prefix (text).
    // Let's assume standard behavior: if prefixIcon is present, label is offset.
    // However, in Flutter, label floats *above* the prefixIcon usually?
    // Actually, in Flutter, floating label is aligned with the *input content*.
    // So if prefixIcon exists, the label (when inline) is after it.
    // When floating, it stays aligned with the start of the input.
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
  return textStyleToCSS(props.decoration?.counterStyle);
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

<style scoped>
.fluekit-text-field-wrapper {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: relative;
  margin-top: 16px; /* Space for floating label */
  font-family: inherit;
  width: 100%;
}

.fluekit-input-icon {
  margin-right: 16px;
  margin-top: 12px; /* Align with input roughly */
  display: flex;
  align-items: center;
  color: v-bind("resolveColor(decoration?.iconColor) || 'inherit'");
}

.fluekit-text-field-content {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
}

.fluekit-input-container {
  /* Defined in dynamic style */
  width: 100%;
  box-sizing: border-box;
}

.fluekit-input-prefix-icon,
.fluekit-input-suffix-icon {
  display: flex;
  align-items: center;
  padding: 0 8px;
  color: #666;
}

.fluekit-input-prefix-icon {
  color: v-bind("resolveColor(decoration?.prefixIconColor) || '#666'");
  padding-left: 0;
}

.fluekit-input-suffix-icon {
  color: v-bind("resolveColor(decoration?.suffixIconColor) || '#666'");
  padding-right: 0;
}

.fluekit-input-element {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: 16px;
  color: inherit;
  resize: none; /* Handle via auto-grow or maxLines */
}

.fluekit-input-element::placeholder {
  color: v-bind("hintColor");
  font-size: v-bind("hintFontStyle");
  opacity: 1; /* Firefox default is lower */
}

.fluekit-input-label {
  /* Defined in dynamic style */
  z-index: 1;
}

.fluekit-input-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
}

.fluekit-input-helper {
  font-size: 12px;
  color: #666;
}

.fluekit-input-helper-spacer {
  flex: 1;
}

.fluekit-input-counter {
  font-size: 12px;
  color: #666;
  margin-left: auto; /* Push to right */
}

.fluekit-input-helper.is-error {
  color: #f44336;
}

.is-invisible {
  visibility: hidden;
}
</style>
