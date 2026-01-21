<template>
  <div class="demo-container">
    <Column :gap="20" cross-axis-alignment="start">
      <!-- Usage 1: SVG Path String -->
      <Column :gap="10" cross-axis-alignment="start">
        <Text :style="TextStyle({ fontWeight: FontWeight.bold })">1. Using SVG Path String</Text>
        <Row :gap="20">
          <Icon :icon="Icons.menu" :size="32" />
          <Icon :icon="Icons.home" :size="32" color="blue" />
          <Icon :icon="Icons.favorite" :size="32" color="red" />
          <Icon :icon="Icons.accessTime" :size="32" color="red" />
        </Row>
      </Column>
      <!-- Usage 2: Vue Component -->
      <Column :gap="10" cross-axis-alignment="start">
        <Text :style="TextStyle({ fontWeight: FontWeight.bold })">2. Using Vue Component</Text>
        <Row :gap="20">
          <Icon :icon="SearchIconComponent" :size="32" />
          <Icon :icon="SearchIconComponent" :size="48" color="green" />
        </Row>
      </Column>

      <!-- Usage 3: Slot -->
      <Column :gap="10" cross-axis-alignment="start">
        <Text :style="TextStyle({ fontWeight: FontWeight.bold })">3. Using Slot</Text>
        <Row :gap="20">
          <Icon :size="40" color="purple">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path :d="Icons.accessTime" />
            </svg>
          </Icon>
        </Row>
      </Column>

      <!-- Usage 4: Pre-defined Icons (Material) -->
      <Column :gap="10" cross-axis-alignment="start">
        <Text :style="TextStyle({ fontWeight: FontWeight.bold })">4. Pre-defined Icons</Text>
        <Wrap :spacing="20" :runSpacing="20">
          <Column :gap="5" cross-axis-alignment="center" v-for="(path, name) in Icons" :key="name">
            <Icon :icon="path" :size="32" />
            <Text :style="TextStyle({ fontSize: 12, color: '#666' })">{{ name }}</Text>
          </Column>
        </Wrap>
      </Column>
    </Column>
  </div>
</template>

<script setup lang="ts">
import { Icon, Column, Row, Text, TextStyle, FontWeight, Icons, Wrap } from "fluekit";
import { h } from "vue";

// 2. Simple Functional Component simulating an imported SVG
const SearchIconComponent = (props: any) =>
  h(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: props.fill || "currentColor",
      width: props.width,
      height: props.height,
    },
    [
      h("path", {
        d: Icons.search,
      }),
    ],
  );
</script>
