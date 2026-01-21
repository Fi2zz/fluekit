# RefreshIndicator

A widget that supports the Material "swipe to refresh" idiom.

## Usage

When wrapping a `ListView`, you can use the `onRefresh` prop on `ListView` directly, or wrap any scrollable content with `RefreshIndicator`.

<script setup>
import RefreshIndicatorDemo from '../demos/new_components/RefreshIndicatorDemo.vue'
</script>

<div class="demo-container">
  <RefreshIndicatorDemo />
</div>

## Code Example

```vue
<template>
  <Container height="400">
    <ListView :itemCount="items.length" :onRefresh="handleRefresh">
      <template #item="{ index }">
        <ListTile :title="items[index]" />
      </template>
    </ListView>
  </Container>
</template>

<script setup>
const handleRefresh = async () => {
  await fetchData();
};
</script>
```

## Props

| Prop            | Type                  | Default        | Description                                                              |
| --------------- | --------------------- | -------------- | ------------------------------------------------------------------------ |
| onRefresh       | `() => Promise<void>` | -              | A function that's called when the user pulls down the refresh indicator. |
| color           | `string \| Color`     | `Colors.blue`  | The progress indicator's foreground color.                               |
| backgroundColor | `string \| Color`     | `Colors.white` | The progress indicator's background color.                               |
| triggerDistance | `number`              | `100`          | The distance in pixels that the user must drag to trigger the refresh.   |
