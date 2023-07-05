import { Command } from "commander";
import { storeAnalyticEvent } from "./storage";
import { AnalyticEvent } from "./event";
import { GitCollector } from "./collectors/git-collector";
import { OSCollector } from "./collectors/os-collector";
import { NodeCollector } from "./collectors/node-collector";
import { CICollectorFactory, CIData } from "./collectors/ci-collector-factory";
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

  let event: AnalyticEvent = {
    event: `wing cli:${cmd.name()}`,
    properties: {
      inCI: CICollectorFactory.inCI(),
      cli: await cliCollector.collect(),
      os: await osCollector.collect(),
      node: await nodeCollector.collect(),
    }
  }

  if (await ciCollector.canCollect()) {
    event.properties.ci = await ciCollector.collect() as CIData;
  }

  if (await gitCollector.canCollect()) {
    event.properties.git = await gitCollector.collect();
  }

  return storeAnalyticEvent(event);
}
