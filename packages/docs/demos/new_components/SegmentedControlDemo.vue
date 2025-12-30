<template>
  <Column :gap="20">
    <Text>Basic Segmented Control</Text>
    <SegmentedControl v-model="currentValue" :items="items" />
    <Text>Selected: {{ currentValue }}</Text>

    <Text>Custom Color</Text>
    <SegmentedControl
      v-model="currentValue2"
      :items="items2"
      selected-color="#4CAF50"
      border-color="#4CAF50"
    />
  </Column>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Column, Text, SegmentedControl } from "fluekit";

const currentValue = ref("Map");
const currentValue2 = ref("Daily");

const items = [
  { value: "Map", label: "Map" },
  { value: "Transit", label: "Transit" },
  { value: "Satellite", label: "Satellite" },
];

const items2 = [
  { value: "Daily", label: "Daily" },
  { value: "Weekly", label: "Weekly" },
  { value: "Monthly", label: "Monthly" },
];
</script>
