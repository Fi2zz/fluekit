import { describe, it, expect } from "vitest";
import { normalizeSrc } from "../BoxDecoration";

describe("normalizeSrc", () => {
  it("should return empty string for null/undefined/empty input", () => {
    // @ts-ignore
    expect(normalizeSrc(null)).toBe("");
    // @ts-ignore
    expect(normalizeSrc(undefined)).toBe("");
    expect(normalizeSrc("")).toBe("");
  });

  it("should keep absolute URLs unchanged", () => {
    expect(normalizeSrc("http://example.com/img.png")).toBe("http://example.com/img.png");
    expect(normalizeSrc("https://example.com/img.png")).toBe("https://example.com/img.png");
    expect(normalizeSrc("//example.com/img.png")).toBe("//example.com/img.png");
    expect(normalizeSrc("file:///User/img.png")).toBe("file:///User/img.png");
  });

  it("should keep data and blob URIs unchanged", () => {
    expect(normalizeSrc("data:image/png;base64,xxxx")).toBe("data:image/png;base64,xxxx");
    expect(normalizeSrc("blob:http://example.com/xxxx")).toBe("blob:http://example.com/xxxx");
  });

  it("should keep CSS gradients unchanged", () => {
    expect(normalizeSrc("linear-gradient(to right, red, blue)")).toBe(
      "linear-gradient(to right, red, blue)",
    );
    expect(normalizeSrc("radial-gradient(circle, red, blue)")).toBe(
      "radial-gradient(circle, red, blue)",
    );
  });
});
