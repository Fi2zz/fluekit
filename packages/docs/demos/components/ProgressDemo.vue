<template>
  <Column :gap="30">
    <!-- Linear Progress -->
    <Column :gap="10">
      <Text data="Linear Progress Indicator" :style="{ fontSize: 18, fontWeight: 'bold' }" />
      <Text data="Indeterminate" :style="{ fontSize: 14, color: '#666' }" />
      <LinearProgressIndicator />

      <Text data="Determinate (50%)" :style="{ fontSize: 14, color: '#666' }" />
      <LinearProgressIndicator
        :value="0.5"
        :color="Colors.green"
        :background-color="Colors.green100"
      />
    </Column>

    <!-- Circular Progress -->
    <Column :gap="10">
      <Text data="Circular Progress Indicator" :style="{ fontSize: 18, fontWeight: 'bold' }" />
      <Row :gap="20" alignment="center">
        <Column alignment="center" :gap="5">
          <CircularProgressIndicator />
          <Text data="Indeterminate" :style="{ fontSize: 12 }" />
        </Column>
        <Column alignment="center" :gap="5">
          <CircularProgressIndicator :value="0.75" :color="Colors.purple" />
          <Text data="Determinate (75%)" :style="{ fontSize: 12 }" />
        </Column>
      </Row>
    </Column>

    <!-- Cupertino Activity Indicator -->
    <Column :gap="10">
      <Text data="Cupertino Activity Indicator" :style="{ fontSize: 18, fontWeight: 'bold' }" />
      <Row :gap="20" alignment="center">
        <Column alignment="center" :gap="5">
          <CupertinoActivityIndicator />
          <Text data="Default" :style="{ fontSize: 12 }" />
        </Column>
        <Column alignment="center" :gap="5">
          <CupertinoActivityIndicator :radius="15" :color="CupertinoColors.activeBlue" />
          <Text data="Large Blue" :style="{ fontSize: 12 }" />
        </Column>
      </Row>
    </Column>
  </Column>
</template>

<script setup lang="ts">
import {
  LinearProgressIndicator,
  CircularProgressIndicator,
  CupertinoActivityIndicator,
  Column,
  Row,
  Text,
  Colors,
  CupertinoColors,
} from "fluekit";
</script>
