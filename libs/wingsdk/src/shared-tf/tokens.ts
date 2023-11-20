import { Fn, Token } from "cdktf";
import { Function } from "../cloud";
import { tokenEnvName, ITokenResolver } from "../core/tokens";
import { IInflightHost } from "../std";

/**
 * Represents values that can only be resolved after the app is synthesized.
 * Tokens values are captured as environment variable, and resolved through the compilation target token mechanism.
 */
export class CdkTfTokens implements ITokenResolver {
  private _jsonEncodeCache = new Map<string, string>();

  /**
   * Returns true is the given value is a CDKTF token.
   */
  public isToken(value: any): boolean {
    return Token.isUnresolved(value);
  }

  /**
   * CDKTF tokens are captured as Json values.
   * e.g. `JSON.parse(process.env["WING_TOKEN__TOKEN1"])`
   */
  public lift(value: any): string {
    return `JSON.parse(process.env[${JSON.stringify(
      tokenEnvName(JSON.stringify(value))
    )}])`;
  }

  /**
   * CDKTF tokens are bounded as Json values.
   */
  public onLiftValue(host: IInflightHost, value: any) {
    if (!(host instanceof Function)) {
      throw new Error(`Tokens can only be bound by a Function for now`);
    }

    const envName = tokenEnvName(JSON.stringify(value));

    // Fn.jsonencode produces a fresh CDKTF token each time, so we cache the results
    let envValue = this._jsonEncodeCache.get(envName);
    if (!envValue) {
      envValue = Fn.jsonencode(value);
      this._jsonEncodeCache.set(envName, envValue);
    }
    host.addEnvironment(envName, envValue);
  }
}
