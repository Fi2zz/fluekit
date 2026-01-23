<template>
  <div class="demo-section">
    <h3>Fade In</h3>
    <AnimationWidget :animation="fadeIn">
      <Container :width="100" :height="100" color="teal" alignment="center">
        <Text style="color: white">Fade In</Text>
      </Container>
    </AnimationWidget>

    <h3>Slide Up</h3>
    <AnimationWidget :animation="slideUp">
      <Container :width="100" :height="100" color="orange" alignment="center">
        <Text style="color: white">Slide Up</Text>
      </Container>
    </AnimationWidget>

    <h3>Pulse</h3>
    <AnimationWidget :animation="pulse">
      <Container :width="100" :height="100" color="purple" alignment="center">
        <Text style="color: white">Pulse</Text>
      </Container>
    </AnimationWidget>

    <h3>Shake</h3>
    <AnimationWidget :animation="shake">
      <Container :width="100" :height="100" color="red" alignment="center">
        <Text style="color: white">Shake</Text>
      </Container>
    </AnimationWidget>
  </div>
</template>

<script setup lang="ts">
import { Container, Text, defineKeyframes, Animator, AnimationWidget } from "fluekit";

// Define Keyframes
defineKeyframes("fadeIn", {
  from: { opacity: 0 },
  to: { opacity: 1 },
});

defineKeyframes("slideUp", {
  from: { transform: "translateY(20px)", opacity: 0 },
  to: { transform: "translateY(0)", opacity: 1 },
});

defineKeyframes("pulse", {
  "0%": { transform: "scale(1)" },
  "50%": { transform: "scale(1.1)" },
  "100%": { transform: "scale(1)" },
});

defineKeyframes("shake", {
  "0%, 100%": { transform: "translateX(0)" },
  "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
  "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
});

// Animations
const fadeIn = Animator({
  name: "fadeIn",
  duration: 1500,
  iterationCount: "infinite",
  direction: "alternate",
});

const slideUp = Animator({
  name: "slideUp",
  duration: 1000,
  iterationCount: "infinite",
  direction: "alternate",
});

const pulse = Animator({
  name: "pulse",
  duration: 2000,
  iterationCount: "infinite",
});

const shake = Animator({
  name: "shake",
  duration: 1000,
  iterationCount: "infinite",
});
</script>

<style scoped>
.demo-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
}
h3 {
  grid-column: span 2;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}
h3:not(:first-child) {
  margin-top: 20px;
}
</style>
