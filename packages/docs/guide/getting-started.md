# Getting Started

## Introduction

FlueKit is a layout UI kit for Vue 3 that brings Flutter's layout concepts to the web. It allows you to build complex layouts with ease using a familiar API.

## Installation

```bash
npm install fluekit
# or
pnpm add fluekit
# or
yarn add fluekit
```

## Basic Usage

```vue
<script setup>
import { Container, Text, Center, BoxDecoration, TextStyle } from "fluekit";

const blueDecoration = BoxDecoration({ color: "blue" });
const whiteTextStyle = TextStyle({ color: "white" });
</script>

<template>
  <Center>
    <Container :width="200" :height="200" :decoration="blueDecoration" alignment="center">
      <Text :style="whiteTextStyle">Hello FlueKit</Text>
    </Container>
  </Center>
</template>
```
