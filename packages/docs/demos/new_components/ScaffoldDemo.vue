<template>
  <div class="demo-container" style="height: 600px; border: 1px solid #eee">
    <div style="margin-bottom: 10px; text-align: center">
      <Button @click="isIOS = !isIOS">
        <Text>Switch to {{ isIOS ? "Material" : "iOS" }} Style</Text>
      </Button>
    </div>

    <!-- iOS Style -->
    <CupertinoPageScaffold v-if="isIOS">
      <template #navigationBar>
        <CupertinoNavigationBar middle="iOS Scaffold">
          <template #leading>
            <Button @click="console.log('Back')">
              <Text :style="{ color: '#007AFF', fontSize: 17 }">Back</Text>
            </Button>
          </template>
          <template #trailing>
            <Button @click="console.log('Edit')">
              <Text :style="{ color: '#007AFF', fontSize: 17 }">Edit</Text>
            </Button>
          </template>
        </CupertinoNavigationBar>
      </template>
      <template #body>
        <ListView :padding="EdgeInsets.all(16)">
          <Container
            v-for="i in 20"
            :key="i"
            :height="44"
            color="white"
            :margin="EdgeInsets.only({ bottom: 1 })"
            alignment="centerLeft"
            :padding="EdgeInsets.symmetric({ horizontal: 16 })"
          >
            <Row cross-axis-alignment="center" width="100%">
              <Text>iOS Item {{ i }}</Text>
              <Spacer />
              <Text :style="{ color: '#999' }">Details</Text>
            </Row>
          </Container>
        </ListView>
      </template>
    </CupertinoPageScaffold>

    <!-- Material Style -->
    <Scaffold v-else background-color="#f5f5f5">
      <template #appBar>
        <AppBar title="Scaffold Demo" center-title :elevation="2">
          <template #leading>
            <Button @click="console.log('Menu')">
              <div class="icon">☰</div>
            </Button>
          </template>
          <template #actions>
            <Button @click="console.log('Search')">
              <div class="icon">🔍</div>
            </Button>
            <Button @click="console.log('More')">
              <div class="icon">⋮</div>
            </Button>
          </template>
        </AppBar>
      </template>

      <template #body>
        <ListView :padding="EdgeInsets.all(16)">
          <Container
            v-for="i in 20"
            :key="i"
            :height="80"
            color="white"
            :margin="EdgeInsets.only({ bottom: 16 })"
            :decoration="itemDecoration"
            alignment="center"
          >
            <Text>Item {{ i }}</Text>
          </Container>
        </ListView>
      </template>

      <template #floatingActionButton>
        <Container
          :width="56"
          :height="56"
          :decoration="fabDecoration"
          alignment="center"
          @click="console.log('FAB Clicked')"
        >
          <Text :style="fabTextStyle">+</Text>
        </Container>
      </template>

      <template #bottomNavigationBar>
        <Container :height="56" color="white" :decoration="bottomNavDecoration">
          <Row main-axis-alignment="space-around" cross-axis-alignment="center" expanded>
            <Column main-axis-alignment="center" cross-axis-alignment="center">
              <div class="icon">🏠</div>
              <Text :style="navLabelStyle">Home</Text>
            </Column>
            <Column main-axis-alignment="center" cross-axis-alignment="center">
              <div class="icon">💼</div>
              <Text :style="navLabelStyle">Work</Text>
            </Column>
            <Column main-axis-alignment="center" cross-axis-alignment="center">
              <div class="icon">👤</div>
              <Text :style="navLabelStyle">Profile</Text>
            </Column>
          </Row>
        </Container>
      </template>
    </Scaffold>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  Scaffold,
  AppBar,
  CupertinoPageScaffold,
  CupertinoNavigationBar,
  ListView,
  Container,
  Text,
  Button,
  EdgeInsets,
  BoxDecoration,
  BorderRadius,
  BoxShadow,
  BoxShape,
  TextStyle,
  FontWeight,
  Row,
  Column,
  Spacer,
} from "fluekit";

const isIOS = ref(false);

const itemDecoration = BoxDecoration({
  borderRadius: BorderRadius.circular(8),
  boxShadow: [
    BoxShadow({
      color: "rgba(0,0,0,0.05)",
      blurRadius: 4,
      offset: { x: 0, y: 2 },
    }),
  ],
});

const fabDecoration = BoxDecoration({
  color: "#FF4081",
  shape: BoxShape.circle,
  boxShadow: [
    BoxShadow({
      color: "rgba(0,0,0,0.3)",
      blurRadius: 6,
      offset: { x: 0, y: 3 },
    }),
  ],
});

const fabTextStyle = TextStyle({
  color: "white",
  fontSize: 24,
  fontWeight: FontWeight.bold,
});

const bottomNavDecoration = BoxDecoration({
  boxShadow: [
    BoxShadow({
      color: "rgba(0,0,0,0.1)",
      blurRadius: 4,
      offset: { x: 0, y: -2 },
    }),
  ],
});

const navLabelStyle = TextStyle({
  fontSize: 12,
  color: "#666",
});
</script>

<style scoped>
.icon {
  font-size: 20px;
  cursor: pointer;
}
</style>
