import { Command } from "commander";
import { storeAnalyticEvent } from "./storage";
import { AnalyticEvent, GitData, NodeData, OSData } from "./event";
import * as os from "os";
import { PACKAGE_VERSION } from "../cli";
import { getDevStats } from "./git-analysis";
import { getCIData, isInCI } from "./ci-analysis";


/**
 * Collects analytics for a given command, stores it for later export
 * 
 * @param cmd The commander command to collect analytics for
 * @returns string the file path of the stored analytic
 */
export async function collectCommandAnalytics(cmd: Command): Promise<string> {
  const event: AnalyticEvent = {
    event: `wing cli:${cmd.name()}`,
    properties: {
      inCI: isInCI(),
      cli: {
        target: cmd.opts().target,
        options: `${JSON.stringify(cmd.opts())}`,
        version: PACKAGE_VERSION,
      },
      os: collectOSData(),
      node: collectNodeData(),
      ci: getCIData(),
      git: await collectGitData(),
    }
  }

  return storeAnalyticEvent(event);
}


function collectOSData(): OSData {
  return {
    arch: os.arch(),
    platform: os.platform(),
    release: os.release(),
  }
}

function collectNodeData(): NodeData {
  return {
    version: process.version,
  };
}

async function collectGitData(): Promise<GitData> {
  return await getDevStats();
}