<template>
  <Row :gap="20">
    <Container :width="150" :height="150" color="#f0f0f0" :padding="{ all: 10 }">
      <Text data="alignment: topLeft" :style="{ marginBottom: '10px', fontSize: '12px' }" />
      <Stack alignment="topLeft" :height="120">
        <Container :width="120" :height="120" color="grey" opacity="0.3" />
        <Container :width="60" :height="60" color="red" alignment="center">
          <Text data="TopLeft" :style="{ color: 'white', fontSize: '12px' }" />
        </Container>
      </Stack>
    </Container>

    <Container :width="150" :height="150" color="#f0f0f0" :padding="{ all: 10 }">
      <Text data="alignment: center" :style="{ marginBottom: '10px', fontSize: '12px' }" />
      <Stack alignment="center" :height="120">
        <Container :width="120" :height="120" color="grey" opacity="0.3" />
        <Container :width="60" :height="60" color="blue" alignment="center">
          <Text data="Center" :style="{ color: 'white', fontSize: '12px' }" />
        </Container>
      </Stack>
    </Container>

    <Container :width="150" :height="150" color="#f0f0f0" :padding="{ all: 10 }">
      <Text data="alignment: bottomRight" :style="{ marginBottom: '10px', fontSize: '12px' }" />
      <Stack alignment="bottomRight" :height="120">
        <Container :width="120" :height="120" color="grey" opacity="0.3" />
        <Container :width="60" :height="60" color="green" alignment="center">
          <Text data="BottomRight" :style="{ color: 'white', fontSize: '12px' }" />
        </Container>
      </Stack>
    </Container>
  </Row>
</template>

<script setup lang="ts">
import { Container, Row, Stack, Text } from "fluekit";
</script>
