<template>
  <Column :gap="20">
    <!-- Basic Radio with Labels -->
    <Text :style="headerStyle">Basic Radio</Text>
    <Row :gap="20" cross-axis-alignment="center">
      <Radio value="A" v-model:groupValue="radioVal">
        <Text>Option A</Text>
      </Radio>
      <Radio value="B" v-model:groupValue="radioVal" active-color="#4CAF50">
        <Text>Option B</Text>
      </Radio>
      <Radio value="C" v-model:groupValue="radioVal" label-position="left">
        <Text>Option C (Left)</Text>
      </Radio>
    </Row>
    <Text>Selected: {{ radioVal }}</Text>

    <Divider />

    <!-- Radio Group -->
    <Text :style="headerStyle">Radio Group</Text>
    <RadioGroup v-model:value="groupVal" active-color="#E91E63">
      <Row :gap="20">
        <Radio value="One">
          <Text>One</Text>
        </Radio>
        <Radio value="Two">
          <Text>Two</Text>
        </Radio>
        <Radio value="Three">
          <Text>Three</Text>
        </Radio>
      </Row>
    </RadioGroup>
    <Text>Group Value: {{ groupVal }}</Text>

    <Divider />

    <!-- Nested Radio Group -->
    <Text :style="headerStyle">Nested Layout</Text>
    <RadioGroup v-model:value="nestedVal">
      <Container color="#f5f5f5" :padding="EdgeInsets.all(10)">
        <Column :gap="10">
          <Text :style="{ fontWeight: FontWeight.bold }">Category A</Text>
          <Row :gap="20">
            <Radio value="A1"><Text>Option A1</Text></Radio>
            <Radio value="A2"><Text>Option A2</Text></Radio>
          </Row>
          <Text :style="{ fontWeight: FontWeight.bold }">Category B</Text>
          <Row :gap="20">
            <Radio value="B1"><Text>Option B1</Text></Radio>
            <Radio value="B2"><Text>Option B2</Text></Radio>
          </Row>
        </Column>
      </Container>
    </RadioGroup>
    <Text>Nested Value: {{ nestedVal }}</Text>

    <Divider />

    <!-- v-for Loop -->
    <Text :style="headerStyle">v-for Loop (Items)</Text>
    <RadioGroup v-model:value="loopVal">
      <Row :gap="10" wrap>
        <Radio v-for="item in items" :key="item" :value="item">
          <Text>{{ item }}</Text>
        </Radio>
      </Row>
    </RadioGroup>
    <Text>Loop Value: {{ loopVal }}</Text>

    <Divider />

    <!-- v-for Loop with RadioGroup -->
    <Text :style="headerStyle">v-for Loop (RadioGroups)</Text>
    <Column :gap="15">
      <RadioGroup
        v-for="(group, index) in questionGroups"
        :key="index"
        v-model:value="group.answer"
        active-color="#673AB7"
      >
        <Column :gap="5">
          <Text :style="{ fontWeight: FontWeight.bold }">{{ group.question }}</Text>
          <Row :gap="15">
            <Radio v-for="opt in group.options" :key="opt" :value="opt">
              <Text>{{ opt }}</Text>
            </Radio>
          </Row>
          <Text>Answer: {{ group.answer }}</Text>
        </Column>
      </RadioGroup>
    </Column>

    <Divider />

    <!-- Dynamic v-model -->
    <Text :style="headerStyle">Dynamic v-model</Text>
    <RadioGroup v-model:value="dynamicVal">
      <Column :gap="10">
        <Row :gap="20">
          <Radio value="Option 1"><Text>Option 1</Text></Radio>
          <Radio value="Option 2"><Text>Option 2</Text></Radio>
          <Radio value="Option 3"><Text>Option 3</Text></Radio>
        </Row>
        <Row :gap="10">
          <Button @click="dynamicVal = 'Option 1'"><Text>Select 1</Text></Button>
          <Button @click="dynamicVal = 'Option 2'"><Text>Select 2</Text></Button>
          <Button @click="dynamicVal = 'Option 3'"><Text>Select 3</Text></Button>
        </Row>
        <Text>Current Value: {{ dynamicVal }}</Text>
      </Column>
    </RadioGroup>

    <Divider />

    <!-- Cross-Nested Example -->
    <Text :style="headerStyle">Cross Nested (Radio inside Checkbox)</Text>
    <CheckboxGroup v-model:value="crossCheckVal">
      <Column :gap="15">
        <Checkbox value="Include Extra">
          <Row :gap="10" cross-axis-alignment="center">
            <Text>Include Extra Options</Text>
            <RadioGroup
              v-if="crossCheckVal.includes('Include Extra')"
              v-model:value="crossRadioVal"
            >
              <Row :gap="10">
                <Radio value="R1"><Text>R1</Text></Radio>
                <Radio value="R2"><Text>R2</Text></Radio>
              </Row>
            </RadioGroup>
          </Row>
        </Checkbox>
        <Checkbox value="Basic Option">
          <Text>Basic Option</Text>
        </Checkbox>
      </Column>
    </CheckboxGroup>
    <Text>Checkbox: {{ crossCheckVal }}, Radio: {{ crossRadioVal }}</Text>

    <Divider />

    <!-- Hide Icon Radio -->
    <Text :style="headerStyle">Hide Icon</Text>
    <Row :gap="20" cross-axis-alignment="center">
      <Radio value="X" v-model:groupValue="hiddenVal" hide-icon>
        <Text :style="hiddenVal === 'X' ? { color: '#007AFF', fontWeight: FontWeight.bold } : {}"
          >Option X</Text
        >
      </Radio>
      <Radio value="Y" v-model:groupValue="hiddenVal" hide-icon>
        <Text :style="hiddenVal === 'Y' ? { color: '#007AFF', fontWeight: FontWeight.bold } : {}"
          >Option Y</Text
        >
      </Radio>
    </Row>

    <Divider />

    <!-- RadioListTile -->
    <Text :style="headerStyle">RadioListTile</Text>
    <Container color="#f5f5f5">
      <Column>
        <RadioListTile
          value="Light"
          v-model:groupValue="themeVal"
          title="Light Theme"
          subtitle="Use light theme"
        />
        <RadioListTile
          value="Dark"
          v-model:groupValue="themeVal"
          title="Dark Theme"
          subtitle="Use dark theme"
          active-color="#212121"
        />
        <RadioListTile
          value="System"
          v-model:groupValue="themeVal"
          title="System Theme"
          control-affinity="trailing"
        />
        <RadioListTile
          value="Custom"
          v-model:groupValue="themeVal"
          title="Custom Theme (No Icon)"
          hide-icon
          :selected-color="themeVal === 'Custom' ? '#007AFF' : undefined"
        />
      </Column>
    </Container>
    <Text>Theme: {{ themeVal }}</Text>
  </Column>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import {
  Column,
  Row,
  Text,
  Radio,
  RadioGroup,
  RadioListTile,
  Divider,
  Container,
  TextStyle,
  FontWeight,
  EdgeInsets,
  Button,
  Checkbox,
  CheckboxGroup,
} from "fluekit";

const radioVal = ref("A");
const groupVal = ref("One");
const nestedVal = ref("A1");
const loopVal = ref("Item 2");
const themeVal = ref("Light");
const hiddenVal = ref("X");
const dynamicVal = ref("Option 1");
const items = ["Item 1", "Item 2", "Item 3", "Item 4"];
const crossCheckVal = ref(["Include Extra"]);
const crossRadioVal = ref("R1");

const questionGroups = reactive([
  { question: "Question 1: Yes or No?", options: ["Yes", "No"], answer: "Yes" },
  { question: "Question 2: Pick a Color", options: ["Red", "Green", "Blue"], answer: "Red" },
]);

const headerStyle = TextStyle({
  fontWeight: FontWeight.bold,
});
</script>
