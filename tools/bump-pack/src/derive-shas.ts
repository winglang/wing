/*
Usage: derive-shas

Summary:
  derive-shas figures out the base and head shas useful to compare in a github action.
  A successful base is the sha of the last successful run of the current workflow on the base branch.
  If no successful run is found, the base is the branching point between the base branch and the current branch.
  The head is just the sha of the current commit.

Output:
  If running in an action, the "base", "head", and "head_branch" GH action outputs will be set to the calculated base and head shas respectively.

Expectations:
  - GITHUB_TOKEN environment variable must be set to a token with read access to workflows and PRs
  - One of the following must be true
    - This is running inside a github action
    - The following environment variables must be set with relevant values: GITHUB_RUN_ID, GITHUB_REPOSITORY, GITHUB_REPOSITORY_OWNER, GITHUB_EVENT_NAME

Options: (No options)
*/

import { setOutput } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import { execSync } from "node:child_process";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const baseBranchName = "main";

console.log(context);

const branchName =
  context?.payload?.pull_request?.head?.ref ??
  betterExec(`git rev-parse --abbrev-ref HEAD`);

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
setOutput("head_branch", branchName);

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
      workflow_runs.map((run: { head_sha: any }) => run.head_sha)
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
