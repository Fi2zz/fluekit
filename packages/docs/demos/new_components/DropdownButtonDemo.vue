<template>
  <Container :padding="EdgeInsets.all(20)">
    <Column :crossAxisAlignment="'start'" :mainAxisSize="'min'">
      <Text :style="headerStyle">DropdownButton Variants</Text>

      <SizedBox :height="20" />

      <Row :mainAxisAlignment="'spaceEvenly'" :crossAxisAlignment="'start'">
        <!-- iOS Variant -->
        <Column :mainAxisSize="'min'" :crossAxisAlignment="'center'">
          <Text :style="labelStyle">iOS Style (Default)</Text>
          <SizedBox :height="10" />
          <DropdownButton
            v-model="selectedIos"
            :items="items"
            placeholder="Select Item"
            variant="ios"
            color="white"
          />
          <SizedBox :height="10" />
          <Text>Selected: {{ selectedIos }}</Text>
        </Column>
        <!-- Material Variant -->
        <Column :mainAxisSize="'min'" :crossAxisAlignment="'center'">
          <Text :style="labelStyle">Material </Text>
          <SizedBox :height="10" />
          <DropdownButton
            v-model="selectedMaterial"
            :items="items"
            placeholder="Choose an option"
            variant="material"
          />
          <SizedBox :height="10" />
          <Text>Selected: {{ selectedMaterial }}</Text>
        </Column>
      </Row>

      <SizedBox :height="40" />

      <Text :style="headerStyle">Expanded & Custom</Text>
      <SizedBox :height="20" />

      <Row :mainAxisAlignment="'start'" :gap="40">
        <Container
          :width="300"
          :decoration="
            BoxDecoration({
              border: Border.all({ width: 1, color: Colors.grey300 }),
              borderRadius: BorderRadius.circular(8),
            })
          "
          :padding="EdgeInsets.all(10)"
        >
          <DropdownButton
            v-model="selectedCustom"
            :items="complexItems"
            placeholder="Select User"
            expanded
            :color="Colors.grey50"
          />
        </Container>

        <!-- Multi-select -->
        <Container
          :width="300"
          :decoration="
            BoxDecoration({
              border: Border.all({ width: 1, color: Colors.grey300 }),
              borderRadius: BorderRadius.circular(8),
            })
          "
          :padding="EdgeInsets.all(10)"
        >
          <DropdownButton
            v-model="selectedMulti"
            :items="items"
            placeholder="Select Multiple Items"
            expanded
            multiple
            :color="Colors.grey50"
          />
        </Container>
      </Row>
      <SizedBox :height="10" />
      <Text>Selected Value: {{ selectedCustom }}</Text>
      <Text>Selected Multi: {{ selectedMulti }}</Text>

      <SizedBox :height="40" />

      <Text :style="headerStyle">Smart Positioning</Text>
      <SizedBox :height="5" />
      <Text :style="subHeaderStyle"> (Resize window or scroll to test auto-flip) </Text>
      <SizedBox :height="20" />

      <Row mainAxisAlignment="spaceBetween" :gap="20">
        <DropdownButton
          v-model="posLeft"
          :items="longItems"
          placeholder="Left Align"
          variant="ios"
        />
        <DropdownButton
          v-model="posCenter"
          :items="longItems"
          placeholder="Center Align"
          variant="ios"
        />
        <DropdownButton
          v-model="posRight"
          :items="longItems"
          placeholder="Right Align"
          variant="ios"
        />
      </Row>
      <SizedBox :height="100" />
      <!-- Extra space for bottom positioning test -->
    </Column>
  </Container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Container,
  Column,
  Row,
  Text,
  SizedBox,
  DropdownButton,
  EdgeInsets,
  Colors,
  TextStyle,
  FontWeight,
  FontStyle,
  BoxDecoration,
  BorderRadius,
  Border,
} from "fluekit";

const items = ["Option 1", "Option 2", "Option 3", "Option 4"];
const longItems = Array.from({ length: 8 }, (_, i) => `Option ${i + 1} (Long List)`);

const complexItems = [
  { label: "Alice Smith", value: 1 },
  { label: "Bob Johnson", value: 2 },
  { label: "Charlie Brown", value: 3 },
];

const selectedMaterial = ref(items[0]);
const selectedIos = ref(null);
const selectedCustom = ref(null);
const selectedMulti = ref([]);

const posLeft = ref(null);
const posCenter = ref(null);
const posRight = ref(null);

const headerStyle = computed(() =>
  TextStyle({
    fontSize: 20,
    fontWeight: FontWeight.bold,
    color: Colors.black87,
  }),
);

const subHeaderStyle = computed(() =>
  TextStyle({
    fontSize: 14,
    color: Colors.grey600,
    fontStyle: FontStyle.italic,
  }),
);

const labelStyle = computed(() =>
  TextStyle({
    fontSize: 16,
    fontWeight: FontWeight.w600,
    color: Colors.grey700,
  }),
);
</script>
