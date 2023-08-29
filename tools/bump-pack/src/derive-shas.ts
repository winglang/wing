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
    - The following environment variables must be set with relevant values: GITHUB_RUN_ID, GITHUB_REPOSITORY_NAME, GITHUB_REPOSITORY_OWNER, GITHUB_EVENT_NAME

Remarks:
  This is originally forked from https://github.com/nrwl/nx-set-shas, but now allows for pull request commits to to be used as the "base" as well.
  Also changed to be in typescript and less modular.
  ---
  PRs will instead be rebased locally onto the base branch, and the base sha will be the branching point between the base branch and the rebased PR branch.

Options: (No options)
*/

import { setOutput } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import { execSync } from "node:child_process";

const baseBranchName = "main";

console.log(context);

const branchName =
  context?.payload?.pull_request?.head?.ref ??
  betterExec(`git rev-parse --abbrev-ref HEAD`);

let HEAD_SHA = context?.sha ?? betterExec(`git rev-parse HEAD`);
const originalHEAD_SHA = HEAD_SHA;

let BASE_SHA = await findSuccessfulCommit(branchName);

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

async function findSuccessfulCommit(branchName: string) {
  let runId: string | number | undefined =
    process.env.GITHUB_RUN_ID ?? context.runId;
  let repoOwner = process.env.GITHUB_REPOSITORY_OWNER ?? context.repo.owner;
  let repoName = process.env.GITHUB_REPOSITORY_NAME ?? context.repo.repo;
  let eventName = process.env.GITHUB_EVENT_NAME ?? context.eventName;

  if (eventName === "pull_request") {
    const actualPRHeadSha =
      process.env.GITHUB_PR_HEAD ?? context.payload?.pull_request?.head?.sha;

    try {
      // create a new branch locally to rebase onto main
      const tmpBranchName = `tmp-pr-diff-${HEAD_SHA}`;

      try {
        betterExec(`git branch -D --force ${tmpBranchName}`);
      } catch {}
      betterExec(`git switch -c ${baseBranchName}`);
      betterExec(`git switch -c ${branchName}`);
      betterExec(`git reset --hard ${actualPRHeadSha}`);

      betterExec(`git switch -C ${tmpBranchName} ${actualPRHeadSha}`);
      betterExec(
        `git rebase --onto ${baseBranchName} ${branchName} ${tmpBranchName}`
      );

      const returnBase = betterExec(
        `git merge-base ${baseBranchName} ${tmpBranchName}`
      );
      HEAD_SHA = tmpBranchName;
      return returnBase;
    } catch (err) {
      console.log(`Failed to rebase onto ${baseBranchName}`);
      console.log(err);

      return undefined;
    } finally {
      // switch back to what we were on before
      try {
        betterExec(`git rebase --quit`);
      } catch {}

      // regardless of whether we succeeded or not, switch back to the original commit
      betterExec(`git reset --hard ${originalHEAD_SHA}`);
    }
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  if (GITHUB_TOKEN === undefined) {
    throw new Error(
      "GITHUB_TOKEN environment variable must be set to a token with read access to workflows and PRs"
    );
  }
  const octokit = getOctokit(GITHUB_TOKEN);

  if (runId === undefined || repoName === undefined || repoOwner === undefined)
    throw new Error(
      `Missing required environment variables: GITHUB_RUN_ID, GITHUB_REPOSITORY_NAME, GITHUB_REPOSITORY_OWNER`
    );

  runId = Number(runId);

  const workflowId = await octokit.rest.actions
    .getWorkflowRun({
      owner: repoOwner,
      repo: repoName,
      run_id: runId,
      exclude_pull_requests: true,
    })
    .then(({ data: { workflow_id } }) => workflow_id);

  console.log(`Workflow ID: ${workflowId}`);

  const runs = await octokit.rest.actions.listWorkflowRuns({
    owner: repoOwner,
    repo: repoName,
    branch: branchName,
    workflow_id: workflowId,
    event: eventName,
    status: "success",
    per_page: 1,
    exclude_pull_requests: true,
  });

  for (const run of runs.data.workflow_runs) {
    const runSHA = run.head_sha;
    if (commitExists(runSHA)) {
      return runSHA;
    } else {
      throw new Error(`${runSHA} has not been fetched`);
    }
  }
}

/**
 * Check if given commit is valid
 */
function commitExists(sha: string) {
  try {
    betterExec(`git cat-file -e ${sha}`);
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
