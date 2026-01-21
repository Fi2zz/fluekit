# Effects

## Opacity

A widget that makes its child partially transparent.

<script setup>
import Opacity from '@example/demos/effect/Opacity.vue'
import IgnorePointer from '@example/demos/effect/IgnorePointer.vue'
import SafeArea from '@example/demos/effect/SafeArea.vue'
import TransformDemo from '@example/demos/effect/TransformDemo.vue'
import BackdropFilterDemo from '@example/demos/effect/BackdropFilterDemo.vue'
</script>

<div class="demo-box">
  <Opacity />
</div>

<<< ../demos/effect/Opacity.vue

## Transform

A widget that applies a transformation before painting its child.

<div class="demo-box">
  <TransformDemo />
</div>

<<< ../demos/effect/TransformDemo.vue

## IgnorePointer

A widget that is invisible during hit testing.

<div class="demo-box">
  <IgnorePointer />
</div>

<<< ../demos/effect/IgnorePointer.vue

## SafeArea

A widget that insets its child by sufficient padding to avoid operating system intrusions (e.g. notch).

<div class="demo-box">
  <SafeArea />
</div>

<<< ../demos/effect/SafeArea.vue

## BackdropFilter

A widget that applies a filter to the existing painted content and then paints the child.
This effect is relatively expensive, especially if the filter is non-local, such as a blur.

<div class="demo-box">
  <BackdropFilterDemo />
</div>

<<< ../demos/effect/BackdropFilterDemo.vue

## API

### Opacity

#### Props

| Name      | Type     | Default | Description                                    |
| :-------- | :------- | :------ | :--------------------------------------------- |
| `opacity` | `number` | `1.0`   | The fraction to scale the child's alpha value. |

#### Slots

| Name      | Description                               |
| :-------- | :---------------------------------------- |
| `default` | The widget below this widget in the tree. |

### Transform

#### Props

| Name        | Type        | Default    | Description                                                                              |
| :---------- | :---------- | :--------- | :--------------------------------------------------------------------------------------- |
| `transform` | `string`    | -          | The transformation matrix to apply (CSS transform).                                      |
| `alignment` | `Alignment` | `'center'` | The alignment of the origin of the coordinate system in which the transform takes place. |
| `origin`    | `string`    | -          | The origin of the coordinate system (CSS transform-origin).                              |

#### Slots

| Name      | Description                               |
| :-------- | :---------------------------------------- |
| `default` | The widget below this widget in the tree. |

### IgnorePointer

#### Props

| Name                | Type      | Default | Description                                    |
| :------------------ | :-------- | :------ | :--------------------------------------------- |
| `ignoring`          | `boolean` | `false` | Whether this widget ignores pointer events.    |
| `ignoringSemantics` | `boolean` | `false` | Whether this widget is invisible to semantics. |

#### Slots

| Name      | Description                               |
| :-------- | :---------------------------------------- |
| `default` | The widget below this widget in the tree. |

### SafeArea

#### Props

| Name      | Type         | Default           | Description                                       |
| :-------- | :----------- | :---------------- | :------------------------------------------------ |
| `top`     | `boolean`    | `true`            | Whether to avoid system intrusions at the top.    |
| `bottom`  | `boolean`    | `true`            | Whether to avoid system intrusions at the bottom. |
| `left`    | `boolean`    | `true`            | Whether to avoid system intrusions on the left.   |
| `right`   | `boolean`    | `true`            | Whether to avoid system intrusions on the right.  |
| `minimum` | `EdgeInsets` | `EdgeInsets.zero` | The minimum padding to apply.                     |

#### Slots

| Name      | Description                               |
| :-------- | :---------------------------------------- |
| `default` | The widget below this widget in the tree. |

### BackdropFilter

#### Props

| Name     | Type                    | Default | Description                                                |
| :------- | :---------------------- | :------ | :--------------------------------------------------------- |
| `filter` | `ImageFilter \| string` | -       | The image filter to apply to the existing painted content. |

#### Slots

| Name      | Description                               |
| :-------- | :---------------------------------------- |
| `default` | The widget below this widget in the tree. |
