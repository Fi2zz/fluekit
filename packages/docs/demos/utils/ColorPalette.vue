<template>
  <Column :gap="20">
    <Column :gap="10">
      <Text
        data="Material Colors"
        :style="TextStyle({ fontSize: 18, fontWeight: FontWeight.bold })"
      />
      <Wrap :spacing="10" :run-spacing="10">
        <ColorItem name="Colors.red" :color="Colors.red" />
        <ColorItem name="Colors.pink" :color="Colors.pink" />
        <ColorItem name="Colors.purple" :color="Colors.purple" />
        <ColorItem name="Colors.deepPurple" :color="Colors.deepPurple" />
        <ColorItem name="Colors.indigo" :color="Colors.indigo" />
        <ColorItem name="Colors.blue" :color="Colors.blue" />
        <ColorItem name="Colors.lightBlue" :color="Colors.lightBlue" />
        <ColorItem name="Colors.cyan" :color="Colors.cyan" />
        <ColorItem name="Colors.teal" :color="Colors.teal" />
        <ColorItem name="Colors.green" :color="Colors.green" />
        <ColorItem name="Colors.lightGreen" :color="Colors.lightGreen" />
        <ColorItem name="Colors.lime" :color="Colors.lime" />
        <ColorItem name="Colors.yellow" :color="Colors.yellow" />
        <ColorItem name="Colors.amber" :color="Colors.amber" />
        <ColorItem name="Colors.orange" :color="Colors.orange" />
        <ColorItem name="Colors.deepOrange" :color="Colors.deepOrange" />
        <ColorItem name="Colors.brown" :color="Colors.brown" />
        <ColorItem name="Colors.grey" :color="Colors.grey" />
        <ColorItem name="Colors.blueGrey" :color="Colors.blueGrey" />
      </Wrap>
    </Column>

    <Column :gap="10">
      <Text
        data="Shades Example (Blue)"
        :style="TextStyle({ fontSize: 18, fontWeight: FontWeight.bold })"
      />
      <Wrap :spacing="10" :run-spacing="10">
        <ColorItem name="Colors.blue50" :color="Colors.blue50" />
        <ColorItem name="Colors.blue100" :color="Colors.blue100" />
        <ColorItem name="Colors.blue200" :color="Colors.blue200" />
        <ColorItem name="Colors.blue300" :color="Colors.blue300" />
        <ColorItem name="Colors.blue400" :color="Colors.blue400" />
        <ColorItem name="Colors.blue500" :color="Colors.blue500" />
        <ColorItem name="Colors.blue600" :color="Colors.blue600" />
        <ColorItem name="Colors.blue700" :color="Colors.blue700" />
        <ColorItem name="Colors.blue800" :color="Colors.blue800" />
        <ColorItem name="Colors.blue900" :color="Colors.blue900" />
      </Wrap>
    </Column>

    <Column :gap="10">
      <Text
        data="Cupertino Colors"
        :style="TextStyle({ fontSize: 18, fontWeight: FontWeight.bold })"
      />
      <Wrap :spacing="10" :run-spacing="10">
        <ColorItem name="CupertinoColors.activeBlue" :color="CupertinoColors.activeBlue" />
        <ColorItem name="CupertinoColors.activeGreen" :color="CupertinoColors.activeGreen" />
        <ColorItem name="CupertinoColors.activeOrange" :color="CupertinoColors.activeOrange" />
        <ColorItem name="CupertinoColors.destructiveRed" :color="CupertinoColors.destructiveRed" />
        <ColorItem name="CupertinoColors.systemBlue" :color="CupertinoColors.systemBlue" />
        <ColorItem name="CupertinoColors.systemGreen" :color="CupertinoColors.systemGreen" />
        <ColorItem name="CupertinoColors.systemRed" :color="CupertinoColors.systemRed" />
        <ColorItem name="CupertinoColors.systemGrey" :color="CupertinoColors.systemGrey" />
      </Wrap>
    </Column>
  </Column>
</template>

<script setup lang="ts">
import {
  Border,
  BorderRadius,
  BoxDecoration,
  Color,
  Colors,
  Column,
  Container,
  CupertinoColors,
  FontWeight,
  Text,
  TextAlign,
  TextStyle,
  Wrap,
} from "fluekit";
import { defineComponent, h } from "vue";

const ColorItem = defineComponent({
  props: {
    name: String,
    color: Color,
  },
  setup(props) {
    return () =>
      h(Column, { alignment: "center" }, () => [
        h(
          Container,
          {
            width: 80,
            height: 80,
            decoration: BoxDecoration({
              color: props.color,
              borderRadius: BorderRadius.circular(8),
              border: Border.all({ color: "#E0E0E0", width: 1 }),
            }),
            alignment: "center",
          },
          () =>
            h(Text, {
              data: props.color?.toString() || "",
              style: TextStyle({
                fontSize: 10,
                color: "#fff",
                shadows: [
                  {
                    color: "rgba(0,0,0,0.5)",
                    blurRadius: 4,
                    offsetX: 2,
                    offsetY: 2,
                  },
                ],
              }),
            }),
        ),
        h(Container, { height: 4 }),
        h(Text, {
          data: props.name,
          textAlign: TextAlign.center,
          style: TextStyle({ fontSize: 10, color: "#666" }),
        }),
      ]);
  },
});
</script>
