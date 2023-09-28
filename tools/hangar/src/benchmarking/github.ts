import { Octokit } from "octokit";
import { unzipSync } from "fflate";
import { parseRoundedJson } from "./util";

export const CURRENT_REPO_FULL = process.env.GITHUB_REPOSITORY ?? "winglang/wing";
export const CURRENT_REPO_OWNER = CURRENT_REPO_FULL.split("/")[0];
export const CURRENT_REPO_NAME = CURRENT_REPO_FULL.split("/")[1];

export const CURRENT_REPO = {
  owner: CURRENT_REPO_OWNER,
  repo: CURRENT_REPO_NAME,
};

const BENCHMARKS_COMMENT = "<!-- BENCHMARKS -->\n";

export function getOctokit() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("GITHUB_TOKEN not set");
  }

  return new Octokit({
    auth: token,
  }).rest;
}

export async function upsertPRComment(
  prNumber: number,
  comment: string
): Promise<void> {
  const octokit = getOctokit();
  comment = BENCHMARKS_COMMENT + comment;

  const { data: comments } = await octokit.issues.listComments({
    ...CURRENT_REPO,
    issue_number: prNumber,
  });

  const existingComment = comments.find((comment) =>
    comment.body?.startsWith(BENCHMARKS_COMMENT)
  );

  if (existingComment) {
    await octokit.issues.updateComment({
      ...CURRENT_REPO,
      comment_id: existingComment.id,
      body: comment,
    });
  } else {
    await octokit.issues.createComment({
      ...CURRENT_REPO,
      issue_number: prNumber,
      body: comment,
    });
  }
}

export async function getBenchForBranch(
  branch: string,
  count: number = 1
): Promise<any[]> {
  const octokit = getOctokit();

  const {
    data: { workflow_runs },
  } = await octokit.actions.listWorkflowRuns({
    ...CURRENT_REPO,
    workflow_id: "build.yml",
    branch,
    status: "completed",
    per_page: 30,
  });

  const benchResults = [];

  for (const run of workflow_runs.filter((r) => r.conclusion === "success")) {
    const {
      data: { artifacts },
    } = await octokit.actions.listWorkflowRunArtifacts({
      ...CURRENT_REPO,
      run_id: run.id,
    });

    let bench = artifacts.find((artifact) => artifact.name === "benchmarks");

    if (bench) {
      const { url } = await octokit.actions.downloadArtifact({
        ...CURRENT_REPO,
        artifact_id: bench.id,
        archive_format: "zip",
      });

      // fetch and unzip
      const zipData = await fetch(url).then((res) => res.arrayBuffer());
      // arraybuffer to uint8array
      const unzipped = unzipSync(new Uint8Array(zipData));

      // get the file
      const benchFile = unzipped["report.json"];

      if (benchFile) {
        const benchData = new TextDecoder().decode(benchFile);
        const benchJson = parseRoundedJson(benchData);
        benchResults.push(benchJson.testResults.compile);
        if (benchResults.length === count) {
          break;
        }
      }
    }
  }

  return benchResults;
}
