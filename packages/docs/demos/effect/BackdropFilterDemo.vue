<template>
  <Column :gap="30">
    <Text :style="titleStyle" data="BackdropFilter Demo" />

    <Text data="1. Using BackdropFilter Widget" :style="subtitleStyle" />
    <Container
      :width="300"
      :height="200"
      :decoration="
        BoxDecoration({
          image: DecorationImage({
            image: NetworkImage('https://picsum.photos/300/200'),
            fit: 'cover',
          }),
        })
      "
    >
      <Center>
        <BackdropFilter :filter="ImageFilter.blur({ sigmaX: 5, sigmaY: 5 })">
          <Container
            :padding="EdgeInsets.all(20)"
            color="rgba(0, 0, 0, 0.3)"
            :decoration="BoxDecoration({ borderRadius: BorderRadius.circular(10) })"
          >
            <Text
              data="Frosted Glass"
              :style="TextStyle({ color: 'white', fontWeight: FontWeight.bold })"
            />
          </Container>
        </BackdropFilter>
      </Center>
    </Container>

    <Text data="2. Using BoxDecoration.backdropFilter" :style="subtitleStyle" />
    <Container
      :width="300"
      :height="200"
      :decoration="
        BoxDecoration({
          image: DecorationImage({
            image: NetworkImage('https://picsum.photos/300/200?random=2'),
            fit: 'cover',
          }),
        })
      "
    >
      <Center>
        <!-- Directly applying backdropFilter in BoxDecoration of the child container -->
        <Container
          :width="200"
          :height="100"
          alignment="center"
          :decoration="
            BoxDecoration({
              color: 'rgba(255, 255, 255, 0.2)',
              borderRadius: BorderRadius.circular(15),
              border: Border.all({ color: 'rgba(255, 255, 255, 0.3)', width: 1 }),
              backdropFilter: ImageFilter.blur({ sigmaX: 10 }),
            })
          "
        >
          <Text
            data="Blurred Box"
            :style="TextStyle({ color: 'white', fontWeight: FontWeight.bold, fontSize: 20 })"
          />
        </Container>
      </Center>
    </Container>
  </Column>
</template>

<script setup lang="ts">
import {
  BackdropFilter,
  Border,
  BorderRadius,
  BoxDecoration,
  Center,
  Column,
  Container,
  DecorationImage,
  EdgeInsets,
  FontWeight,
  ImageFilter,
  NetworkImage,
  Text,
  TextStyle,
} from "fluekit";

const titleStyle = TextStyle({
  fontSize: 24,
  fontWeight: FontWeight.bold,
  color: "#333",
});

const subtitleStyle = TextStyle({
  fontSize: 18,
  fontWeight: FontWeight.w600,
  color: "#666",
});
</script>
