<template>
  <Column :gap="20">
    <Text>Horizontal Divider:</Text>
    <Container color="#f5f5f5" :padding="EdgeInsets.all(16)">
      <Column>
        <Text>Item 1</Text>
        <Divider />
        <Text>Item 2</Text>
        <Divider :color="'red'" :thickness="2" />
        <Text>Item 3</Text>
      </Column>
    </Container>

    <Text>Vertical Divider:</Text>
    <Container color="#f5f5f5" :height="50" :padding="EdgeInsets.all(8)">
      <Row>
        <Text>Left</Text>
        <Divider vertical />
        <Text>Right</Text>
      </Row>
    </Container>

    <Text>Spacer:</Text>
    <Row>
      <Container :width="50" :height="50" color="blue" />
      <Spacer />
      <Container :width="50" :height="50" color="green" />
    </Row>
  </Column>
</template>

<script setup lang="ts">
import { Column, Row, Text, Divider, Container, EdgeInsets, Spacer } from "fluekit";
</script>
