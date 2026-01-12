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
  </Column>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Column, Row, Text, Checkbox, CheckboxGroup, FontWeight } from "fluekit";

const checkVal = ref(false);
const checkVal2 = ref(true);
const checkVal3 = ref(true);
const checkVal4 = ref(false);
const groupVal = ref(["Apple"]);
</script>
