<script setup lang="ts">
import { Container, ListTile, ListView } from "fluekit";
import { ref } from "vue";

const items = ref(Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`));

const handleRefresh = async () => {
  // Simulate network request
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Prepend new items
  const newItems = Array.from({ length: 5 }, (_, i) => `New Item ${Date.now()} - ${i}`);
  items.value = [...newItems, ...items.value];
};
</script>

<template>
  <Container height="400" :border="{ width: 1, color: '#eee' }">
    <ListView :itemCount="items.length" :onRefresh="handleRefresh">
      <template #item="{ index }">
        <ListTile :title="items[index]" />
      </template>
    </ListView>
  </Container>
</template>
