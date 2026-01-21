<script setup lang="ts">
import { Center, Colors, Column, Container, ListTile, PopupMenuButton, Text } from "fluekit";

const handleSelect = (value: string, close: () => void) => {
  console.log("Selected:", value);
  close();
};
</script>

<template>
  <Container height="300" :border="{ width: 1, color: '#eee' }">
    <Center>
      <Column mainAxisSize="min">
        <Text>Click the menu icon below:</Text>

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
    </Center>
  </Container>
</template>
