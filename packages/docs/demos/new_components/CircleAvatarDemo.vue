<script setup lang="ts">
import { CircleAvatar, Colors, Column, Container, EdgeInsets, Row, Text } from "fluekit";
</script>

<template>
  <Container :padding="EdgeInsets.all(20)">
    <Column :gap="20">
      <Row :gap="20" crossAxisAlignment="center">
        <CircleAvatar>
          <Text>A</Text>
        </CircleAvatar>
        <Text>Default Avatar with Text</Text>
      </Row>

      <Row :gap="20" crossAxisAlignment="center">
        <CircleAvatar
          backgroundImage="https://avatars.githubusercontent.com/u/1?v=4"
          :radius="30"
        />
        <Text>Image Avatar (Radius 30)</Text>
      </Row>

      <Row :gap="20" crossAxisAlignment="center">
        <CircleAvatar :backgroundColor="Colors.blue" :foregroundColor="Colors.white">
          <Text>XL</Text>
        </CircleAvatar>
        <Text>Colored Avatar</Text>
      </Row>
    </Column>
  </Container>
</template>
