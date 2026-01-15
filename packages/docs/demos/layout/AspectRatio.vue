<template>
  <Column :gap="20">
    <Text data="16:9 Aspect Ratio" />
    <AspectRatio :aspect-ratio="16 / 9">
      <Container color="blue" alignment="center">
        <Text data="16:9" :style="{ color: 'white' }" />
      </Container>
    </AspectRatio>

    <Text data="4:3 Aspect Ratio" />
    <AspectRatio :aspect-ratio="4 / 3">
      <Container color="green" alignment="center">
        <Text data="4:3" :style="{ color: 'white' }" />
      </Container>
    </AspectRatio>

    <Text data="1:1 Aspect Ratio (Square)" />
    <AspectRatio :aspect-ratio="1">
      <Container color="red" alignment="center">
        <Text data="1:1" :style="{ color: 'white' }" />
      </Container>
    </AspectRatio>
  </Column>
</template>

<script setup lang="ts">
import { AspectRatio, Container, Column, Text } from "fluekit";
</script>
