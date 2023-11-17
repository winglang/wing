import { IInflightHost } from "../std";

export interface ITokenResolver {
  /**
   * Returns true is the given value is a token.
   */
  isToken(value: any): boolean;

  /**
   * "Lifts" a value into an inflight context.
   */
  lift(value: any): string;

  /**
   * Lifts the given token to the host.
   */
  onLiftValue(host: IInflightHost, value: any): void;
}

/**
 * Represents values that can only be resolved after the app is synthesized.
 * Tokens values are captured as environment variable, and resolved through the compilation target token mechanism.
 */
export abstract class Tokens {
  public static addResolver(resolver: ITokenResolver) {
    this._resolvers.push(resolver);
  }

  public static getTokenResolver(value: any): ITokenResolver | undefined {
    return this._resolvers.find((r) => r.isToken(value));
  }

  /**
   * Creates a valid environment variable name from the given token.
   */
  public static envName(value: string): string {
    return `WING_TOKEN_${value
      .replace(/([^a-zA-Z0-9]+)/g, "_")
      .replace(/_+$/, "")
      .replace(/^_+/, "")
      .toUpperCase()}`;
  }

  private static _resolvers: ITokenResolver[] = [];
}
