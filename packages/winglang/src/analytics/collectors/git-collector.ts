import { createHash } from "crypto";
import path from "path";
import { Collector } from "./collector";

export interface GitData {
  anonymous_repo_id: string;
}

export interface GitCollectorProps {
  appEntrypoint?: string;
}

export class GitCollector extends Collector {
  private dir: string;

  constructor(props?: GitCollectorProps) {
    super();
    this.dir = props?.appEntrypoint ? path.dirname(props.appEntrypoint) : ".";
  }

  async collect(): Promise<GitData | undefined> {
    if (await this.isInGitRepo()) {
      const remoteUrl = await this.getRemoteUrl();
      if (remoteUrl) {
        return {
          anonymous_repo_id: createHash("md5").update(remoteUrl).digest("hex"),
        };
      }
    }
    return undefined;
  }

  async isInGitRepo(): Promise<boolean> {
    const results = await this.runCommand("git", ["rev-parse", "--is-inside-work-tree"], this.dir);
    return results.trim() === "true";
  }

  async getRemoteUrl(): Promise<string | undefined> {
    const results = await this.runCommand(
      "git",
      ["config", "--get", "remote.origin.url"],
      this.dir
    );
    return results.trim();
  }
}
