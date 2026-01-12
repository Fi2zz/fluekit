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
import { ref } from "vue";
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
} from "fluekit";

const radioVal = ref("A");
const groupVal = ref("One");
const themeVal = ref("Light");
const hiddenVal = ref("X");

const headerStyle = TextStyle({
  fontWeight: FontWeight.bold,
});
</script>
