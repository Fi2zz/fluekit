<template>
  <div
    class="demo-container"
    style="height: 300px; display: flex; align-items: center; justify-content: center"
  >
    <CupertinoContextMenu :actions="actions">
      <Container
        :width="100"
        :height="100"
        color="#007AFF"
        :border-radius="BorderRadius.circular(12)"
        alignment="center"
      >
        <Text :style="TextStyle({ color: 'white', fontWeight: FontWeight.w600 })"
          >Long Press Me</Text
        >
      </Container>
    </CupertinoContextMenu>
  </div>
</template>

<script setup lang="ts">
import {
  CupertinoContextMenu,
  Container,
  Text,
  BorderRadius,
  TextStyle,
  FontWeight,
} from "fluekit";

const actions = [
  {
    child: "Action One",
    onPressed: () => alert("Action One Pressed"),
    icon: { template: "<span>★</span>" },
  },
  {
    child: "Action Two",
    onPressed: () => alert("Action Two Pressed"),
  },
  {
    child: "Delete",
    isDestructiveAction: true,
    onPressed: () => alert("Delete Pressed"),
    icon: { template: "<span>🗑️</span>" },
  },
];
</script>
