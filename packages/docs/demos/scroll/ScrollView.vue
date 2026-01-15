<template>
  <Container
    :height="300"
    :width="300"
    :decoration="BoxDecoration({ border: Border.all({ color: 'black', width: 1 }) })"
  >
    <ScrollView :padding="EdgeInsets.all(0)">
      <Column>
        <Container :height="50" color="lightgrey" alignment="center">
          <Text data="Header" />
        </Container>

        <Sticky :top="0" :zIndex="100">
          <Container :height="40" color="teal" alignment="center" :width="300">
            <Text
              data="Sticky Header"
              :style="TextStyle({ color: 'white', fontWeight: FontWeight.bold })"
            />
          </Container>
        </Sticky>

        <Container
          v-for="i in 10"
          :key="i"
          :height="60"
          color="lightblue"
          :margin="EdgeInsets.only({ top: 10, right: 10, bottom: 10, left: 10 })"
          alignment="center"
        >
          <Text :data="`Scroll Item ${i}`" />
        </Container>
        <Text data="End of List" :textAlign="TextAlign.center" />
      </Column>
    </ScrollView>
  </Container>
</template>

<script setup lang="ts">
import {
  Column,
  Container,
  ScrollView,
  Sticky,
  Text,
  TextAlign,
  BoxDecoration,
  Border,
  EdgeInsets,
  TextStyle,
  FontWeight,
} from "fluekit";
</script>
