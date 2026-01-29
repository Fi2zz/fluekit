import { CSSProperties, computed, onMounted, ref } from "vue";
import { px2vw } from "./px2vw";
import { sizeToStyle, SizeType } from "./Size";

const zIndexManager = {
  current: 2000,
  next() {
    return ++this.current;
  },
};

export function useZIndex() {
  return zIndexManager.next();
}

export interface Props {
  /** 距离顶部的距离 */
  top?: number | string;
  /** 距离底部的距离 */
  bottom?: number | string;
  /** 距离左侧的距离 */
  left?: number | string;
  /** 距离右侧的距离 */
  right?: number | string;
  /** 宽度 */
  width?: number | string;
  /** 高度 */
  height?: number | string;
  /** z-index 层级 (如果不传会自动计算) */
  zIndex?: number | string;
  /** 距离四周的距离 */
  inset?: number | string;
  size?: SizeType;
}
export function usePositionStyle(
  props: Props,
  position: "absolute" | "fixed" | "sticky" | "relative" = "absolute",
) {
  const autoZIndex = ref<number>();
  onMounted(() => (autoZIndex.value = zIndexManager.next()));
  return computed(() => {
    const style: CSSProperties = {
      position,
      boxSizing: "border-box",
      zIndex: props.zIndex ?? autoZIndex.value,
    };

    if (props.size !== undefined) {
      Object.assign(style, sizeToStyle(props.size));
    } else {
      style.width = px2vw(props.width);
      style.height = px2vw(props.height);
    }
    const inset = props.inset;
    if (typeof inset !== "undefined" && inset !== null) {
      if (typeof inset == "number") {
        style.top = px2vw(inset);
        style.bottom = px2vw(inset);
        style.left = px2vw(inset);
        style.right = px2vw(inset);
        return style;
      }
      if (typeof inset == "string") {
        Object.assign(style, insetToStyle(inset));
      }
    } else {
      style.top = px2vw(props.top);
      style.bottom = px2vw(props.bottom);
      style.left = px2vw(props.left);
      style.right = px2vw(props.right);
    }
    return style;
  });
}

function insetToStyle(insetValue: string) {
  if (!insetValue) return {};
  // 标准化：去除多余空格，拆分为数组
  const values = insetValue.toString().trim().split(/\s+/);
  // 根据值的数量映射到四边
  const [top, right, bottom, left] = (() => {
    switch (values.length) {
      case 1:
        // inset: 10px → 10px 10px 10px 10px
        return [values[0], values[0], values[0], values[0]];
      case 2:
        // inset: 10px 20px → 10px 20px 10px 20px
        return [values[0], values[1], values[0], values[1]];
      case 3:
        // inset: 10px 20px 30px → 10px 20px 30px 20px
        return [values[0], values[1], values[2], values[1]];
      case 4:
        // inset: 10px 20px 30px 40px → 10px 20px 30px 40px
        return values;

      default:
        [undefined, undefined, undefined, undefined] as unknown as string[];
    }
  })() as string[];
  return { top: px2vw(top), right: px2vw(right), bottom: px2vw(bottom), left: px2vw(left) };
}
