<template>
  <div class="demo-section">
    <h3>Basic</h3>
    <Row :gap="16">
      <TextButtonWithIcon :icon="Icons.add" label="Create" @pressed="onPressed" />

      <TextButtonWithIcon
        :icon="Icons.trash"
        label="Delete"
        icon-color="red"
        :style="{ foregroundColor: 'red' }"
        @pressed="onPressed"
      />
    </Row>

    <h3>Icon Position</h3>
    <Row :gap="16">
      <TextButtonWithIcon
        :icon="Icons.back"
        label="Back"
        icon-position="left"
        @pressed="onPressed"
      />

      <TextButtonWithIcon
        :icon="Icons.forward"
        label="Next"
        icon-position="right"
        @pressed="onPressed"
      />
    </Row>

    <h3>Disabled</h3>
    <Row :gap="16">
      <TextButtonWithIcon :icon="Icons.settings" label="Settings" disabled />
    </Row>
  </div>
</template>

<script setup lang="ts">
import { TextButtonWithIcon, Row, Icons } from "fluekit";

const onPressed = () => {
  console.log("Button pressed");
};
</script>

<style scoped>
.demo-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
}
</style>
