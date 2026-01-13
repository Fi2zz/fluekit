<template>
  <div class="fluekit-context-menu-anchor" ref="anchorRef">
    <GestureDetector @long-press="handleLongPress">
      <slot />
    </GestureDetector>

    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="isVisible"
          class="fluekit-context-menu-overlay"
          @click.stop="close"
          @touchmove.prevent
        >
          <div class="fluekit-context-menu-backdrop"></div>

          <div class="fluekit-context-menu-content" :style="menuStyle" @click.stop>
            <!-- Actions List -->
            <div class="fluekit-action-group">
              <div
                v-for="(action, index) in actions"
                :key="index"
                class="fluekit-context-menu-action"
                :class="{
                  'is-destructive': action.isDestructiveAction,
                  'is-default': action.isDefaultAction,
                }"
                @click="handleAction(action)"
              >
                <component v-if="action.icon" :is="action.icon" class="action-icon" />
                <span class="action-text">{{ action.child }}</span>
              </div>
            </div>

            <!-- Cancel Button -->
            <div class="fluekit-action-group cancel-group">
              <div class="fluekit-context-menu-action cancel-action" @click="close">
                <span class="action-text">Cancel</span>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
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
const anchorRef = ref<HTMLElement | null>(null);

const handleLongPress = () => {
  // In a real implementation, we would calculate position to animate from
  // For now, we center it like an action sheet or center modal
  isVisible.value = true;
};

const close = () => {
  isVisible.value = false;
};

const handleAction = (action: ContextMenuAction) => {
  if (action.onPressed) {
    action.onPressed();
  }
  close();
};

const menuStyle = computed(() => {
  return {
    // Basic styling for centered menu
  };
});
</script>

<style scoped>
.fluekit-context-menu-anchor {
  display: inline-block;
}

.fluekit-context-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.fluekit-context-menu-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.fluekit-context-menu-content {
  position: relative;
  width: 250px;
  z-index: 10001;
  animation: scale-in 0.2s ease-out;
}

.fluekit-action-group {
  background: rgba(249, 249, 249, 0.78);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 16px;
}

.fluekit-context-menu-action {
  padding: 16px;
  text-align: center;
  background: transparent;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.fluekit-context-menu-action:last-child {
  border-bottom: none;
}

.fluekit-context-menu-action:active {
  background: rgba(0, 0, 0, 0.1);
}

.action-text {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 17px;
  color: #007aff;
}

.is-destructive .action-text {
  color: #ff3b30;
}

.is-default .action-text {
  font-weight: 600;
}

.cancel-group {
  margin-top: 8px;
}

.cancel-action .action-text {
  font-weight: 600;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes scale-in {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
