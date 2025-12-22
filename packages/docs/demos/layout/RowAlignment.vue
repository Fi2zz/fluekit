<template>
  <Container :width="300" :height="150" color="#f0f0f0" :padding="EdgeInsets.all(10)">
    <Text data="MainAxisAlignment.spaceBetween" :style="TextStyle({ marginBottom: '10px' })" />
    <Row mainAxisAlignment="spaceBetween" :margin="EdgeInsets.only({ bottom: '10px' })">
      <Container :width="40" :height="40" color="red" alignment="center"
        ><Text data="1" :style="TextStyle({ color: 'white' })"
      /></Container>
      <Container :width="40" :height="40" color="green" alignment="center"
        ><Text data="2" :style="TextStyle({ color: 'white' })"
      /></Container>
      <Container :width="40" :height="40" color="blue" alignment="center"
        ><Text data="3" :style="TextStyle({ color: 'white' })"
      /></Container>
    </Row>

    <Text data="MainAxisAlignment.spaceAround" :style="TextStyle({ marginBottom: '10px' })" />
    <Row mainAxisAlignment="spaceAround" :margin="EdgeInsets.only({ bottom: '10px' })">
      <Container :width="40" :height="40" color="red" alignment="center"
        ><Text data="1" :style="TextStyle({ color: 'white' })"
      /></Container>
      <Container :width="40" :height="40" color="green" alignment="center"
        ><Text data="2" :style="TextStyle({ color: 'white' })"
      /></Container>
      <Container :width="40" :height="40" color="blue" alignment="center"
        ><Text data="3" :style="TextStyle({ color: 'white' })"
      /></Container>
    </Row>

    <Text data="MainAxisAlignment.spaceEvenly" :style="TextStyle({ marginBottom: '10px' })" />
    <Row mainAxisAlignment="spaceEvenly">
      <Container :width="40" :height="40" color="red" alignment="center"
        ><Text data="1" :style="TextStyle({ color: 'white' })"
      /></Container>
      <Container :width="40" :height="40" color="green" alignment="center"
        ><Text data="2" :style="TextStyle({ color: 'white' })"
      /></Container>
      <Container :width="40" :height="40" color="blue" alignment="center"
        ><Text data="3" :style="TextStyle({ color: 'white' })"
      /></Container>
    </Row>
  </Container>
</template>

<script setup lang="ts">
import { Container, Row, Text, TextStyle, EdgeInsets } from "fluekit";
</script>
