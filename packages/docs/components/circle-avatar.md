# CircleAvatar

A circle that represents a user.

Typically used with a user's profile image, or, in the absence of such an image, the user's initials.

## Usage

<script setup>
import CircleAvatarDemo from '../demos/new_components/CircleAvatarDemo.vue'
</script>

<div class="demo-container">
  <CircleAvatarDemo />
</div>

## Code Example

```vue
<template>
  <Row :gap="20">
    <CircleAvatar backgroundImage="https://example.com/avatar.jpg" />

    <CircleAvatar backgroundColor="blue" foregroundColor="white">
      <Text>AB</Text>
    </CircleAvatar>
  </Row>
</template>
```

## Props

| Prop            | Type              | Default            | Description                                 |
| --------------- | ----------------- | ------------------ | ------------------------------------------- |
| backgroundImage | `string`          | -                  | The background image of the circle.         |
| backgroundColor | `string \| Color` | `Colors.grey[400]` | The background color.                       |
| foregroundColor | `string \| Color` | `Colors.white`     | The default text color for children.        |
| radius          | `number`          | `20`               | The size of the avatar (half the diameter). |
| minRadius       | `number`          | -                  | The minimum size of the avatar.             |
| maxRadius       | `number`          | -                  | The maximum size of the avatar.             |

## Slots

| Name    | Description                              |
| ------- | ---------------------------------------- |
| default | The child widget (usually text or icon). |
