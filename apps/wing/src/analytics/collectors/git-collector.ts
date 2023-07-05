import { Collector } from "./collector";

export interface GitData {
  contributors: {
    total: number;
    last90Days: number;
  }
  version: string;
  originUrl: string;
}

export class GitCollector extends Collector {
  async canCollect(): Promise<boolean> {
    return await this.isGitRepo();
  }

  async collect(): Promise<GitData> {
    const getContribCount = (lines: string) => {
      return lines.split("\n").filter((line: string) => line.trim() !== "").length;
    }
  
    const formatGitURL = (url: string) => {
      if (url.startsWith("http")) {
        return url;
      }
      // This means the user used SSH to clone so we need to format it to HTTPS
      return url.replace(":", "/").replace("git@", "https://");
    }
  
    const gitVersion = (await this.getGitVersion()).trim();
  
    // If git is not installed then we just return an empty object
    if (gitVersion.trim() === "") {
      return {} as GitData;
    }
  
    const totalContribs = await this.runCommand(
      "git", 
      [
        "--no-pager",
        "shortlog",
        "-sn",
        "--all",
      ]
    );
  
    const last90days = await this.runCommand(
      "git", 
      [
        "--no-pager",
        "shortlog",
        "-sn",
        "--since='90 days ago'",
        "--all",
      ]
    );
  
    const originUrl = await this.runCommand(
      "git",
      [
        "config",
        "--get",
        "remote.origin.url",
      ]
    );
  
    return {
      contributors: {
        total: getContribCount(totalContribs),
        last90Days: getContribCount(last90days),
      },
      version: gitVersion.trim(),
      originUrl: formatGitURL(originUrl).trim(),
    }
  }
  
  async isGitRepo(): Promise<boolean> {
    const inGitTree = await this.runCommand("git", ["rev-parse", "--is-inside-work-tree"]);
    if (inGitTree.trim() === "true") {
      return true;
    }
    return false;
  }

  async getGitVersion(): Promise<string> {
    return await this.runCommand("git", ["--version"]);
  }
}