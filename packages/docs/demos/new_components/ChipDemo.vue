<script setup lang="ts">
import { ActionChip, Chip, ChoiceChip, Colors, Column, Row, SizedBox, Text } from "fluekit";
import { ref } from "vue";

const selectedChip = ref("small");

// Simple Icon component using h function

const handleDelete = () => {
  console.log("Deleted");
};
</script>

<template>
  <Column crossAxisAlignment="start">
    <Text>Basic Chips</Text>
    <Row :gap="8">
      <Chip label="Basic Chip" />
      <Chip label="With Delete" deletable @delete="handleDelete" />
      <Chip label="With Avatar">
        <template #avatar>
          <div
            style="
              background: #2196f3;
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <span style="color: white; font-size: 10px">A</span>
          </div>
        </template>
      </Chip>
    </Row>

    <SizedBox :height="20" />

    <Text>Action Chips</Text>
    <Row :gap="8">
      <ActionChip label="Action 1" @pressed="() => console.log('Action 1')" />
      <ActionChip
        label="Action 2"
        :backgroundColor="Colors.blue"
        labelColor="white"
        @pressed="() => console.log('Action 2')"
      />
    </Row>

    <SizedBox :height="20" />

    <Text>Choice Chips (Selected: {{ selectedChip }})</Text>
    <Row :gap="8">
      <ChoiceChip
        label="Small"
        :selected="selectedChip === 'small'"
        @selected="() => (selectedChip = 'small')"
      />
      <ChoiceChip
        label="Medium"
        :selected="selectedChip === 'medium'"
        @selected="() => (selectedChip = 'medium')"
      />
      <ChoiceChip
        label="Large"
        :selected="selectedChip === 'large'"
        @selected="() => (selectedChip = 'large')"
      />
    </Row>
  </Column>
</template>
