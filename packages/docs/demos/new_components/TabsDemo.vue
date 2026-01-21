<script setup lang="ts">
import { Center, Colors, Column, Container, TabBar, TabBarView, Text } from "fluekit";
import { h, ref } from "vue";

const activeIndex = ref(0);

// Simple Icons
const HomeIcon = {
  render: () =>
    h("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "20", height: "20" }, [
      h("path", { d: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" }),
    ]),
};

const SettingsIcon = {
  render: () =>
    h("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "20", height: "20" }, [
      h("path", {
        d: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.58 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
      }),
    ]),
};

const tabs = [
  { text: "Home", icon: HomeIcon },
  { text: "Settings", icon: SettingsIcon },
  "Profile",
];
</script>

<template>
  <Container height="300" :border="{ width: 1, color: '#eee' }" width="100%">
    <Column expanded>
      <TabBar v-model="activeIndex" :tabs="tabs" />

      <TabBarView v-model="activeIndex">
        <!-- Tab 1 Content -->
        <Container :color="Colors.blue100" height="100%">
          <Center>
            <Text>Home Content</Text>
          </Center>
        </Container>

        <!-- Tab 2 Content -->
        <Container :color="Colors.green100" height="100%">
          <Center>
            <Text>Settings Content</Text>
          </Center>
        </Container>

        <!-- Tab 3 Content -->
        <Container :color="Colors.orange100" height="100%">
          <Center>
            <Text>Profile Content</Text>
          </Center>
        </Container>
      </TabBarView>
    </Column>
  </Container>
</template>
