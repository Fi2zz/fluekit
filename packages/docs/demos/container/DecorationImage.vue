<template>
  <Row wrap gap="10">
    <!-- Cover -->
    <Column>
      <Text>Cover</Text>
      <Container :width="100" :height="100" :decoration="coverDecoration" />
    </Column>

    <!-- Contain -->
    <Column>
      <Text>Contain</Text>
      <Container :width="100" :height="100" :decoration="containDecoration" />
    </Column>

    <!-- Alignment TopLeft -->
    <Column>
      <Text>Align TopLeft</Text>
      <Container :width="100" :height="100" :decoration="alignTopLeftDecoration" />
    </Column>

    <!-- Repeat -->
    <Column>
      <Text>Repeat</Text>
      <Container :width="100" :height="100" :decoration="repeatDecoration" />
    </Column>

    <!-- Gradient as Image -->
    <Column>
      <Text>Gradient Img</Text>
      <Container :width="100" :height="100" :decoration="gradientImageDecoration" />
    </Column>
  </Row>
</template>

<script setup lang="ts">
import {
  Container,
  NetworkImage,
  BoxFit,
  BoxAlignment,
  Row,
  Column,
  Text,
  BorderRadius,
  BoxDecoration,
} from "fluekit";

const coverDecoration = BoxDecoration({
  color: "#eee",
  borderRadius: BorderRadius.all(10),
  image: {
    image: NetworkImage("https://picsum.photos/200/300"),
    fit: BoxFit.cover,
  },
});

const containDecoration = BoxDecoration({
  color: "#eee",
  borderRadius: BorderRadius.all(10),
  image: {
    image: NetworkImage("https://picsum.photos/200/300"),
    fit: BoxFit.contain,
  },
});

const alignTopLeftDecoration = BoxDecoration({
  color: "#eee",
  borderRadius: BorderRadius.all(10),
  image: {
    image: NetworkImage("https://picsum.photos/50/50"),
    fit: BoxFit.none,
    alignment: BoxAlignment.topLeft,
  },
});

const repeatDecoration = BoxDecoration({
  color: "#eee",
  borderRadius: BorderRadius.all(10),
  image: {
    image: NetworkImage("https://picsum.photos/20/20"),
    repeat: "repeat",
  },
});

const gradientImageDecoration = BoxDecoration({
  color: "#eee",
  borderRadius: BorderRadius.all(10),
  image: {
    image: "linear-gradient(to right, red, blue)",
    fit: BoxFit.cover,
  },
});
</script>
