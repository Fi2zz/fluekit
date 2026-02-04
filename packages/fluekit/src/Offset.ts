export interface OffsetBase {
  x: number;
  y: number;
}

export interface Offset extends OffsetBase {
  /**
   * Returns the sum of two offsets.
   */
  add(other: OffsetBase): Offset;

  /**
   * Returns the difference between two offsets.
   */
  subtract(other: OffsetBase): Offset;

  /**
   * Returns the offset scaled by the given operand.
   */
  multiply(operand: number): Offset;

  /**
   * Returns the offset divided by the given operand.
   */
  divide(operand: number): Offset;

  /**
   * Returns the negation of the offset.
   */
  negate(): Offset;

  /**
   * The magnitude of the offset.
   */
  readonly distance: number;

  /**
   * The square of the magnitude of the offset.
   */
  readonly distanceSquared: number;

  /**
   * The angle of this offset as a vector in radians.
   */
  readonly direction: number;

  /**
   * Compares two offsets for equality.
   */
  equals(other: OffsetBase): boolean;

  toString(): string;
}

/**
 * Creates an Offset.
 * If y is omitted, x is used for both x and y.
 */
export function Offset(x: number, y?: number): Offset {
  const finalX = x;
  const finalY = y ?? x;

  return {
    x: finalX,
    y: finalY,
    add(other: OffsetBase): Offset {
      return Offset(finalX + other.x, finalY + other.y);
    },
    subtract(other: OffsetBase): Offset {
      return Offset(finalX - other.x, finalY - other.y);
    },
    multiply(operand: number): Offset {
      return Offset(finalX * operand, finalY * operand);
    },
    divide(operand: number): Offset {
      return Offset(finalX / operand, finalY / operand);
    },
    negate(): Offset {
      return Offset(-finalX, -finalY);
    },
    get distance(): number {
      return Math.sqrt(finalX * finalX + finalY * finalY);
    },
    get distanceSquared(): number {
      return finalX * finalX + finalY * finalY;
    },
    get direction(): number {
      return Math.atan2(finalY, finalX);
    },
    equals(other: OffsetBase): boolean {
      return finalX === other.x && finalY === other.y;
    },
    toString(): string {
      return `Offset(${finalX.toFixed(1)}, ${finalY.toFixed(1)})`;
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Offset {
  export const zero = Offset(0, 0);
  export const infinite = Offset(Infinity, Infinity);
}
