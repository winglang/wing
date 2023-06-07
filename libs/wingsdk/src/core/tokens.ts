import { IResource } from "../std";

/**
 * Represents values that can only be resolved after the app is synthesized.
 * Tokens values are captured as environment variable, and resolved through the compilation target token mechanism.
 */
export abstract class Tokens {
  /**
   * Returns true is the given value is a token.
   */
  public abstract isToken(value: any): boolean;

  /**
   * "Lifts" a value into an inflight context.
   */
  public abstract lift(value: any): string;

  /**
   * Binds the given token to the host.
   */
  public abstract bindValue(host: IResource, value: any): void;

  /**
   * Creates a valid environment variable name from the given token.
   */
  protected envName(value: string): string {
    return `WING_TOKEN_${value
      .replace(/([^a-zA-Z0-9]+)/g, "_")
      .toLocaleUpperCase()}`;
  }
}
