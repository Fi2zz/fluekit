<template>
  <Column :gap="20">
    <!-- Basic Usage -->
    <Row :gap="20" cross-axis-alignment="center">
      <Checkbox v-model:value="checkVal">
        <Text>Checkbox: {{ checkVal }}</Text>
      </Checkbox>
    </Row>

    <!-- Label on Left -->
    <Row :gap="20" cross-axis-alignment="center">
      <Checkbox v-model:value="checkVal2" label-position="left" active-color="#4CAF50">
        <Text>Label on Left</Text>
      </Checkbox>
    </Row>

    <!-- Custom Check Color -->
    <Row :gap="20" cross-axis-alignment="center">
      <Checkbox v-model:value="checkVal3" check-color="black" active-color="#FFC107">
        <Text>Custom Colors</Text>
      </Checkbox>
    </Row>

    <!-- Hide Icon (Text Only) -->
    <Row :gap="20" cross-axis-alignment="center">
      <Checkbox v-model:value="checkVal4" hide-icon>
        <Text :style="checkVal4 ? { color: '#2196F3', fontWeight: FontWeight.bold } : {}">
          Text Only Checkbox
        </Text>
      </Checkbox>
    </Row>

    <!-- Checkbox Group -->
    <CheckboxGroup v-model:value="groupVal">
      <Column :gap="10">
        <Text>Selected: {{ groupVal }}</Text>
        <Row :gap="20">
          <Checkbox value="Apple">
            <Text>Apple</Text>
          </Checkbox>
          <Checkbox value="Banana">
            <Text>Banana</Text>
          </Checkbox>
          <Checkbox value="Orange">
            <Text>Orange</Text>
          </Checkbox>
        </Row>
      </Column>
    </CheckboxGroup>

    <!-- Nested Checkbox Group -->
    <CheckboxGroup v-model:value="nestedGroupVal">
      <Column :gap="10">
        <Text :style="{ fontWeight: FontWeight.bold }">Nested Layout:</Text>
        <Container color="#f5f5f5" :padding="EdgeInsets.all(10)">
          <Column :gap="10">
            <Text>Category 1</Text>
            <Row :gap="20">
              <Checkbox value="Item 1-1"><Text>Item 1-1</Text></Checkbox>
              <Checkbox value="Item 1-2"><Text>Item 1-2</Text></Checkbox>
            </Row>
            <Text>Category 2</Text>
            <Row :gap="20">
              <Checkbox value="Item 2-1"><Text>Item 2-1</Text></Checkbox>
              <Checkbox value="Item 2-2"><Text>Item 2-2</Text></Checkbox>
            </Row>
          </Column>
        </Container>
        <Text>Selected: {{ nestedGroupVal }}</Text>
      </Column>
    </CheckboxGroup>

    <!-- v-for Loop -->
    <CheckboxGroup v-model:value="loopGroupVal">
      <Column :gap="10">
        <Text :style="{ fontWeight: FontWeight.bold }">v-for Loop (Items):</Text>
        <Row :gap="20" wrap>
          <Checkbox v-for="item in items" :key="item" :value="item">
            <Text>{{ item }}</Text>
          </Checkbox>
        </Row>
        <Text>Selected: {{ loopGroupVal }}</Text>
      </Column>
    </CheckboxGroup>

    <!-- v-for Loop with CheckboxGroup -->
    <Column :gap="10">
      <Text :style="{ fontWeight: FontWeight.bold }">v-for Loop (CheckboxGroups):</Text>
      <CheckboxGroup
        v-for="(group, index) in multiGroups"
        :key="index"
        v-model:value="group.selected"
      >
        <Column :gap="5">
          <Text :style="{ fontWeight: FontWeight.bold }">{{ group.name }}</Text>
          <Row :gap="10">
            <Checkbox v-for="opt in group.options" :key="opt" :value="opt">
              <Text>{{ opt }}</Text>
            </Checkbox>
          </Row>
          <Text>Selected in {{ group.name }}: {{ group.selected }}</Text>
        </Column>
      </CheckboxGroup>
    </Column>

    <!-- Dynamic v-model -->
    <CheckboxGroup v-model:value="dynamicModel">
      <Column :gap="10">
        <Text :style="{ fontWeight: FontWeight.bold }">Dynamic v-model:</Text>
        <Row :gap="20">
          <Checkbox value="X"><Text>X</Text></Checkbox>
          <Checkbox value="Y"><Text>Y</Text></Checkbox>
          <Checkbox value="Z"><Text>Z</Text></Checkbox>
        </Row>
        <Row :gap="10">
          <Button @click="dynamicModel = ['X']"><Text>Set to ['X']</Text></Button>
          <Button @click="dynamicModel = ['Y', 'Z']"><Text>Set to ['Y', 'Z']</Text></Button>
          <Button @click="dynamicModel = []"><Text>Clear</Text></Button>
        </Row>
        <Text>Current Value: {{ dynamicModel }}</Text>
      </Column>
    </CheckboxGroup>

    <!-- Cross-Nested Example -->
    <Column :gap="10">
      <Text :style="{ fontWeight: FontWeight.bold }">Cross Nested (Checkbox inside Radio):</Text>
      <RadioGroup v-model:value="crossRadioVal">
        <Column :gap="15">
          <Radio value="Option A">
            <Row :gap="10" cross-axis-alignment="center">
              <Text>Option A (with nested checkboxes)</Text>
              <CheckboxGroup v-model:value="crossCheckValA">
                <Row :gap="10">
                  <Checkbox value="A1"><Text>A1</Text></Checkbox>
                  <Checkbox value="A2"><Text>A2</Text></Checkbox>
                </Row>
              </CheckboxGroup>
            </Row>
          </Radio>
          <Radio value="Option B">
            <Row :gap="10" cross-axis-alignment="center">
              <Text>Option B</Text>
            </Row>
          </Radio>
        </Column>
      </RadioGroup>
      <Text>Radio: {{ crossRadioVal }}, Checkbox A: {{ crossCheckValA }}</Text>
    </Column>
  </Column>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import {
  Column,
  Row,
  Text,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  FontWeight,
  Container,
  EdgeInsets,
  Button,
} from "fluekit";

const checkVal = ref(false);
const checkVal2 = ref(true);
const checkVal3 = ref(true);
const checkVal4 = ref(false);
const groupVal = ref(["Apple"]);
const nestedGroupVal = ref([]);
const loopGroupVal = ref(["Item B"]);
const items = ["Item A", "Item B", "Item C", "Item D", "Item E"];
const dynamicModel = ref(["X"]);
const crossRadioVal = ref("Option A");
const crossCheckValA = ref(["A1"]);

const multiGroups = reactive([
  { name: "Fruits", options: ["Apple", "Banana", "Orange"], selected: ["Apple"] },
  { name: "Vegetables", options: ["Carrot", "Potato", "Tomato"], selected: [] },
]);
</script>
