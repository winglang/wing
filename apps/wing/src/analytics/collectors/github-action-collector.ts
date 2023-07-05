import { CICollectorFactory, CIData, CIType } from "./ci-collector-factory";
import { Collector } from "./collector";

export class GithubActionCollector extends Collector {
  async canCollect(): Promise<boolean> {
    return CICollectorFactory.inCI();
  }

  async collect(): Promise<CIData> {
    const serverUrl = process.env.GITHUB_SERVER_URL ?? "";
    const repository = process.env.GITHUB_REPOSITORY ?? "";
    const runId = process.env.GITHUB_RUN_ID ?? "";
    const commitHash = process.env.GITHUB_SHA ?? "";
    const authorName = process.env.GITHUB_ACTOR ?? "";
    const prId = process.env.GITHUB_REF?.split("/").pop() ?? "";
    const fromBranch = process.env.GITHUB_HEAD_REF ?? "";
    const toBranch = process.env.GITHUB_BASE_REF ?? "";

    return {
      name: CIType.GITHUB_ACTIONS,
      serverUrl,
      toBranch,
      fromBranch,
      runId,
      commitHash,
      authorName,
      prId,
      runUrl: `${serverUrl}/${repository}/actions/runs/${runId}`,
      repositoryUrl: `${serverUrl}/${repository}`,
      prUrl: `${serverUrl}/${repository}/pull/${prId}`,
      commitUrl: `${serverUrl}/${repository}/commit/${commitHash}`,
    };
  }
}