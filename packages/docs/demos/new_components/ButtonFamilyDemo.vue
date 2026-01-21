<script setup lang="ts">
import {
  Colors,
  Column,
  ElevatedButton,
  IconButton,
  MainAxisAlignment,
  OutlinedButton,
  Row,
  SizedBox,
  Text,
  TextButton,
} from "fluekit";
import { h } from "vue";

const HeartIcon = {
  render: () =>
    h(
      "svg",
      { viewBox: "0 0 24 24" },
      h("path", {
        d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
      }),
    ),
};
</script>

<template>
  <Column crossAxisAlignment="start">
    <Text>Elevated Button</Text>
    <Row :mainAxisAlignment="MainAxisAlignment.spaceEvenly">
      <ElevatedButton>Enabled</ElevatedButton>
      <ElevatedButton disabled>Disabled</ElevatedButton>
    </Row>

    <SizedBox :height="20" />

    <Text>Text Button</Text>
    <Row :mainAxisAlignment="MainAxisAlignment.spaceEvenly">
      <TextButton>Enabled</TextButton>
      <TextButton disabled>Disabled</TextButton>
    </Row>

    <SizedBox :height="20" />

    <Text>Outlined Button</Text>
    <Row :mainAxisAlignment="MainAxisAlignment.spaceEvenly">
      <OutlinedButton>Enabled</OutlinedButton>
      <OutlinedButton disabled>Disabled</OutlinedButton>
    </Row>

    <SizedBox :height="20" />

    <Text>Icon Button</Text>
    <Row :mainAxisAlignment="MainAxisAlignment.spaceEvenly">
      <IconButton :icon="HeartIcon" :color="Colors.red" />
      <IconButton :icon="HeartIcon" disabled />
    </Row>
  </Column>
</template>
