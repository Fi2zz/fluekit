<template>
  <Row :gap="20">
    <Container :width="100" :height="200" color="#f0f0f0" :padding="{ all: 10 }">
      <Text data="MainAxisAlignment.start" :style="{ marginBottom: '10px', fontSize: '12px' }" />
      <Column mainAxisAlignment="start" :height="150">
        <Container :width="30" :height="30" color="red" alignment="center"
          ><Text data="1" :style="{ color: 'white', fontSize: '12px' }"
        /></Container>
        <Container :width="30" :height="30" color="green" alignment="center"
          ><Text data="2" :style="{ color: 'white', fontSize: '12px' }"
        /></Container>
        <Container :width="30" :height="30" color="blue" alignment="center"
          ><Text data="3" :style="{ color: 'white', fontSize: '12px' }"
        /></Container>
      </Column>
    </Container>

    <Container :width="100" :height="200" color="#f0f0f0" :padding="{ all: 10 }">
      <Text data="MainAxisAlignment.center" :style="{ marginBottom: '10px', fontSize: '12px' }" />
      <Column mainAxisAlignment="center" :height="150">
        <Container :width="30" :height="30" color="red" alignment="center"
          ><Text data="1" :style="{ color: 'white', fontSize: '12px' }"
        /></Container>
        <Container :width="30" :height="30" color="green" alignment="center"
          ><Text data="2" :style="{ color: 'white', fontSize: '12px' }"
        /></Container>
        <Container :width="30" :height="30" color="blue" alignment="center"
          ><Text data="3" :style="{ color: 'white', fontSize: '12px' }"
        /></Container>
      </Column>
    </Container>

    <Container :width="100" :height="200" color="#f0f0f0" :padding="{ all: 10 }">
      <Text data="MainAxisAlignment.end" :style="{ marginBottom: '10px', fontSize: '12px' }" />
      <Column mainAxisAlignment="end" :height="150">
        <Container :width="30" :height="30" color="red" alignment="center"
          ><Text data="1" :style="{ color: 'white', fontSize: '12px' }"
        /></Container>
        <Container :width="30" :height="30" color="green" alignment="center"
          ><Text data="2" :style="{ color: 'white', fontSize: '12px' }"
        /></Container>
        <Container :width="30" :height="30" color="blue" alignment="center"
          ><Text data="3" :style="{ color: 'white', fontSize: '12px' }"
        /></Container>
      </Column>
    </Container>
  </Row>
</template>

<script setup lang="ts">
import { Container, Row, Column, Text } from "fluekit";
</script>
