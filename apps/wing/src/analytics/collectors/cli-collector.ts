import { Command } from "commander";
import { Collector } from "./collector";
import { PACKAGE_VERSION } from "../../cli";

export interface CLIData {
  target: string;
  version: string;
  options: string;
  entrypoint?: string;
  wing_sdk_version?: string;
  wing_console_version?: string;
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
      wing_sdk_version: this.tryGetModuleVersion("@winglang/sdk/package.json"),
      wing_console_version: this.tryGetModuleVersion(`@wingconsole/app/package.json`),
    };
  }

  private tryGetModuleVersion(module: string): string | undefined {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      return require(module).version as string;
    } catch (error) {
      return undefined;
    }
  }
}
