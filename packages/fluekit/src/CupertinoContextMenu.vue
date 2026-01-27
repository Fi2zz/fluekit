<template>
  <div :style="{ display: 'inline-block' }">
    <GestureDetector @long-press="handleLongPress">
      <slot />
    </GestureDetector>

    <Teleport to="body">
      <Transition :css="false" @enter="onEnter" @leave="onLeave">
        <div v-if="isVisible" :style="overlayStyle" @click.stop="close" @touchmove.prevent>
          <div :style="backdropStyle"></div>
          <div :style="contentStyle" @click.stop>
            <!-- Actions List -->
            <div :style="actionGroupStyle">
              <div
                v-for="(action, index) in actions"
                :key="index"
                :style="getActionStyle(index, action)"
                @click="handleAction(action)"
                @touchstart="activeActionIndex = index"
                @touchend="activeActionIndex = -1"
                @mousedown="activeActionIndex = index"
                @mouseup="activeActionIndex = -1"
                @mouseleave="activeActionIndex = -1"
              >
                <component v-if="action.icon" :is="action.icon" :style="{ marginRight: '8px' }" />
                <span :style="getActionTextStyle(action)">{{ action.child }}</span>
              </div>
            </div>

            <!-- Cancel Button -->
            <div :style="cancelGroupStyle">
              <div
                :style="getCancelActionStyle()"
                @click="close"
                @touchstart="activeCancel = true"
                @touchend="activeCancel = false"
                @mousedown="activeCancel = true"
                @mouseup="activeCancel = false"
                @mouseleave="activeCancel = false"
              >
                <span :style="getCancelTextStyle()">Cancel</span>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type CSSProperties } from "vue";
import GestureDetector from "./GestureDetector.vue";

export interface ContextMenuAction {
  child: string; // Label text
  isDefaultAction?: boolean;
  isDestructiveAction?: boolean;
  onPressed?: () => void;
  icon?: any; // Optional icon
}

interface Props {
  actions: ContextMenuAction[];
}
const props = defineProps<Props>();

const isVisible = ref(false);
const activeActionIndex = ref(-1);
const activeCancel = ref(false);

const handleLongPress = () => {
  isVisible.value = true;
};

const close = () => {
  isVisible.value = false;
};

const handleAction = (action: ContextMenuAction) => {
  if (action.onPressed) action.onPressed();
  close();
};
// Styles
const overlayStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 9999,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const backdropStyle: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.4)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
};
const contentStyle: CSSProperties = {
  position: "relative",
  width: "250px",
  zIndex: 10001,
};

const actionGroupStyle: CSSProperties = {
  background: "rgba(249, 249, 249, 0.78)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderRadius: "14px",
  overflow: "hidden",
  marginBottom: "16px",
};

const cancelGroupStyle: CSSProperties = {
  ...actionGroupStyle,
  marginBottom: 0,
  marginTop: "8px",
};

const getActionStyle = (index: number, action: ContextMenuAction): CSSProperties => {
  const isLast = index === props.actions.length - 1;
  const isActive = activeActionIndex.value === index;
  return {
    padding: "16px",
    textAlign: "center",
    background: isActive ? "rgba(0, 0, 0, 0.1)" : "transparent",
    borderBottom: isLast ? "none" : "0.5px solid rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  };
};

const getCancelActionStyle = (): CSSProperties => {
  const isActive = activeCancel.value;
  return {
    padding: "16px",
    textAlign: "center",
    background: isActive ? "rgba(0, 0, 0, 0.1)" : "transparent",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
};

const getActionTextStyle = (action: ContextMenuAction): CSSProperties => {
  return {
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: "17px",
    color: action.isDestructiveAction ? "#ff3b30" : "#007aff",
    fontWeight: action.isDefaultAction ? 600 : 400,
  };
};

const getCancelTextStyle = (): CSSProperties => {
  return {
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: "17px",
    color: "#007aff",
    fontWeight: 600,
  };
};

// Animations
const onEnter = (el: Element, done: () => void) => {
  const element = el as HTMLElement;
  const content = element.querySelector("div[style*='position: relative']") as HTMLElement; // Heuristic to find content

  const overlayAnim = element.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 });

  const contentAnim = content?.animate(
    [
      { transform: "scale(0.8)", opacity: 0 },
      { transform: "scale(1)", opacity: 1 },
    ],
    { duration: 200, easing: "ease-out" },
  );

  Promise.all([overlayAnim.finished, contentAnim?.finished]).then(() => done());
};

const onLeave = (el: Element, done: () => void) => {
  const element = el as HTMLElement;
  const content = element.querySelector("div[style*='position: relative']") as HTMLElement;

  const overlayAnim = element.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200 });

  const contentAnim = content?.animate(
    [
      { transform: "scale(1)", opacity: 1 },
      { transform: "scale(0.8)", opacity: 0 },
    ],
    { duration: 200, easing: "ease-in" },
  );

  Promise.all([overlayAnim.finished, contentAnim?.finished]).then(() => done());
};
</script>
