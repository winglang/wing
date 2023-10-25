import { determineModelFromPlatforms } from "@winglang/compiler";
import { Command } from "commander";
import { CICollector } from "./collectors/ci-collector";
import { CLICollector } from "./collectors/cli-collector";
import { GitCollector } from "./collectors/git-collector";
import { NodeCollector } from "./collectors/node-collector";
import { OSCollector } from "./collectors/os-collector";
import { AnalyticEvent } from "./event";
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

  // If entrypoint to app is provided, we will give that to git collector to use for
  // running queries against the git repo, otherwise we will use the current working directory
  const gitCollector = new GitCollector({
    appEntrypoint: cmd.args.length > 0 ? cmd.args[0] : ".",
  });

  const model = determineModelFromPlatforms(cmd.opts().platform);
  const eventName = `cli_${model}_${cmd.name()}`;

  let event: AnalyticEvent = {
    event: eventName.replace(/[^a-zA-Z_]/g, ""),
    properties: {
      cli: await cliCollector.collect(),
      os: await osCollector.collect(),
      node: await nodeCollector.collect(),
      ci: await ciCollector.collect(),
      anonymous_repo_id: (await gitCollector.collect())?.anonymous_repo_id,
    },
  };
  const storage = new AnalyticsStorage({ debug: process.env.DEBUG ? true : false });

  let analyticFilePath = storage.storeAnalyticEvent(event);

  return analyticFilePath;
}
