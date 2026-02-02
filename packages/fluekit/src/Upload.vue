<template>
  <div :style="containerStyle">
    <div @click="handleClick" :style="triggerStyle">
      <slot />
    </div>
    <input
      ref="inputRef"
      type="file"
      :name="name"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      style="display: none"
      @change="handleInputChange"
    />
    <slot name="tip" />
    <Column v-if="showFileList" :gap="8" :style="{ marginTop: '8px' }">
      <Row
        v-for="file in fileList"
        :key="file.uid"
        main-axis-alignment="space-between"
        cross-axis-alignment="center"
        :style="fileItemStyle"
      >
        <Row :gap="8" cross-axis-alignment="center" :style="{ flex: 1, overflow: 'hidden' }">
          <Icon :icon="Icons.document" size="16" color="#999" />
          <Text :style="fileNameStyle" :max-lines="1" :overflow="TextOverflow.ellipsis">
            {{ file.name }}
          </Text>
        </Row>
        <Row :gap="8" cross-axis-alignment="center">
          <Text v-if="file.status === 'uploading'" color="#999" size="12">
            {{ file.progress ? Math.round(file.progress) + "%" : "..." }}
          </Text>
          <Icon
            v-if="file.status === 'success'"
            :icon="Icons.checkCircle"
            size="16"
            color="#52c41a"
          />
          <Icon v-if="file.status === 'fail'" :icon="Icons.warning" size="16" color="#ff4d4f" />
          <GestureDetector @tap="() => handleRemove(file)">
            <Icon :icon="Icons.close" size="16" color="#999" />
          </GestureDetector>
        </Row>
      </Row>
    </Column>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type CSSProperties } from "vue";
import Column from "./Column.vue";
import Row from "./Row.vue";
import Text from "./Text.vue";
import Icon from "./Icon.vue";
import GestureDetector from "./GestureDetector.vue";
import { Icons } from "./Icons";
import { useStyles } from "./StyleProvider";
import type { UploadFile } from "./UploadTypes";
import { TextOverflow, TextStyle } from "./TextStyle";

defineOptions({ inheritAttrs: false });

interface Props {
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  name?: string;
  maxCount?: number;
  showFileList?: boolean;
  request?: (file: UploadFile) => Promise<any>;
  validate?: (file: File) => boolean | Promise<boolean>;
}

const props = withDefaults(defineProps<Props>(), {
  name: "file",
  multiple: false,
  disabled: false,
  showFileList: true,
});

const fileList = defineModel<UploadFile[]>("fileList", { default: () => [] });

const emit = defineEmits<{
  (e: "change", files: UploadFile[]): void;
  (e: "remove", file: UploadFile): void;
  (e: "exceed"): void;
  (e: "error", error: Error, file: UploadFile): void;
  (e: "progress", event: ProgressEvent, file: UploadFile): void;
  (e: "success", response: any, file: UploadFile): void;
}>();

const inputRef = ref<HTMLInputElement>();
const _styles = useStyles();

const handleClick = () => {
  if (props.disabled) return;
  inputRef.value?.click();
};

const genId = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

const handleInputChange = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const rawFiles = target.files;
  if (!rawFiles) return;

  let files = Array.from(rawFiles);

  if (props.maxCount && fileList.value.length + files.length > props.maxCount) {
    emit("exceed");
    target.value = "";
    return;
  }

  // Validate
  if (props.validate) {
    const validFiles: File[] = [];
    for (const file of files) {
      const isValid = await props.validate(file);
      if (isValid) {
        validFiles.push(file);
      }
    }
    files = validFiles;
  }

  const newUploadFiles: UploadFile[] = files.map((file) => ({
    uid: genId(),
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
    raw: file,
    status: "ready",
    progress: 0,
  }));

  if (props.multiple) {
    fileList.value = [...fileList.value, ...newUploadFiles];
  } else {
    fileList.value = newUploadFiles;
  }

  emit("change", fileList.value);

  // Trigger request
  if (props.request) {
    newUploadFiles.forEach((file) => upload(file));
  }

  target.value = "";
};

const handleRemove = (file: UploadFile) => {
  const index = fileList.value.indexOf(file);
  if (index !== -1) {
    fileList.value.splice(index, 1);
    emit("remove", file);
    emit("change", fileList.value);
  }
};

const upload = async (file: UploadFile) => {
  if (!props.request) return;

  file.status = "uploading";
  try {
    const response = await props.request(file);
    file.status = "success";
    file.progress = 100;
    file.response = response;
    emit("success", response, file);
  } catch (error: any) {
    file.status = "fail";
    file.error = error;
    emit("error", error, file);
  }
};

const containerStyle = computed(() => {
  const css: CSSProperties = {
    display: "inline-block",
    width: "100%",
  };
  Object.assign(css, _styles.value);
  return css;
});

const triggerStyle = computed<CSSProperties>(() => ({
  display: "inline-block",
  cursor: props.disabled ? "not-allowed" : "pointer",
}));

const fileItemStyle = computed<CSSProperties>(() => ({
  padding: "4px 8px",
  backgroundColor: "#f5f5f5",
  borderRadius: "4px",
}));

const fileNameStyle = computed(() =>
  TextStyle({
    fontSize: 14,
    color: "#333",
  }),
);
</script>
