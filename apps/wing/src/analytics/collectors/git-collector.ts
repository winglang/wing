import { Collector } from "./collector";
import { createHash } from 'crypto';

export interface GitData {
  anonymous_repo_id: string;
}

export class GitCollector extends Collector {
  async collect(): Promise<GitData | undefined> {
    if (await this.isInGitRepo()) {
      const remoteUrl = await this.getRemoteUrl();
      if (remoteUrl) {
        return {
          anonymous_repo_id: createHash('md5').update(remoteUrl).digest('hex')
        }
      }
    }
    return undefined;
  }

  async isInGitRepo(): Promise<boolean> {
    const results = await this.runCommand('git', ['rev-parse', '--is-inside-work-tree']);
    return results.trim() === 'true';
  }

  async getRemoteUrl(): Promise<string | undefined> {
    const results = await this.runCommand('git', ['config', '--get', 'remote.origin.url']);
    return results.trim();
  }
}