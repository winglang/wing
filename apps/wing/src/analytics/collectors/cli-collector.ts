import { basename } from "path";
import { determineTargetFromPlatforms } from "@winglang/compiler";
import { Command } from "commander";
import { Collector } from "./collector";
import { PACKAGE_VERSION } from "../../cli";

export interface CLIData {
  platform: string;
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
    const platform: string[] = this.cmd.opts().platform ?? [];

    return {
      platform: platform.map((p: string) => basename(p)).join(","), // only report the platform name, not the full path
      target: determineTargetFromPlatforms(platform),
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
