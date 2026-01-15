<template>
  <Column :gap="20">
    <Text data="Image Color Background" :style="{ fontSize: 18, fontWeight: 'bold' }" />

    <ImageColorBackground
      src="https://picsum.photos/id/237/200/300"
      :width="300"
      :height="200"
      :opacity="0.8"
    >
      <template #default="{ color, isLoading }">
        <Center :style="{ height: '100%' }">
          <Column alignment="center" :gap="10">
            <Container v-if="isLoading" :width="20" :height="20" color="white" />
            <Text
              v-else
              :data="`Dominant Color: ${color ? color.toString() : 'None'}`"
              :style="{
                color: color && color.computeLuminance() > 0.5 ? 'black' : 'white',
                fontWeight: 'bold',
              }"
            />
            <img
              src="https://picsum.photos/id/237/200/300"
              width="100"
              style="border-radius: 8px; border: 2px solid white"
            />
          </Column>
        </Center>
      </template>
    </ImageColorBackground>

    <ImageColorBackground src="https://picsum.photos/id/10/200/300" :width="300" :height="200">
      <template #default="{ color }">
        <Center :style="{ height: '100%' }">
          <Column alignment="center" :gap="10">
            <Text
              data="Another Image"
              :style="{
                color: color && color.computeLuminance() > 0.5 ? 'black' : 'white',
                fontWeight: 'bold',
              }"
            />
            <img
              src="https://picsum.photos/id/10/200/300"
              width="100"
              style="border-radius: 8px; border: 2px solid white"
            />
          </Column>
        </Center>
      </template>
    </ImageColorBackground>
  </Column>
</template>

<script setup lang="ts">
import { ImageColorBackground, Column, Text, Center, Container } from "fluekit";
</script>
