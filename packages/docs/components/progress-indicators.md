# Progress Indicators

Material Design progress indicators and Cupertino (iOS-style) activity indicator.

## Usage

<script setup>
import ProgressDemo from '@example/demos/components/ProgressDemo.vue'
</script>

<div class="demo-box">
  <ProgressDemo />
</div>

<<< ../demos/components/ProgressDemo.vue

## Components

### LinearProgressIndicator

A material design linear progress indicator.

**Props:**

| Prop            | Type              | Default            | Description                                                                           |
| --------------- | ----------------- | ------------------ | ------------------------------------------------------------------------------------- |
| value           | `number \| null`  | `null`             | The value of the progress (0.0 to 1.0). If null, it shows an indeterminate animation. |
| color           | `Color \| string` | `Colors.blue`      | The progress color.                                                                   |
| backgroundColor | `Color \| string` | `Colors.blue[200]` | The background track color.                                                           |
| minHeight       | `number`          | `4`                | The height of the bar.                                                                |

### CircularProgressIndicator

A material design circular progress indicator.

**Props:**

| Prop            | Type              | Default       | Description                                                                           |
| --------------- | ----------------- | ------------- | ------------------------------------------------------------------------------------- |
| value           | `number \| null`  | `null`        | The value of the progress (0.0 to 1.0). If null, it shows an indeterminate animation. |
| color           | `Color \| string` | `Colors.blue` | The progress color.                                                                   |
| backgroundColor | `Color \| string` | `undefined`   | The background track color.                                                           |
| strokeWidth     | `number`          | `4`           | The width of the circle line.                                                         |
| size            | `number`          | `36`          | The diameter of the circle.                                                           |

### CupertinoActivityIndicator

An iOS-style activity indicator.

**Props:**

| Prop      | Type              | Default                      | Description                      |
| --------- | ----------------- | ---------------------------- | -------------------------------- |
| animating | `boolean`         | `true`                       | Whether to run the animation.    |
| color     | `Color \| string` | `CupertinoColors.systemGrey` | The color of the spinner blades. |
| radius    | `number`          | `10`                         | The radius of the spinner.       |
