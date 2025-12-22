<template>
  <div class="demo-box">
    <Column :gap="20" alignment="center">
      <AnimatedOpacity :opacity="opacity" :duration="500">
        <Container :width="100" :height="100" color="blue" alignment="center">
          <Text data="Fade" :style="TextStyle({ color: 'white' })" />
        </Container>
      </AnimatedOpacity>

      <GestureDetector @tap="toggleOpacity">
        <Container
          color="#eee"
          :padding="EdgeInsets.all(10)"
          :border="Border.all({ width: 1, color: '#ccc' })"
          :borderRadius="4"
        >
          <Text data="Toggle Opacity" />
        </Container>
      </GestureDetector>
    </Column>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  AnimatedOpacity,
  Container,
  Column,
  Text,
  GestureDetector,
  TextStyle,
  EdgeInsets,
  Border,
} from "fluekit";

const opacity = ref(1);

const toggleOpacity = () => {
  opacity.value = opacity.value === 1 ? 0.2 : 1;
};
</script>
