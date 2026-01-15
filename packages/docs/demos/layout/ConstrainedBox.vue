<template>
  <Column :gap="20">
    <Text data="Min Width 100, Min Height 100" />
    <ConstrainedBox :constraints="BoxConstraints({ minWidth: 100, minHeight: 100 })">
      <Container color="red" :width="50" :height="50" alignment="center">
        <Text data="50x50" :style="{ color: 'white' }" />
      </Container>
    </ConstrainedBox>

    <Text data="Max Width 150" />
    <ConstrainedBox :constraints="BoxConstraints({ maxWidth: 150 })">
      <Container color="blue" :width="300" :height="50" alignment="center">
        <Text data="300x50 -> 150x50" :style="{ color: 'white' }" />
      </Container>
    </ConstrainedBox>
  </Column>
</template>

<script setup lang="ts">
import { ConstrainedBox, Container, BoxConstraints, Column, Text } from "fluekit";
</script>
