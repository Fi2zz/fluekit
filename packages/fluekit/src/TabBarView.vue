<template>
  <div class="fluekit-tab-bar-view">
    <div
      class="fluekit-tab-bar-view-content"
      :style="{ transform: `translateX(-${modelValue * 100}%)` }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false });
defineProps<{ modelValue: number }>();
</script>

<style scoped>
.fluekit-tab-bar-view {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex: 1;
}

.fluekit-tab-bar-view-content {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Ensure children take full width */
:deep(> *) {
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
}
</style>
