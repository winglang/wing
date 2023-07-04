import { Command } from "commander";
import { AnalyticsStorage } from "./storage";
import { AnalyticEvent, GitData, NodeData, OSData } from "./event";
import * as os from "os";
import { PACKAGE_VERSION } from "../cli";
import { getDevStats } from "./git-analysis";
import { getCIData, isInCI } from "./ci-analysis";

export class AnalyticsCollector {
  static async collectCommandAnalytics(cmd: Command) {
    const event: AnalyticEvent = {
      event: `wing cli:${cmd.name()}`,
      properties: {
        inCI: isInCI(),
        cli: {
          target: cmd.opts().target,
          options: `${JSON.stringify(cmd.opts())}`,
          version: PACKAGE_VERSION,
        },
        os: this.collectOSData(),
        node: this.collectNodeData(),
        ci: getCIData(),
        git: await this.collectGitData(),
      }
    }

    AnalyticsStorage.storeAnalyticEvent(event);
  }

  static collectOSData(): OSData {
    return {
      arch: os.arch(),
      platform: os.platform(),
      release: os.release(),
    }
  }

  static collectNodeData(): NodeData {
    return {
      version: process.version,
    };
  }

  static async collectGitData(): Promise<GitData> {
    return await getDevStats();
  }
}