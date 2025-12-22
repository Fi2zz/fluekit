<template>
  <Row :gap="20">
    <Container :width="150" :height="150" :decoration="lightGrayDecoration" :padding="paddingAll10">
      <Text data="alignment: topLeft" :style="smallTextStyle" />
      <Stack alignment="topLeft" :height="120">
        <Container :width="120" :height="120" :decoration="grayDecoration" />
        <Container :width="60" :height="60" :decoration="redDecoration" alignment="center">
          <Text data="TopLeft" :style="smallWhiteTextStyle" />
        </Container>
      </Stack>
    </Container>

    <Container :width="150" :height="150" :decoration="lightGrayDecoration" :padding="paddingAll10">
      <Text data="alignment: center" :style="smallTextStyle" />
      <Stack alignment="center" :height="120">
        <Container :width="120" :height="120" :decoration="grayDecoration" />
        <Container :width="60" :height="60" :decoration="blueDecoration" alignment="center">
          <Text data="Center" :style="smallWhiteTextStyle" />
        </Container>
      </Stack>
    </Container>

    <Container :width="150" :height="150" :decoration="lightGrayDecoration" :padding="paddingAll10">
      <Text data="alignment: bottomRight" :style="smallTextStyle" />
      <Stack alignment="bottomRight" :height="120">
        <Container :width="120" :height="120" :decoration="grayDecoration" />
        <Container :width="60" :height="60" :decoration="greenDecoration" alignment="center">
          <Text data="BottomRight" :style="smallWhiteTextStyle" />
        </Container>
      </Stack>
    </Container>
  </Row>
</template>

<script setup lang="ts">
import { Container, Row, Stack, Text, BoxDecoration, TextStyle, EdgeInsets } from "fluekit";

const lightGrayDecoration = BoxDecoration({ color: "#f0f0f0" });
const grayDecoration = BoxDecoration({ color: "grey", opacity: 0.3 });
const redDecoration = BoxDecoration({ color: "red" });
const blueDecoration = BoxDecoration({ color: "blue" });
const greenDecoration = BoxDecoration({ color: "green" });

const paddingAll10 = EdgeInsets.all(10);
const smallTextStyle = TextStyle({ marginBottom: "10px", fontSize: "12px" });
const smallWhiteTextStyle = TextStyle({ color: "white", fontSize: "12px" });
</script>
