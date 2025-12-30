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

    <Text>Custom Decoration & Slot</Text>
    <SegmentedControl
      v-model="currentValue3"
      :items="items3"
      :decoration="customDecoration"
      selected-color="#FF5722"
      border-color="#FF5722"
    >
      <template #label="{ item, selected }">
        <Row :gap="4" cross-axis-alignment="center" main-axis-alignment="center">
          <Text :style="{ fontSize: 16 }">{{ item.icon }}</Text>
          <Text
            :style="{
              color: selected ? '#FFFFFF' : '#FF5722',
              fontWeight: selected ? 'bold' : 'normal',
            }"
          >
            {{ item.label }}
          </Text>
        </Row>
      </template>
    </SegmentedControl>
  </Column>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Column, Text, SegmentedControl, BoxDecoration, BorderRadius, Border, Row } from "fluekit";

const currentValue = ref("Map");
const currentValue2 = ref("Daily");
const currentValue3 = ref("Home");

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

const items3 = [
  { value: "Home", label: "Home", icon: "🏠" },
  { value: "Work", label: "Work", icon: "🏢" },
  { value: "School", label: "School", icon: "🎓" },
];

const customDecoration = BoxDecoration({
  color: "#FFF3E0",
  borderRadius: BorderRadius.circular(20),
  border: Border.all({ color: "#FF5722", width: 2 }),
});
</script>
