<template>
  <Container :width="300" :height="150" color="#f0f0f0" :padding="{ all: 10 }">
    <Text data="MainAxisAlignment.spaceBetween" :style="{ marginBottom: '10px' }" />
    <Row mainAxisAlignment="spaceBetween" :margin="{ bottom: '10px' }">
      <Container :width="40" :height="40" color="red" alignment="center"
        ><Text data="1" :style="{ color: 'white' }"
      /></Container>
      <Container :width="40" :height="40" color="green" alignment="center"
        ><Text data="2" :style="{ color: 'white' }"
      /></Container>
      <Container :width="40" :height="40" color="blue" alignment="center"
        ><Text data="3" :style="{ color: 'white' }"
      /></Container>
    </Row>

    <Text data="MainAxisAlignment.spaceAround" :style="{ marginBottom: '10px' }" />
    <Row mainAxisAlignment="spaceAround" :margin="{ bottom: '10px' }">
      <Container :width="40" :height="40" color="red" alignment="center"
        ><Text data="1" :style="{ color: 'white' }"
      /></Container>
      <Container :width="40" :height="40" color="green" alignment="center"
        ><Text data="2" :style="{ color: 'white' }"
      /></Container>
      <Container :width="40" :height="40" color="blue" alignment="center"
        ><Text data="3" :style="{ color: 'white' }"
      /></Container>
    </Row>

    <Text data="MainAxisAlignment.spaceEvenly" :style="{ marginBottom: '10px' }" />
    <Row mainAxisAlignment="spaceEvenly">
      <Container :width="40" :height="40" color="red" alignment="center"
        ><Text data="1" :style="{ color: 'white' }"
      /></Container>
      <Container :width="40" :height="40" color="green" alignment="center"
        ><Text data="2" :style="{ color: 'white' }"
      /></Container>
      <Container :width="40" :height="40" color="blue" alignment="center"
        ><Text data="3" :style="{ color: 'white' }"
      /></Container>
    </Row>
  </Container>
</template>

<script setup lang="ts">
import { Container, Row, Text } from "fluekit";
</script>
