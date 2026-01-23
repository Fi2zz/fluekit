<template>
  <div class="demo-section">
    <h3>CSS Keyframe Animation</h3>
    <AnimationWidget :animation="bounceAnimation">
      <Container :width="100" :height="100" color="blue" alignment="center">
        <Text style="color: white">Bounce</Text>
      </Container>
    </AnimationWidget>

    <h3>Spin Animation</h3>
    <AnimationWidget :animation="spinAnimation">
      <Container
        :width="100"
        :height="100"
        color="red"
        alignment="center"
        :margin="EdgeInsets.only({ top: 20 })"
      >
        <Text style="color: white">Spin</Text>
      </Container>
    </AnimationWidget>
  </div>
</template>

<script setup lang="ts">
import { Container, Text, defineKeyframes, Animation, AnimationWidget, EdgeInsets } from "fluekit";

// 1. Define global keyframes (idempotent)
defineKeyframes("bounce", {
  "0%, 100%": { transform: "translateY(0)" },
  "50%": { transform: "translateY(-20px)" },
});

defineKeyframes("spin", {
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
});

// 2. Use them
const bounceAnimation = Animation({
  name: "bounce",
  duration: 1000,
  iterationCount: "infinite",
});

const spinAnimation = Animation({
  name: "spin",
  duration: 2000,
  iterationCount: "infinite",
  timingFunction: "linear",
});
</script>

<style scoped>
.demo-section {
  padding: 20px;
}
h3 {
  margin-bottom: 10px;
}
</style>
