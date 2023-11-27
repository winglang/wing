import { IInflightHost } from "../std";
/**
 * Represents values that can only be resolved after the app is synthesized.
 * Tokens values are captured as environment variable, and resolved through the compilation target token mechanism.
 */
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
 * Global registry of available token resolvers.
 */
const _resolvers: ITokenResolver[] = [];

/**
 * Creates a valid environment variable name from the given token.
 */
export function tokenEnvName(value: string): string {
  return `WING_TOKEN_${value
    .replace(/([^a-zA-Z0-9]+)/g, "_")
    .replace(/_+$/, "")
    .replace(/^_+/, "")
    .toUpperCase()}`;
}

/**
 * Globally registers a new token resolver
 */
export function registerTokenResolver(resolver: ITokenResolver) {
  _resolvers.push(resolver);
}

/**
 * Find the first token resolver that considers the given value a token (or containing token(s)).
 */
export function getTokenResolver(value: any): ITokenResolver | undefined {
  return _resolvers.find((r) => r.isToken(value));
}
