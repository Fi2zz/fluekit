<script setup lang="ts">
import {
  Scaffold,
  AppBar,
  Drawer,
  Text,
  Center,
  Column,
  ListTile,
  Container,
  Colors,
  EdgeInsets,
  TextStyle,
  FontWeight,
} from "fluekit";

const handleItemClick = (item: string) => {
  console.log(`Clicked: ${item}`);
};
</script>

<template>
  <Container height="500" :border="{ width: 1, color: '#eee' }">
    <Scaffold>
      <template #appBar>
        <AppBar title="Drawer Demo" />
      </template>

      <template #drawer="{ open, close }">
        <Drawer :open="open" @close="close">
          <Column expanded>
            <Container
              height="200"
              :color="Colors.blue"
              :padding="EdgeInsets.all(16)"
              alignment="bottomLeft"
            >
              <Text
                :style="
                  TextStyle({ color: Colors.amber, fontSize: 24, fontWeight: FontWeight.bold })
                "
              >
                Fluekit Drawer
              </Text>
              <Text :style="TextStyle({ color: Colors.amber100.withOpacity(0.8), fontSize: 14 })">
                vue-flutter-kit
              </Text>
            </Container>

            <ListTile title="Home" @tap="handleItemClick('Home')" />
            <ListTile title="Profile" @tap="handleItemClick('Profile')" />
            <ListTile title="Settings" @tap="handleItemClick('Settings')" />
          </Column>
        </Drawer>
      </template>

      <Center>
        <Column mainAxisAlignment="center">
          <Text>Click the menu icon in AppBar</Text>
          <Text>or slide from left edge</Text>

          <!-- Note: In a real app, AppBar handles the drawer opening automatically if leading is not provided. 
                 But here we can also manually trigger it via injected methods if needed. -->
        </Column>
      </Center>
    </Scaffold>
  </Container>
</template>
