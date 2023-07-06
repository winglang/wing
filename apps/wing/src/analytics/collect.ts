import { Command } from "commander";
import { loadAnalyticsConfig, storeAnalyticEvent } from "./storage";
import { AnalyticEvent } from "./event";
import { OSCollector } from "./collectors/os-collector";
import { NodeCollector } from "./collectors/node-collector";
import { CLICollector } from "./collectors/cli-collector";
import { CICollector } from "./collectors/ci-collector";
import { PACKAGE_VERSION } from "../cli";


/**
 * Collects analytics for a given command, stores it for later export
 * 
 * @param cmd The commander command to collect analytics for
 * @returns string the file path of the stored analytic
 */
export async function collectCommandAnalytics(cmd: Command): Promise<string> {
  const osCollector = new OSCollector();
  const nodeCollector = new NodeCollector();
  const ciCollector = new CICollector();
  const cliCollector = new CLICollector(cmd);

  let event: AnalyticEvent = {
    event: `wing cli:${cmd.name()}`,
    properties: {
      inCI: CICollector.inCI(),
      cli: await cliCollector.collect(),
      os: await osCollector.collect(),
      node: await nodeCollector.collect(),
    }
  }

  if (await ciCollector.canCollect()) {
    event.properties.ci = await ciCollector.collect();
  }
  
  let analyticFilePath = storeAnalyticEvent(event);
  if (getWingAnalyticsCollectionConfig().debug) {
    console.log(`Analytics event stored at ${analyticFilePath}`);
  }
  return analyticFilePath;
}

/**
 * Analytics configuration that determines whether to collect or export analytics
 * Having these options separate makes it easy to debug when developing
 */
export interface AnalyticsCollectionConfig {
  collect: boolean;
  export: boolean;
  debug: boolean;
}

export function getWingAnalyticsCollectionConfig(): AnalyticsCollectionConfig {
  const optOutCollectionConfig: AnalyticsCollectionConfig = {
    collect: false,
    export: false,
    debug: false,
  }

  // If user has provided opt out flag, do not collect or export anything
  if (process.env.WING_DISABLE_ANALYTICS) {
    return optOutCollectionConfig
  }

  // If no environment variable is set, check the analytics config file for opt-out
  const config = loadAnalyticsConfig();
  // If opt out is set do not 
  if (config.optOut) {
    return optOutCollectionConfig;
  }

  // If no opt out is set, then we should collect and export analytics
  const optInConfig: AnalyticsCollectionConfig = {
    collect: true,
    export: true,
    debug: false,
  }

  // check for debug environment variable
  if (process.env.WING_ANALYTICS_DEBUG) {
    // If debug is set, do not export analytics but we still want to generate them
    optInConfig.export = false;
    optInConfig.debug = true;
  }

  // If using local development version of wing, do not collect or export anything
  // unless debug mode is enabled
  if (PACKAGE_VERSION == "0.0.0" && !optInConfig.debug) {
    return optOutCollectionConfig;
  }

  // If we've made it this far, we should collect and export analytics
  return optInConfig;
}
