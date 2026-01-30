<template>
  <FlueConfigProvider :toast-count="3" :transform="false">
    <Column :gap="20" class="demo-section">
      <h3>Basic Usage</h3>
      <Button @pressed="showBasicToast">Show Toast</Button>
      <h3>Types</h3>
      <GridView :cross-axis-count="5" class="grid-buttons">
        <Button @pressed="Toast.success('Operation Successful')">Success</Button>
        <Button @pressed="Toast.error('An error occurred')">Error</Button>
        <Button @pressed="Toast.info('New updates available')">Info</Button>
        <Button @pressed="Toast.warning('Check your connection')">Warning</Button>
        <Button @pressed="Toast.loading('Loading...', { duration: 0 })">Loading</Button>
        <Button @pressed="Toast.hide(true)">Clear All</Button>
      </GridView>
      <h3>Positions</h3>
      <GridView :cross-axis-count="5" :cross-axis-spacing="10" :main-axis-spacing="20">
        <Button @pressed="showToast('top-left')">Top Left</Button>
        <Button @pressed="showToast('top-center')">Top Center</Button>
        <Button @pressed="showToast('top-right')">Top Right</Button>
        <Button @pressed="showToast('center-left')">Center Left</Button>
        <Button @pressed="showToast('center')">Center</Button>
        <Button @pressed="showToast('center-right')">Center Right</Button>
        <Button @pressed="showToast('bottom-left')">Bottom Left</Button>
        <Button @pressed="showToast('bottom-center')">Bottom Center</Button>
        <Button @pressed="showToast('bottom-right')">Bottom Right</Button>
      </GridView>
      <h3>With Icon</h3>
      <Button @pressed="showIconToast">Success Toast</Button>
      <h3>Custom Style</h3>
      <Button @pressed="showCustomToast">Custom Colors</Button>
    </Column>
  </FlueConfigProvider>
</template>

<script setup lang="ts">
import { Toast, Button, Icons, GridView, Column, FlueConfigProvider } from "fluekit";
const showBasicToast = () => Toast.show("Hello from FlueKit!");
const showToast = (position: any) => Toast.show(`Toast at ${position}`, { position });
const showIconToast = () => {
  Toast.show("Operation Successful", {
    icon: Icons.checkCircle,
    position: "top-center",
    backgroundColor: "#4CAF50",
  });
};
const showCustomToast = () => {
  Toast.show("Warning: Low Battery", {
    backgroundColor: "#FFC107",
    textColor: "#000000",
    icon: Icons.info,
    position: "bottom-center",
  });
};
</script>
