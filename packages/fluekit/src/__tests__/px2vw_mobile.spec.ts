import { describe, it, expect, vi, afterEach } from "vitest";

// We need to reload the module to reset the top-level variable execution
// So we use vi.doMock
describe("px2vw mobile detection", () => {
  afterEach(() => {
    vi.resetModules();
    vi.unstubAllGlobals();
  });

  it("should disable transform on desktop (no navigator or non-mobile UA)", async () => {
    // Mock navigator to be desktop
    vi.stubGlobal("navigator", {
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
    });

    // Re-import the module
    const { px2vw, setTransform } = await import("../px2vw");

    // Default should be false (desktop)
    expect(px2vw(750)).toBe("750px");

    // Unless we force it
    setTransform(true);
    expect(px2vw(750)).toBe("100vw");
  });

  it("should enable transform on mobile", async () => {
    // Mock navigator to be mobile
    vi.stubGlobal("navigator", {
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
    });

    // Re-import the module
    const { px2vw } = await import("../px2vw");

    // Default should be true (mobile)
    expect(px2vw(750)).toBe("100vw");
  });
});
