<script setup lang="ts">
import { ref } from "vue";
import {
  Overlay,
  ElevatedButton,
  Stack,
  Container,
  Center,
  Text,
  Colors,
  TextStyle,
  EdgeInsets,
} from "fluekit";

const isVisible = ref(false);

const toggle = () => {
  isVisible.value = !isVisible.value;
};

const close = () => {
  isVisible.value = false;
};
</script>

<template>
  <Container height="300" :border="{ width: 1, color: '#eee' }" clipBehavior="hardEdge">
    <Stack fit="expand">
      <Center>
        <ElevatedButton @pressed="toggle"> Show Overlay </ElevatedButton>
      </Center>

      <!-- The Overlay -->
      <Overlay :visible="isVisible" @tap="close">
        <Center>
          <Container :color="Colors.white" :padding="EdgeInsets.all(20)" :borderRadius="8">
            <Text :style="TextStyle({ fontSize: 16 })">Tap anywhere to close</Text>
          </Container>
        </Center>
      </Overlay>
    </Stack>
  </Container>
</template>
