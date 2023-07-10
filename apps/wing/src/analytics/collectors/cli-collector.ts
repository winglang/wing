import { Command } from "commander";
import { Collector } from "./collector";
import { PACKAGE_VERSION } from "../../cli";

export interface CLIData {
  target: string;
  version: string;
  options: string;
  wing_sdk_version: string;
  wing_console_version: string;
}

export class CLICollector extends Collector {
  private cmd: Command;

  constructor(cmd: Command) {
    super();
    this.cmd = cmd;
  }

  async collect(): Promise<CLIData> {
    return {
      target: this.cmd.opts().target,
      options: `${JSON.stringify(this.cmd.opts())}`,
      version: PACKAGE_VERSION,
      wing_sdk_version: require(`@winglang/sdk/package.json`).version as string,
      wing_console_version: require(`@wingconsole/app/package.json`).version as string
    }
  }
}