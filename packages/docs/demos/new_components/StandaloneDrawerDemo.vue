<script setup lang="ts">
import {
  Colors,
  Column,
  Container,
  Drawer,
  EdgeInsets,
  ElevatedButton,
  ListTile,
  Stack,
  Text,
} from "fluekit";
import { ref } from "vue";

const isOpen = ref(false);

const toggleDrawer = () => {
  isOpen.value = !isOpen.value;
};

const closeDrawer = () => {
  isOpen.value = false;
};
</script>

<template>
  <Container height="400" :border="{ width: 1, color: '#eee' }" clipBehavior="hardEdge">
    <Stack fit="expand">
      <!-- Main Content -->
      <Column mainAxisAlignment="center" crossAxisAlignment="center">
        <Text>Standalone Drawer Example</Text>
        <ElevatedButton @pressed="toggleDrawer">
          {{ isOpen ? "Close Drawer" : "Open Drawer" }}
        </ElevatedButton>
      </Column>

      <!-- Drawer with internal Overlay -->
      <Drawer v-model:open="isOpen" :width="250" style="z-index: 20">
        <Column expanded>
          <Container
            height="150"
            :color="Colors.green"
            :padding="EdgeInsets.all(16)"
            alignment="bottomLeft"
          >
            Standalone
          </Container>
          <ListTile title="Item A" @tap="closeDrawer" />
          <ListTile title="Item B" @tap="closeDrawer" />
        </Column>
      </Drawer>
    </Stack>
  </Container>
</template>

<style scoped></style>
