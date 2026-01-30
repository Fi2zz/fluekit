import { EdgeInsets } from "./EdgeInsets";
import { Clip } from "./Clip";
export type ScrollablePhysics = "bouncing" | "clamping" | "never" | "always";
export interface ScrollableProps {
  /** 滚动方向 */
  scrollDirection?: "vertical" | "horizontal";
  /** 内边距 */
  padding?: EdgeInsets;
  /** 物理滚动效果模拟（主要影响 CSS overflow 行为） */
  physics?: ScrollablePhysics;
  /** 裁剪行为 */
  clipBehavior?: Clip;
  /** 是否反向滚动 (暂未完全实现，预留接口) */
  reverse?: boolean;
  /** 是否根据内容收缩 */
  shrinkWrap?: boolean;
}

export interface ListViewProps extends ScrollableProps {
  shrinkWrap?: boolean;
  itemCount?: number;
  itemExtent?: number;
  separator?: boolean;
  // 是否启用分隔符
  onRefresh?: () => Promise<void>;
}

export interface GridViewProps extends ScrollableProps {
  // Grid 专有属性
  crossAxisCount?: number; // 列数 (垂直滚动时)
  mainAxisSpacing?: number; // 主轴间距
  crossAxisSpacing?: number; // 交叉轴间距
  childAspectRatio?: number; // 子元素宽高比
  itemCount?: number;
}
