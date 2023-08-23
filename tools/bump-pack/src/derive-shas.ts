import { setOutput } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import { execSync } from "node:child_process";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const baseBranchName = "main";

console.log(JSON.stringify(context));

const branchName = betterExec(`git rev-parse --abbrev-ref HEAD`);
const HEAD_SHA = betterExec(`git rev-parse HEAD`);

let BASE_SHA = await findSuccessfulCommit(baseBranchName, branchName);

// If no successful workflow run is found, use the branching point from the base branch
if (BASE_SHA) {
  console.log(`Found successful run for this workflow. Using it as BASE_SHA`);
} else {
  BASE_SHA = betterExec(`git merge-base origin/${baseBranchName} ${HEAD_SHA}`);
  console.log(`\
No successful run for this workflow found on the branch ${branchName}.
Using the branching point between origin/${baseBranchName} and this branch's head ${HEAD_SHA}
BASE_SHA=${BASE_SHA}`);
}

setOutput("base", BASE_SHA);
setOutput("head", HEAD_SHA);

async function findSuccessfulCommit(
  baseBranchName: string,
  branchName: string
) {
  if (GITHUB_TOKEN === undefined) return undefined;

  let runId: string | number | undefined = process.env.GITHUB_RUN_ID;
  let repoName = process.env.GITHUB_REPOSITORY;
  let repoOwner = process.env.GITHUB_REPOSITORY_OWNER;
  let eventName = process.env.GITHUB_EVENT_NAME;

  if (runId === undefined) {
    runId = context.runId;
    repoName = context.repo.repo;
    repoOwner = context.repo.owner;
    eventName = context.eventName;
  }

  const octokit = getOctokit(GITHUB_TOKEN);
  const workflowId = await octokit
    .request(`GET /repos/${repoOwner}/${repoName}/actions/runs/${runId}`, {
      repoOwner,
      repoName,
      branch: baseBranchName,
      runId,
    })
    .then(({ data: { workflow_id } }) => workflow_id);

  const shas = await octokit
    .request(
      `GET /repos/${repoOwner}/${repoName}/actions/workflows/${workflowId}/runs`,
      {
        repoOwner,
        repoName,
        branch: branchName,
        workflowId,
        event: eventName,
        status: "success",
      }
    )
    .then(({ data: { workflow_runs } }) =>
      workflow_runs.map(
        (/** @type {{ head_sha: any; }} */ run: { head_sha: any }) =>
          run.head_sha
      )
    );

  return await findExistingCommit(shas);
}

/**
 * Get first existing commit
 */
async function findExistingCommit(shas: string[]) {
  for (const commitSha of shas) {
    if (await commitExists(commitSha)) {
      return commitSha;
    }
  }
  return undefined;
}

/**
 * Check if given commit is valid
 */
async function commitExists(commitSha: string) {
  try {
    betterExec(`git cat-file -e ${commitSha}`);
    return true;
  } catch {
    return false;
  }
}

function betterExec(command: string) {
  return execSync(command, {
    encoding: "utf8",
  }).trim();
}
