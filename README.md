# FlueKit

<p align="center">
  **FlueKit** (Fluent Layouts for Vue) - A Vue 3 library bringing Flutter's layout paradigm and widget system to the web.
</p>

---

## 📖 Introduction

**FlueKit** allows developers to build Vue applications using the intuitive and powerful widgets found in Flutter. Say goodbye to complex CSS for basic layouts and hello to declarative, composable widgets like `Container`, `Row`, `Column`, `Stack`, `ListView`, and more.

It aims to provide a **pixel-perfect** translation of Flutter's behavior to the web, including layout constraints, painting, and interaction models.

## ✨ Features

- **Layout Widgets**: `Container`, `Row`, `Column`, `Stack`, `Center`, `SizedBox`, `Expanded`, `Flexible`, `Spacer`, `AspectRatio`, `ConstrainedBox`, `ScrollView`, `ListView`, `GridView`.
- **Material & Cupertino Colors**: Full `Colors` and `CupertinoColors` palettes with manipulation methods (`withOpacity`, `lighten`, `darken`, `computeLuminance`).
- **Styling Objects**: Flutter-like `EdgeInsets`, `BorderRadius`, `BoxDecoration`, `TextStyle`, `BoxConstraints`.
- **UI Components**: `Text`, `Icon`, `Button`, `Card`, `Scaffold`, `AppBar`.
- **Interactions**: `GestureDetector`, `InkWell`.

## 📦 Using FlueKit in Your Project

To use `fluekit` in your own Vue 3 application:

```bash
pnpm add fluekit
```

### Example

```vue
<script setup>
import {
  Container,
  Center,
  Text,
  Column,
  Colors,
  EdgeInsets,
  BorderRadius,
  BoxDecoration,
  AspectRatio,
} from "fluekit";
</script>

<template>
  <Center>
    <AspectRatio :aspect-ratio="16 / 9">
      <Container
        :margin="EdgeInsets.all(20)"
        :padding="EdgeInsets.symmetric({ vertical: 16, horizontal: 24 })"
        :decoration="
          BoxDecoration({
            color: Colors.blue,
            borderRadius: BorderRadius.circular(12),
            boxShadow: [
              {
                color: Colors.black.withOpacity(0.2),
                blurRadius: 10,
                offset: { dx: 0, dy: 4 },
              },
            ],
          })
        "
      >
        <Column mainAxisAlignment="center" crossAxisAlignment="center">
          <Text
            data="Hello FlueKit"
            :style="{
              color: Colors.white,
              fontSize: 24,
              fontWeight: 'bold',
            }"
          />
          <Text
            data="Flutter-like development in Vue"
            :style="{
              color: Colors.white.withOpacity(0.8),
              fontSize: 16,
            }"
          />
        </Column>
      </Container>
    </AspectRatio>
  </Center>
</template>
```

## 📦 Project Structure

This project is a Monorepo containing:

- **`packages/fluekit`**: The core library source code.
- **`packages/docs`**: The documentation site (VitePress).

## 🚀 Quick Start for Development

### Prerequisites

- Node.js (v20+)
- pnpm (v10+)

### Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    make install
    # or
    pnpm install
    ```

### Common Commands (Makefile)

This project uses a `Makefile` to simplify development workflows.

- **Start Documentation Dev Server**:

  ```bash
  make dev
  ```

  Starts the VitePress dev server for local documentation writing and component testing.

- **Build Project**:

  ```bash
  make build
  ```

  Builds both the library and the documentation.

- **Run Tests**:

  ```bash
  make test
  ```

  Runs unit tests using Vitest.

- **Lint & Format**:
  ```bash
  make lint
  make format
  ```

## 📚 Documentation

Detailed documentation and examples are available in the `packages/docs` directory or deployed via GitHub Pages.

- **Online Documentation**: [https://fi2zz.github.io/fluekit/](https://fi2zz.github.io/fluekit/)
- **Source Code**: [packages/docs](packages/docs)

## 📄 License

MIT
