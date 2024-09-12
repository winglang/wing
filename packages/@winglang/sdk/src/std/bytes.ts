// These classes are used by Wing to create the built-in `bytes` type.
// They should not be consumed directly by users.
import { InflightClient } from "../core";

/**
 * Options for converting a `bytes` value to a string.
 */
export interface BytesToStringOptions {
  /**
   * The encoding to use when converting the `bytes` value to a string.
   * @default "utf-8"
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API/Encodings
   */
  readonly encoding: string;
}

// TODO: is there a way so we can avoid wrapping the Uint8Array data in a class?
// e.g. so compiled code for bytes.fromString("hello") can just return a Uint8Array

/**
 * Immutable sequence of binary data.
 */
export class Bytes {
  /**
   * @internal
   */
  public static _toInflightType(): string {
    return InflightClient.forType(__filename, this.name);
  }

  /** @internal */
  public readonly _data: Uint8Array;

  private constructor(data: Uint8Array) {
    this._data = data;
  }

  /** @internal */
  public static _fromUtf8Array(data: Uint8Array): Bytes {
    return new Bytes(data);
  }

  /**
   * Create a new `bytes` value from an array of byte values
   * @param values - The byte values to create the `bytes` from
   * @returns a new `bytes` value containing the byte values
   */
  public static fromRaw(values: Array<number>): Bytes {
    return new Bytes(new Uint8Array(values));
  }

  /**
   * Create a new `bytes` value from a string
   * @param value - The string to create the `bytes` from
   * @returns a new `bytes` value containing the string
   */
  public static fromString(value: string): Bytes {
    return new Bytes(new TextEncoder().encode(value));
  }

  /**
   * Create a new `bytes` value from a base64 encoded string
   * @param base64 - The base64 encoded string to create the `bytes` from
   * @returns a new `bytes` value containing the decoded bytes
   */
  public static fromBase64(base64: string): Bytes {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return new Bytes(bytes);
  }

  /**
   * Create a new `bytes` value from a hex encoded string
   * @param hex - The hex encoded string to create the `bytes` from
   * @returns a new `bytes` value containing the decoded bytes
   */
  public static fromHex(hex: string): Bytes {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
    }
    return new Bytes(bytes);
  }

  /**
   * Create a new `bytes` value with the given length, filled with zeros
   * @param length - The length of the new `bytes` value
   * @returns a new `bytes` value with the given length, filled with zeros
   */
  public static zeros(length: number): Bytes {
    return new Bytes(new Uint8Array(length));
  }

  /**
   * Convert the `bytes` value to an array of byte values
   * @returns an array of byte values
   */
  public toRaw(): Array<number> {
    return Array.from(this._data);
  }

  /**
   * Convert the `bytes` value to a string
   * @param options - The options to use when converting the `bytes` value to a string
   * @returns a decoded string
   */
  public toString(options?: BytesToStringOptions): string {
    return new TextDecoder(options?.encoding).decode(this._data);
  }

  /**
   * Convert the `bytes` value to a base64 encoded string
   * @returns a base64 encoded string
   */
  public toBase64(): string {
    return btoa(String.fromCharCode(...this._data));
  }

  /**
   * Convert the `bytes` value to a hex encoded string
   * @returns a hex encoded string
   */
  public toHex(): string {
    return Array.from(this._data)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  /**
   * Create a copy of the `bytes` value
   * @returns a new `bytes` value with the same byte values as the original
   */
  public copy(): Bytes {
    return new Bytes(this._data.slice());
  }

  /**
   * The length of the bytes
   * @returns the length of the bytes
   */
  public get length(): number {
    return this._data.length;
  }

  /**
   * Get the byte at the given index
   * @param index index of the value to get
   * @returns the byte value (0-255) at the given index
   */
  public at(index: number): number {
    if (index < 0 || index >= this.length) {
      throw new Error("Index out of bounds");
    }
    return this._data[index];
  }

  /**
   * Get the byte at the given index, returning nil if the index is out of bounds.
   * @param index index of the value to get
   * @returns the byte value (0-255) at the given index, or nil if the index is out of bounds
   */
  public tryAt(index: number): number | undefined {
    if (index < 0 || index >= this.length) {
      return undefined;
    }
    return this._data[index];
  }

  /**
   * Get the slice of the `bytes` value from the given start index to the given end index
   * @param startIndex index to start the slice
   * @param endIndex index to end the slice
   * @returns a new `bytes` value with the bytes from the start index to the end index
   */
  public slice(startIndex: number, endIndex?: number): Bytes {
    return new Bytes(this._data.slice(startIndex, endIndex));
  }

  /**
   * Concatenate multiple `bytes` values
   * @param values the `bytes` values to concatenate
   * @returns a new `bytes` value with the bytes from the input values concatenated together
   */
  public static concat(...values: Array<Bytes>): Bytes {
    const totalLength = values.reduce((acc, bytes) => acc + bytes.length, 0);
    const newData = new Uint8Array(totalLength);
    let offset = 0;
    for (const bytes of values) {
      newData.set(bytes._data, offset);
      offset += bytes.length;
    }
    return new Bytes(newData);
  }
}
