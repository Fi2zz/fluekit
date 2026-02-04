export const isBrowser = typeof navigator !== "undefined";
export const isClient = typeof window !== "undefined" && typeof document !== "undefined";
export const userAgent = isBrowser ? navigator.userAgent : "";
export const isAndroid = /Android/i.test(userAgent);
export const isHarmonyOS = /HarmonyOS/i.test(userAgent);
export const isIPad =
  /iPad/i.test(userAgent) ||
  (/Macintosh/i.test(userAgent) && isBrowser && navigator.maxTouchPoints > 1);

export const isIOS = /iPhone|iPod/i.test(userAgent) || isIPad;
export const isMacOS = /Macintosh/i.test(userAgent) && !isIPad;

const uaHasMobile = /Mobile/i.test(userAgent);
const isIPhone = /iPhone|iPod/i.test(userAgent);
const isAndroidPhone = isAndroid && uaHasMobile;
const isAndroidTablet = isAndroid && !uaHasMobile;

export const checkMobile = () => {
  if (!isBrowser) return false;
  return (
    isAndroid ||
    isIOS ||
    isHarmonyOS ||
    /webOS|BlackBerry|Opera Mini/i.test(userAgent) ||
    (/Edg/i.test(userAgent) && /Mobile/i.test(userAgent))
  );
};

export const isMobile = checkMobile();

export type DeviceType = "phone" | "tablet" | "desktop";

export function getDeviceType(): DeviceType {
  if (!isBrowser) return "desktop";
  if (isIPhone || isAndroidPhone || (/Edg/i.test(userAgent) && /Mobile/i.test(userAgent)))
    return "phone";
  if (isIPad || isAndroidTablet) return "tablet";
  const w = typeof window !== "undefined" ? window.innerWidth : 0;
  if (w >= 1024) return "desktop";
  if (w >= 600) return "tablet";
  return "phone";
}

export const isPhone = getDeviceType() === "phone";
export const isTablet = getDeviceType() === "tablet";
export const isDesktop = getDeviceType() === "desktop";
