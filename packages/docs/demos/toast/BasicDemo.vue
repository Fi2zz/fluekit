<template>
  <div class="demo-section">
    <h3>Basic Usage</h3>
    <Button @pressed="showBasicToast">Show Toast</Button>

    <h3>Positions</h3>
    <div class="grid-buttons">
      <Button @pressed="showToast('top-left')">Top Left</Button>
      <Button @pressed="showToast('top-center')">Top Center</Button>
      <Button @pressed="showToast('top-right')">Top Right</Button>

      <Button @pressed="showToast('center-left')">Center Left</Button>
      <Button @pressed="showToast('center')">Center</Button>
      <Button @pressed="showToast('center-right')">Center Right</Button>

      <Button @pressed="showToast('bottom-left')">Bottom Left</Button>
      <Button @pressed="showToast('bottom-center')">Bottom Center</Button>
      <Button @pressed="showToast('bottom-right')">Bottom Right</Button>
    </div>

    <h3>With Icon</h3>
    <Button @pressed="showIconToast">Success Toast</Button>

    <h3>Custom Style</h3>
    <Button @pressed="showCustomToast">Custom Colors</Button>
  </div>
</template>

<script setup lang="ts">
import { Toast, Button, Icons } from "fluekit";

const showBasicToast = () => {
  Toast.show("Hello from FlueKit!");
};

const showToast = (position: any) => {
  Toast.show(`Toast at ${position}`, { position });
};

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

<style scoped>
.demo-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.grid-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  max-width: 400px;
}

h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
}
</style>
