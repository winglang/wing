import { Command } from "commander";
import { storeAnalyticEvent } from "./storage";
import { AnalyticEvent } from "./event";
import { GitCollector } from "./collectors/git-collector";
import { OSCollector } from "./collectors/os-collector";
import { NodeCollector } from "./collectors/node-collector";
import { CICollectorFactory, CIData } from "./collectors/ci-collector";
import { CLICollector } from "./collectors/cli-collector";


/**
 * Collects analytics for a given command, stores it for later export
 * 
 * @param cmd The commander command to collect analytics for
 * @returns string the file path of the stored analytic
 */
export async function collectCommandAnalytics(cmd: Command): Promise<string> {
  const gitCollector = new GitCollector();
  const osCollector = new OSCollector();
  const nodeCollector = new NodeCollector();
  const ciCollector = CICollectorFactory.create();
  const cliCollector = new CLICollector(cmd);

  const event: AnalyticEvent = {
    event: `wing cli:${cmd.name()}`,
    properties: {
      inCI: CICollectorFactory.inCI(),
      cli: await cliCollector.collect(),
      os: await osCollector.collect(),
      node: await nodeCollector.collect(),
      ci: await ciCollector.collect() as CIData,
      git: await gitCollector.collect(),
    }
  }

  return storeAnalyticEvent(event);
}
