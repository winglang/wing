import { OutputChannel, window } from "vscode";

/**
 * Global loggers for this extension. Use this instead of `console.log`.
 *
 * This lazy-loads the output channels to avoid creating them when they are not needed.
 */
export class Loggers {
  private static _default: OutputChannel | undefined;
  private static _console: OutputChannel | undefined;

  public static get default() {
    if (!this._default) {
      this._default = window.createOutputChannel("Wing");
    }
    return this._default;
  }

  public static get console() {
    if (!this._console) {
      this._console = window.createOutputChannel("Wing Console");
    }
    return this._console;
  }
}
