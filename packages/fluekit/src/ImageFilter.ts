export class ImageFilter {
  private _value: string;

  constructor(value: string) {
    this._value = value;
  }

  toString(): string {
    return this._value;
  }

  /**
   * A filter that applies a Gaussian blur.
   * CSS `backdrop-filter: blur(radius)` only supports a single radius.
   * We will use `sigmaX` as the radius.
   */
  static blur({ sigmaX = 0.0, sigmaY = 0.0 }: { sigmaX?: number; sigmaY?: number }): ImageFilter {
    // In CSS, blur only takes one value. We prioritize sigmaX.
    // Ideally we might want to support SVG filters for asymmetric blur, but that's complex.
    const radius = sigmaX || sigmaY || 0;
    return new ImageFilter(`blur(${radius}px)`);
  }

  /**
   * A filter that applies a transformation matrix.
   * Not fully supported in CSS filters directly as `matrix`, usually part of transform.
   * But we can support other standard CSS filters.
   */

  // Additional CSS filters helpers
  static brightness(amount: number): ImageFilter {
    return new ImageFilter(`brightness(${amount})`);
  }

  static contrast(amount: number): ImageFilter {
    return new ImageFilter(`contrast(${amount})`);
  }

  static grayscale(amount: number): ImageFilter {
    return new ImageFilter(`grayscale(${amount})`);
  }

  static hueRotate(degrees: number): ImageFilter {
    return new ImageFilter(`hue-rotate(${degrees}deg)`);
  }

  static invert(amount: number): ImageFilter {
    return new ImageFilter(`invert(${amount})`);
  }

  static opacity(amount: number): ImageFilter {
    return new ImageFilter(`opacity(${amount})`);
  }

  static saturate(amount: number): ImageFilter {
    return new ImageFilter(`saturate(${amount})`);
  }

  static sepia(amount: number): ImageFilter {
    return new ImageFilter(`sepia(${amount})`);
  }
}

export function isImageFilter(value: any): value is ImageFilter {
  return value instanceof ImageFilter;
}
