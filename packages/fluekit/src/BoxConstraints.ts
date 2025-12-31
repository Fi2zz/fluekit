import { CSSProperties } from "vue";
import { px2vw } from "./px2vw";
import { isPlainObject } from "./utils";

// 定义唯一符号标记
const BOX_CONSTRAINTS_SYMBOL = Symbol("boxConstraints");

export interface BoxConstraintsProps {
  minWidth?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
}

export type BoxConstraints = BoxConstraintsProps & {
  [BOX_CONSTRAINTS_SYMBOL]?: true;
};

const toVal = (v: number | string) => (v === Infinity ? undefined : v);

export function BoxConstraints(props: BoxConstraintsProps = {}): BoxConstraints {
  const minWidth = props.minWidth ?? 0;
  const minHeight = props.minHeight ?? 0;
  const maxWidth = props.maxWidth ?? Infinity;
  const maxHeight = props.maxHeight ?? Infinity;

  // 如果都是数字，执行数学上的 max 逻辑；如果是字符串，我们没法简单比较，直接信任输入
  // 这里简化逻辑：如果是数字才做 max 保护
  // 但为了支持字符串（如 '100%' 或 '100px'），我们不能轻易使用 Math.max

  // 实际上 Flutter 的 BoxConstraints 核心是 min/max w/h。
  // 如果用户传了字符串，我们应该直接透传，不做数值比较。

  return {
    minWidth: toVal(minWidth),
    maxWidth: toVal(maxWidth),
    minHeight: toVal(minHeight),
    maxHeight: toVal(maxHeight),
    [BOX_CONSTRAINTS_SYMBOL]: true as const,
  };
}

// Static methods for Flutter-like API
BoxConstraints.tight = (size: { width: number; height: number }) =>
  BoxConstraints({
    minWidth: size.width,
    maxWidth: size.width,
    minHeight: size.height,
    maxHeight: size.height,
  });

BoxConstraints.loose = (size: { width: number; height: number }) =>
  BoxConstraints({
    minWidth: 0,
    maxWidth: size.width,
    minHeight: 0,
    maxHeight: size.height,
  });

BoxConstraints.expand = ({
  width,
  height,
}: {
  width?: number;
  height?: number;
} = {}) =>
  BoxConstraints({
    minWidth: width ?? Infinity,
    maxWidth: width ?? Infinity,
    minHeight: height ?? Infinity,
    maxHeight: height ?? Infinity,
  });

/**
 * 类型守卫：检查对象是否通过 BoxConstraints 创建
 */
export function isBoxConstraints(value: any): value is BoxConstraints {
  if (!isPlainObject(value)) return false;
  return BOX_CONSTRAINTS_SYMBOL in value;
}

export function boxConstraintsToStyle(constraints?: BoxConstraintsProps): CSSProperties {
  const constraintsType = constraints ?? {};

  return {
    minWidth: px2vw(constraintsType.minWidth),
    maxWidth: px2vw(constraintsType.maxWidth),
    minHeight: px2vw(constraintsType.minHeight),
    maxHeight: px2vw(constraintsType.maxHeight),
  };
}
