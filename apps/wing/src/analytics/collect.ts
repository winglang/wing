import { Command } from "commander";
import { AnalyticEvent } from "./event";
import { OSCollector } from "./collectors/os-collector";
import { NodeCollector } from "./collectors/node-collector";
import { CLICollector } from "./collectors/cli-collector";
import { CICollector } from "./collectors/ci-collector";
import { AnalyticsStorage } from "./storage";


/**
 * Collects analytics for a given command, stores it for later export
 * 
 * @param cmd The commander command to collect analytics for
 * @returns string the file path of the stored analytic
 */
export async function collectCommandAnalytics(cmd: Command): Promise<string | undefined> {
  const osCollector = new OSCollector();
  const nodeCollector = new NodeCollector();
  const ciCollector = new CICollector();
  const cliCollector = new CLICollector(cmd);

  let event: AnalyticEvent = {
    event: `wing cli:${cmd.name()}`,
    properties: {
      cli: await cliCollector.collect(),
      os: await osCollector.collect(),
      node: await nodeCollector.collect(),
      ci: await ciCollector.collect(),
    }
  }

  const storage = new AnalyticsStorage({debug: process.env.DEBUG ? true : false});
  
  let analyticFilePath = storage.storeAnalyticEvent(event);
  
  return analyticFilePath;
}

