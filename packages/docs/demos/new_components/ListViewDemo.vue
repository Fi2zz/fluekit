<script setup lang="ts">
import {
  Border,
  BoxDecoration,
  Colors,
  Container,
  Divider,
  EdgeInsets,
  ListTile,
  ListView,
  Text,
} from "fluekit";
import { ref } from "vue";

const items = ref(Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`));

const handleRefresh = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const newItems = Array.from({ length: 3 }, (_, i) => `New Item ${Date.now()}-${i}`);
  items.value = [...newItems, ...items.value];
};
</script>

<template>
  <Container
    height="400"
    :decoration="BoxDecoration({ border: Border.all({ width: 1, color: '#eee' }) })"
  >
    <ListView
      :itemCount="items.length"
      :separator="true"
      :onRefresh="handleRefresh"
      :padding="EdgeInsets.all(10)"
    >
      <template #item="{ index }">
        <ListTile :title="items[index]" subtitle="Subtitle here">
          <template #leading>
            <Container width="40" height="40" alignment="center" :color="Colors.blue100">
              <Text>{{ index + 1 }}</Text>
            </Container>
          </template>
        </ListTile>
      </template>
      <template #separator>
        <Divider />
      </template>
    </ListView>
  </Container>
</template>
