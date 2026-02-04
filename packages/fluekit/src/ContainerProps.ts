import type { BoxConstraints } from "./BoxConstraints";
// 引入 BoxDecoration 类型与背景图构造工具
import { Alignment } from "./Alignment";
import { BoxDecoration, Clip } from "./BoxDecoration";
import { Color } from "./Color";
import type { EdgeInsets } from "./EdgeInsets";
export interface ContainerProps {
  width?: number | string;
  height?: number | string;
  padding?: EdgeInsets;
  margin?: EdgeInsets;
  decoration?: BoxDecoration;
  foregroundDecoration?: BoxDecoration;
  color?: string | Color;
  alignment?: Alignment;
  clipBehavior?: Clip;
  transform?: string;
  transformAlignment?: Alignment;
  constraints?: BoxConstraints;
  // Flex 布局属性
  flex?: number | string;
}
