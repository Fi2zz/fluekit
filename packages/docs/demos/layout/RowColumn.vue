<template>
  <Container
    color="#f0f0f0"
    :padding="EdgeInsets.all(10)"
    :margin="EdgeInsets.only({ bottom: 20 })"
  >
    <Column mainAxisSize="min">
      <Row mainAxisAlignment="space-between" :margin="EdgeInsets.only({ bottom: 10 })">
        <Container :width="50" :height="50" color="red" alignment="center"
          ><Text data="1" :style="TextStyle({ color: 'white' })"
        /></Container>
        <Container :width="50" :height="50" color="green" alignment="center"
          ><Text data="2" :style="TextStyle({ color: 'white' })"
        /></Container>
        <Container :width="50" :height="50" color="blue" alignment="center"
          ><Text data="3" :style="TextStyle({ color: 'white' })"
        /></Container>
      </Row>
    </Column>
  </Container>
</template>

<script setup lang="ts">
import { Container, Column, Row, Text, TextStyle, EdgeInsets } from "fluekit";
</script>
