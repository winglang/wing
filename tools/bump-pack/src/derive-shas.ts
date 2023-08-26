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
  If the successful commit it from a PR and it's a merge commit, the merge commit sha will be fetch and used as the base.

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

const HEAD_SHA = betterExec(`git rev-parse HEAD`);

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
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  if (GITHUB_TOKEN === undefined) {
    throw new Error(
      "GITHUB_TOKEN environment variable must be set to a token with read access to workflows and PRs"
    );
  }
  const octokit = getOctokit(GITHUB_TOKEN);

  let runId: string | number | undefined =
    process.env.GITHUB_RUN_ID ?? context.runId;
  let repoOwner = process.env.GITHUB_REPOSITORY_OWNER ?? context.repo.owner;
  let repoName = process.env.GITHUB_REPOSITORY_NAME ?? context.repo.repo;
  let eventName = process.env.GITHUB_EVENT_NAME ?? context.eventName;

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

  return await octokit.rest.actions
    .listWorkflowRuns({
      owner: repoOwner,
      repo: repoName,
      branch: branchName,
      workflow_id: workflowId,
      event: eventName,
      status: "success",
    })
    .then(async ({ data: { workflow_runs } }) => {
      for (const run of workflow_runs) {
        if (eventName === "pull_request") {
          // check if you need to fetch the merge ref
          for (const pr of run.pull_requests ?? []) {
            const prData = await octokit.rest.pulls.get({
              owner: repoOwner,
              repo: repoName,
              pull_number: pr.number,
            });
            let goodSha = prData.data.merge_commit_sha;
            if (!goodSha) {
              console.warn(
                `No merge commit found for PR ${pr.number} (merge conflict?)`
              );
              return undefined;
            }

            betterExec(`git fetch origin pull/${pr.number}/merge`);

            if (commitExists(goodSha)) {
              return goodSha;
            } else {
              throw new Error(`${goodSha} does not exist`);
            }
          }
        } else {
          if (commitExists(run.head_sha)) {
            return run.head_sha;
          } else {
            throw new Error(`${run.head_sha} does not exist`);
          }
        }
      }
    });
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
