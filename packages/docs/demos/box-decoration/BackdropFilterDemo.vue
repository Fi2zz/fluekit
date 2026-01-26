<script setup lang="ts">
import {
  BoxDecoration,
  Container,
  EdgeInsets,
  ImageFilter,
  Stack,
  Text,
  TextStyle,
  Alignment,
  Positioned,
  BorderRadius,
  Border,
  FontWeight,
} from "fluekit";
</script>

<template>
  <Stack
    :width="300"
    :height="200"
    :decoration="
      BoxDecoration({
        image: {
          image: 'https://picsum.photos/300/200',
          fit: 'cover',
        },
        borderRadius: BorderRadius.circular(12),
      })
    "
  >
    <Positioned :top="20" :left="20" :right="20">
      <Container
        :height="80"
        alignment="center"
        :decoration="
          BoxDecoration({
            color: 'rgba(255, 255, 255, 0.2)',
            borderRadius: BorderRadius.circular(16),
            border: Border.all({ color: 'rgba(255, 255, 255, 0.3)', width: 1 }),
            backdropFilter: ImageFilter.blur({ sigmaX: 10, sigmaY: 10 }),
          })
        "
      >
        <Text
          data="Glassmorphism"
          :style="TextStyle({ color: 'white', fontSize: 20, fontWeight: FontWeight.bold })"
        />
      </Container>
    </Positioned>
  </Stack>
</template>
