import {
  DefaultTokenResolver,
  Fn,
  StringConcat,
  Token,
  Tokenization,
} from "cdktf";
import { IConstruct } from "constructs";
import { Function } from "../cloud";
import { Tokens } from "../core/tokens";
import { IInflightHost } from "../std";

/**
 * Represents values that can only be resolved after the app is synthesized.
 * Tokens values are captured as environment variable, and resolved through the compilation target token mechanism.
 */
export class CdkTfTokens extends Tokens {
  constructor(private readonly stack: IConstruct) {
    super();
  }

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
      this.envNameForToken(value)
    )}])`;
  }

  /**
   * CDKTF tokens are bounded as Json values.
   */
  public bindValue(host: IInflightHost, value: any) {
    if (!(host instanceof Function)) {
      throw new Error(`Tokens can only be bound by a Function for now`);
    }

    const envName = this.envNameForToken(value);
    const envValue = Fn.jsonencode(value);
    if (host.env[envName] === undefined) {
      host.addEnvironment(envName, envValue);
    }
  }

  private envNameForToken(value: any) {
    const resolved = Tokenization.resolve(value, {
      scope: this.stack,
      resolver: new DefaultTokenResolver(new StringConcat()),
    });
    return this.envName(resolved);
  }
}
