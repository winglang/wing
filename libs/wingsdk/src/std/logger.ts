import { Code, InflightClient } from "../core";

export class Logger {
  /**
   * @internal
   */
  public static _toInflightType(): Code {
    return InflightClient.forType(__filename, this.name);
  }

  public static log(message: string) {
    console.log(message);
  }
}
