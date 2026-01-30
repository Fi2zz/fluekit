import { describe, it, expect, vi, afterEach } from "vitest";

describe("device detection", () => {
  afterEach(() => {
    vi.resetModules();
    vi.unstubAllGlobals();
  });

  it("detects iPhone as phone", async () => {
    vi.stubGlobal("navigator", {
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
      maxTouchPoints: 5,
    });
    const { getDeviceType, isPhone, isTablet, isDesktop } = await import("../device");
    expect(getDeviceType()).toBe("phone");
    expect(isPhone).toBe(true);
    expect(isTablet).toBe(false);
    expect(isDesktop).toBe(false);
  });

  it("detects iPad as tablet", async () => {
    vi.stubGlobal("navigator", {
      userAgent:
        "Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
      maxTouchPoints: 5,
    });
    const { getDeviceType, isTablet } = await import("../device");
    expect(getDeviceType()).toBe("tablet");
    expect(isTablet).toBe(true);
  });

  it("detects Android Mobile as phone", async () => {
    vi.stubGlobal("navigator", {
      userAgent:
        "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.58 Mobile Safari/537.36",
      maxTouchPoints: 5,
    });
    const { getDeviceType } = await import("../device");
    expect(getDeviceType()).toBe("phone");
  });

  it("detects Android Tablet as tablet", async () => {
    vi.stubGlobal("navigator", {
      userAgent:
        "Mozilla/5.0 (Linux; Android 11; Pixel C) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.58 Safari/537.36",
      maxTouchPoints: 5,
    });
    const { getDeviceType } = await import("../device");
    expect(getDeviceType()).toBe("tablet");
  });

  it("falls back to width for desktop", async () => {
    vi.stubGlobal("navigator", {
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      maxTouchPoints: 0,
    });
    Object.defineProperty(globalThis, "innerWidth", { value: 1366, configurable: true });
    const { getDeviceType, isDesktop } = await import("../device");
    expect(getDeviceType()).toBe("desktop");
    expect(isDesktop).toBe(true);
  });
});
