import { Octokit } from "octokit";

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
