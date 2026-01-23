export interface Keyframe {
  [key: string]: string | number;
  //@ts-expect-error override
  offset?: number; // 0 to 1
}

export type AnimationDirection = "normal" | "reverse" | "alternate" | "alternate-reverse";
export type AnimationFillMode = "none" | "forwards" | "backwards" | "both";
export type AnimationPlayState = "running" | "paused";

export interface AnimationOptions {
  name: string; // keyframes name
  duration?: number; // in ms
  timingFunction?: string; // linear, ease, ease-in, etc.
  delay?: number; // in ms
  iterationCount?: number | "infinite";
  direction?: AnimationDirection;
  fillMode?: AnimationFillMode;
  playState?: AnimationPlayState;
}
export const Animator = (options: AnimationOptions) => options;

export function animationToStyle(animation?: AnimationOptions): { animation?: string } {
  if (!animation) return {};

  const {
    name,
    duration = 1000,
    timingFunction = "ease",
    delay = 0,
    iterationCount = 1,
    direction = "normal",
    fillMode = "none",
    playState = "running",
  } = animation;

  return {
    animation: `${name} ${duration}ms ${timingFunction} ${delay}ms ${iterationCount} ${direction} ${fillMode} ${playState}`,
  };
}

// Helper to inject keyframes into a style tag
export function registerKeyframes(name: string, keyframes: Keyframe[]) {
  if (typeof document === "undefined") return;

  const styleId = `fluekit-keyframes-${name}`;
  if (document.getElementById(styleId)) return;

  const style = document.createElement("style");
  style.id = styleId;

  let keyframeStr = `@keyframes ${name} {`;

  keyframes.forEach((frame) => {
    // If offset is provided, use it as percentage.
    // Otherwise we might assume equal distribution or user uses "from", "to", "0%", "100%" as keys if we changed the type.
    // But CSS Web Animations API uses offset.
    // CSS @keyframes uses percentage selector.

    // Let's support a simple object where keys are "0%", "100%", "from", "to" OR use offset property if array.
    // If input is array of Keyframe objects with offset:
    if (frame.offset !== undefined) {
      const percentage = Math.round(frame.offset * 100) + "%";
      const props = Object.entries(frame)
        .filter(([k]) => k !== "offset")
        .map(([k, v]) => `${kebabCase(k)}: ${v};`)
        .join(" ");
      keyframeStr += `${percentage} { ${props} } `;
    } else {
      // If no offset, we might not be able to infer easily without index.
      // Let's rely on user passing standard object if they want standard behavior?
      // Or assume user passes valid keyframe object.
      // Actually, for simplicity in Vue, maybe we just accept a CSS string or an object map?
    }
  });

  keyframeStr += `}`;
  style.textContent = keyframeStr;
  document.head.appendChild(style);
}

// A simpler version that takes a Record<string, Properties>
export function defineKeyframes(
  name: string,
  frames: Record<string, Record<string, string | number>>,
) {
  if (typeof document === "undefined") return;

  const styleId = `fluekit-keyframes-${name}`;
  if (document.getElementById(styleId)) return;

  const style = document.createElement("style");
  style.id = styleId;

  let css = `@keyframes ${name} {`;
  for (const [selector, props] of Object.entries(frames)) {
    css += `${selector} {`;
    for (const [prop, val] of Object.entries(props)) {
      css += `${kebabCase(prop)}: ${val};`;
    }
    css += `}`;
  }
  css += `}`;

  style.textContent = css;
  document.head.appendChild(style);
}

function kebabCase(str: string) {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
