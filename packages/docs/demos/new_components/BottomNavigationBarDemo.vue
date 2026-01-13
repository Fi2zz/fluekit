<template>
  <div class="demo-container">
    <div style="margin-bottom: 20px; text-align: center">
      <Button @click="toggleVariant">
        <Text>Switch to {{ variant === "ios" ? "Material" : "iOS" }} Style</Text>
      </Button>
    </div>

    <Container :height="300" color="#f0f0f0" alignment="bottomCenter">
      <BottomNavigationBar :items="items" v-model:currentIndex="currentIndex" :variant="variant" />
    </Container>

    <div style="margin-top: 20px; text-align: center">
      <Text>Selected Index: {{ currentIndex }}</Text>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { BottomNavigationBar, Container, Button, Text } from "fluekit";

const currentIndex = ref(0);
const variant = ref<"material" | "ios">("material");

const toggleVariant = () => {
  variant.value = variant.value === "material" ? "ios" : "material";
};

// Simple icon components for demo
const IconHome = { template: "<span>🏠</span>" };
const IconBusiness = { template: "<span>💼</span>" };
const IconSchool = { template: "<span>🎓</span>" };

const items = [
  { icon: IconHome, label: "Home" },
  { icon: IconBusiness, label: "Business" },
  { icon: IconSchool, label: "School" },
];
</script>
