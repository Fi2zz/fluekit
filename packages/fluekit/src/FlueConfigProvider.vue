<template>
  <slot />
</template>

<script setup lang="ts">
import { provide, watchEffect } from "vue";
import { setTransform, setDefaultVW } from "./px2vw";
import { setAssetBaseURL } from "./ImageProvider";

interface Props {
  transform?: boolean;
  designWidth?: number;
  assetBaseURL?: string;
}

const props = withDefaults(defineProps<Props>(), {
  transform: true,
  designWidth: 750,
  assetBaseURL: "/",
});

watchEffect(() => {
  setTransform(props.transform);
  setDefaultVW(props.designWidth);
  setAssetBaseURL(props.assetBaseURL);
});

// Provide a key if we want to access config in children, though px2vw uses module state currently.
// For now, module state is enough as it's a global config.
provide("FlueConfig", props);
</script>
