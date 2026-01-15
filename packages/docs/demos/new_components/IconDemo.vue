<template>
  <div class="demo-container">
    <Column :gap="20" cross-axis-alignment="start">
      <!-- Usage 1: SVG Path String -->
      <Column :gap="10" cross-axis-alignment="start">
        <Text :style="TextStyle({ fontWeight: FontWeight.bold })">1. Using SVG Path String</Text>
        <Row :gap="20">
          <Icon :icon="menuIcon" :size="32" />
          <Icon :icon="homeIcon" :size="32" color="blue" />
          <Icon :icon="favoriteIcon" :size="32" color="red" />
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
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" stroke="white" stroke-width="2" />
            </svg>
          </Icon>
        </Row>
      </Column>
    </Column>
  </div>
</template>

<script setup lang="ts">
import { Icon, Column, Row, Text, TextStyle, FontWeight } from "fluekit";
import { h } from "vue";

// 1. SVG Path Strings
const menuIcon = "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z";
const homeIcon = "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z";
const favoriteIcon =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

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
        d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
      }),
    ],
  );
</script>
