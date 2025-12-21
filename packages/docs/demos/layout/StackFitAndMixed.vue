<template>
  <Container :margin="{ bottom: '20px' }">
    <Text
      data="Stack with Fit Property"
      :style="{ marginBottom: '15px', fontSize: '16px', fontWeight: 'bold' }"
    />
    <Row :gap="20">
      <Container :width="150" :height="150" color="#f0f0f0" :padding="{ all: 10 }">
        <Text data="fit: loose" :style="{ marginBottom: '10px', fontSize: '12px' }" />
        <Stack fit="loose" :height="120">
          <Container :width="80" :height="80" color="red" alignment="center">
            <Text data="Loose" :style="{ color: 'white', fontSize: '12px' }" />
          </Container>
        </Stack>
      </Container>

      <Container :width="150" :height="150" color="#f0f0f0" :padding="{ all: 10 }">
        <Text data="fit: expand" :style="{ marginBottom: '10px', fontSize: '12px' }" />
        <Stack fit="expand" :height="120">
          <Container color="blue" alignment="center">
            <Text data="Expand" :style="{ color: 'white', fontSize: '12px' }" />
          </Container>
        </Stack>
      </Container>
    </Row>
  </Container>

  <Container>
    <Text
      data="Mixed Positioned and Non-Positioned Children"
      :style="{ marginBottom: '15px', fontSize: '16px', fontWeight: 'bold' }"
    />
    <Container :width="350" :height="200" color="#f0f0f0" :padding="{ all: 10 }">
      <Stack :height="180" alignment="center">
        <!-- Non-positioned child (center aligned) -->
        <Container :width="150" :height="150" color="yellow" alignment="center">
          <Text data="Center" :style="{ fontSize: '16px' }" />
        </Container>

        <!-- Positioned children -->
        <Positioned :top="20" :left="20">
          <Container :width="60" :height="60" color="red" alignment="center">
            <Text data="TopLeft" :style="{ color: 'white', fontSize: '12px' }" />
          </Container>
        </Positioned>

        <Positioned :top="20" :right="20">
          <Container :width="60" :height="60" color="blue" alignment="center">
            <Text data="TopRight" :style="{ color: 'white', fontSize: '12px' }" />
          </Container>
        </Positioned>

        <Positioned :bottom="20" :left="20">
          <Container :width="60" :height="60" color="green" alignment="center">
            <Text data="BottomLeft" :style="{ color: 'white', fontSize: '12px' }" />
          </Container>
        </Positioned>

        <Positioned :bottom="20" :right="20">
          <Container :width="60" :height="60" color="purple" alignment="center">
            <Text data="BottomRight" :style="{ color: 'white', fontSize: '12px' }" />
          </Container>
        </Positioned>
      </Stack>
    </Container>
  </Container>
</template>

<script setup lang="ts">
import { Container, Row, Stack, Positioned, Text } from "fluekit";
</script>
