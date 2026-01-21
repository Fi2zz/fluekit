<template>
  <Fixed v-if="visible" :z-index="9999" :top="0" :left="0" :right="0" :bottom="0">
    <GestureDetector @tap="onBarrierDismiss">
      <Container width="100%" height="100%" alignment="center" :color="barrierColor">
        <Container v-bind="dialogProps">
          <Container :alignment="titleAlignment" width="100%" v-if="title">
            <Text :style="dialogTitleStyle" :data="title" :text-align="titleTextAlign" />
          </Container>
          <slot>
            <Container
              :padding="
                isIOS
                  ? EdgeInsets.symmetric({ vertical: 2, horizontal: 16 })
                  : EdgeInsets.symmetric({ vertical: 16 })
              "
              :alignment="isIOS ? Alignment.center : Alignment.topLeft"
              width="100%"
            >
              <Text
                v-if="content"
                :style="dialogContentStyle"
                :data="content"
                :text-align="isIOS ? TextAlign.center : undefined"
              />
            </Container>
          </slot>
          <Container
            v-if="isIOS"
            width="100%"
            :decoration="iosActionsBorderDecoration"
            :margin="EdgeInsets.only({ top: 16 })"
          >
            <slot name="actions">
              <Row main-axis-alignment="center" expanded>
                <Expanded>
                  <GestureDetector @tap="close" behavior="opaque">
                    <Container width="100%" height="44" alignment="center">
                      <Text :style="iosActionTextStyle">{{ cancelText }}</Text>
                    </Container>
                  </GestureDetector>
                </Expanded>
                <Container width="0.5" height="44" color="rgba(60, 60, 67, 0.29)" />
                <Expanded>
                  <GestureDetector @tap="ok" behavior="opaque">
                    <Container width="100%" height="44" alignment="center">
                      <Text :style="iosActionTextStyleBold">{{ okText }}</Text>
                    </Container>
                  </GestureDetector>
                </Expanded>
              </Row>
            </slot>
          </Container>
          <Row
            v-else
            main-axis-size="max"
            :main-axis-alignment="actionsAlignment"
            cross-axis-alignment="center"
            :gap="8"
          >
            <slot name="actions">
              <Button @pressed="close">{{ cancelText }}</Button>
              <Button @pressed="ok">{{ okText }}</Button>
            </slot>
          </Row>
        </Container>
      </Container>
    </GestureDetector>
  </Fixed>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Container from "./Container.vue";
import Row from "./Row.vue";
import Text from "./Text.vue";
import Fixed from "./Fixed.vue";
import { Alignment } from "./Alignment";
import { FontWeight } from "./TextStyle";
import { EdgeInsets } from "./EdgeInsets";
import { BoxDecoration } from "./BoxDecoration";
import { BorderRadius } from "./BorderRadius";
import { Border } from "./Border";
import { BoxConstraints } from "./BoxConstraints";
import { Size } from "./Size";
import { TextStyle, TextAlign } from "./TextStyle";
import { MainAxisAlignment } from "./FlexProps";
import GestureDetector from "./GestureDetector.vue";
import Button from "./Button.vue";
import Expanded from "./Expanded.vue";
interface Props {
  visible: boolean;
  title?: string;
  content?: string;
  barrierDismissible?: boolean;
  alignment?: Alignment;
  barrierColor?: string;
  constraints?: BoxConstraints;
  decoration?: BoxDecoration;
  size?: Size;
  actionsAlignment?: MainAxisAlignment;
  titleAlignment?: Alignment;
  padding?: EdgeInsets;
  titleStyle?: TextStyle;
  titleColor?: string;
  titleFontSize?: number;
  variant?: "material" | "ios";
  okText?: string;
  cancelText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  barrierDismissible: true,
  alignment: Alignment.center,
  barrierColor: "rgba(0, 0, 0, 0.54)",
  actionsAlignment: MainAxisAlignment.end,
  variant: "material",
  okText: "OK",
  cancelText: "Cancel",
});

const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
  (e: "close"): void;
  (e: "ok"): void;
}>();
const close = () => {
  emit("update:visible", false);
  emit("close");
};
const ok = () => emit("ok");
const onBarrierDismiss = () => {
  if (props.barrierDismissible) {
    close();
  }
};

const isIOS = computed(() => props.variant === "ios");

const titleAlignment = computed(() => (isIOS.value ? Alignment.center : props.titleAlignment));

const titleTextAlign = computed(() => (isIOS.value ? TextAlign.center : undefined));

const dialogProps = computed(() => {
  if (isIOS.value) {
    return Object.assign(
      {},
      {
        padding: EdgeInsets.only({ top: 24, left: 0, right: 0 }), // iOS dialogs handle padding in content
        alignment: props.alignment,
        constraints: props.constraints || BoxConstraints({ maxWidth: 270 }), // iOS width is typically 270
        decoration:
          props.decoration ||
          BoxDecoration({
            color: "rgba(255, 255, 255, 0.85)", // Translucent white
            borderRadius: BorderRadius.circular(14),
          }),
        style: {
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        },
      },
      props.size ? Size(props.size) : {},
    );
  }

  return Object.assign(
    {},
    {
      padding: props.padding || EdgeInsets.all(24),
      alignment: props.alignment,
      constraints: props.constraints || BoxConstraints({ maxWidth: 400 }),
      decoration:
        props.decoration ||
        BoxDecoration({
          color: "white",
          borderRadius: BorderRadius.circular(4),
          boxShadow: [
            {
              color: "rgba(0,0,0,0.2)",
              blurRadius: 24,
              offset: { x: 0, y: 11 },
            },
          ],
        }),
    },
    props.size ? Size(props.size) : {},
  );
});

const dialogTitleStyle = computed(() => {
  if (isIOS.value) {
    return TextStyle(
      Object.assign(
        {
          fontSize: 17,
          fontWeight: FontWeight.w600,
          color: "#000000",
          fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        },
        props.titleStyle,
      ),
    );
  }
  return TextStyle(
    Object.assign(
      {
        fontSize: props.titleFontSize || 20,
        fontWeight: FontWeight.bold,
        color: props.titleColor || "rgba(0,0,0,0.87)",
      },
      props.titleStyle,
    ),
  );
});

const dialogContentStyle = computed(() => {
  if (isIOS.value) {
    return TextStyle({
      fontSize: 13,
      color: "#000000",
      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
    });
  }
  return TextStyle({
    fontSize: 16,
    color: "rgba(0,0,0,0.6)",
  });
});

const iosActionsBorderDecoration = computed(() => {
  return BoxDecoration({
    border: Border.only({
      top: {
        color: "rgba(60, 60, 67, 0.29)",
        width: 0.5,
        style: "solid",
      },
    }),
  });
});

const iosActionTextStyle = TextStyle({
  fontSize: 17,
  color: "#007AFF",
  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
});

const iosActionTextStyleBold = TextStyle({
  fontSize: 17,
  color: "#007AFF",
  fontWeight: FontWeight.w600,
  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
});
</script>
