import { Command } from "commander";
import { Collector } from "./collector";

export interface CLIData {
  target: string;
  version: string;
  options: string;
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
      version: this.cmd.opts().version,
    }
  }
}