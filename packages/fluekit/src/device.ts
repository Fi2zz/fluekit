export const isBrowser = typeof navigator !== "undefined";

export const userAgent = isBrowser ? navigator.userAgent : "";

export const isAndroid = /Android/i.test(userAgent);

export const isHarmonyOS = /HarmonyOS/i.test(userAgent);

export const isIPad =
  /iPad/i.test(userAgent) ||
  (/Macintosh/i.test(userAgent) && isBrowser && navigator.maxTouchPoints > 1);

export const isIOS = /iPhone|iPod/i.test(userAgent) || isIPad;

export const isMacOS = /Macintosh/i.test(userAgent) && !isIPad;

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
