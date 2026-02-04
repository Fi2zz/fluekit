<script setup lang="ts">
import {
  Center,
  Colors,
  Column,
  Container,
  ListTile,
  PopupMenuButton,
  Text,
  Row,
  SizedBox,
  TextStyle,
  FontWeight,
  Offset,
} from "fluekit";
// import { Offset } from "fluekit/src/Offset.js";

const handleSelect = (value: string, close: () => void) => {
  console.log("Selected:", value);
  close();
};
</script>

<template>
  <Container height="300" :border="{ width: 1, color: '#eee' }">
    <Center>
      <Row mainAxisAlignment="spaceEvenly" crossAxisAlignment="center">
        <!-- iOS Variant -->
        <Column mainAxisSize="min" crossAxisAlignment="center">
          <Text :style="TextStyle({ fontWeight: FontWeight.bold })">iOS Style(Default)</Text>
          <SizedBox :height="10" />
          <PopupMenuButton variant="ios" :offset="Offset(19, 0)">
            <template #default="{ close }">
              <Container width="180">
                <Column>
                  <ListTile title="Share" @tap="handleSelect('share', close)" />
                  <ListTile title="Edit" @tap="handleSelect('edit', close)" />
                  <ListTile
                    title="Delete"
                    :textStyle="TextStyle({ color: 'red' })"
                    @tap="handleSelect('delete', close)"
                  />
                </Column>
              </Container>
            </template>
          </PopupMenuButton>
        </Column>
        <SizedBox :width="40" />
        <!-- Material Variant -->
        <Column mainAxisSize="min" crossAxisAlignment="center">
          <Text :style="TextStyle({ fontWeight: FontWeight.bold })">Material </Text>
          <SizedBox :height="10" />
          <PopupMenuButton>
            <template #default="{ close }">
              <Container width="150" :color="Colors.white">
                <Column>
                  <ListTile title="Option 1" @tap="handleSelect('1', close)" />
                  <ListTile title="Option 2" @tap="handleSelect('2', close)" />
                  <ListTile title="Option 3" @tap="handleSelect('3', close)" />
                </Column>
              </Container>
            </template>
          </PopupMenuButton>
        </Column>
      </Row>
    </Center>
  </Container>
</template>
