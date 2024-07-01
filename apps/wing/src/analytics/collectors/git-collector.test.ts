import { execFile } from "child_process";
import { createHash } from "crypto";
import fs from "fs";
import * as os from "os";
import path from "path";
import { afterEach, describe, expect, test } from "vitest";
import { GitCollector } from "./git-collector";

describe("git collector tests", () => {
  afterEach(() => {
    clearCreatedRepos();
  });

  test("should return undefined if not in git repo", async () => {
    // GIVEN
    const repoPath = await createFakeRepo("non-git-1");
    const collector = new GitCollector({ appEntrypoint: `${repoPath}/app.w` });

    // WHEN
    const gitData = await collector.collect();

    // THEN
    expect(gitData).toBeUndefined();
  });

  test("should return git data if in git repo", async () => {
    // GIVEN
    const expectedRemoteUrl = "https://super-fake.com/test.git";
    const expectedAnonymousRepoId = createHash("md5").update(expectedRemoteUrl).digest("hex");
    const repoPath = await createFakeRepo("git-1", { remoteUrl: expectedRemoteUrl });
    const collector = new GitCollector({ appEntrypoint: `${repoPath}/app.w` });

    // WHEN
    const gitData = await collector.collect();

    // THEN
    expect(gitData).toBeDefined();
    expect(gitData?.anonymous_repo_id).toEqual(expectedAnonymousRepoId);
  });
});

let createdRepoPaths: string[] = [];
const clearCreatedRepos = () => {
  createdRepoPaths.forEach((r) => {
    fs.rmSync(r, { recursive: true, force: true });
  });
  createdRepoPaths = [];
};

interface FakeGitRepoProps {
  remoteUrl: string;
}

async function createFakeRepo(name: string, props?: FakeGitRepoProps): Promise<string> {
  const repoPath = path.join(os.tmpdir(), "wing-git-collector-test", name);

  fs.mkdirSync(repoPath, { recursive: true });

  if (props) {
    await initializeGitRepo(repoPath, props);
  }

  createdRepoPaths.push(repoPath);
  return repoPath;
}

async function runCommand(cmd: string, args: string[], dir: string): Promise<any> {
  const raw = await new Promise((resolve, reject) => {
    execFile(cmd, args, { cwd: dir }, (error, stdout, stderr) => {
      if (error) {
        stderr;
        reject(error);
      }
      resolve(stdout);
    });
  });
  return raw;
}

async function initializeGitRepo(repoPath: string, props: FakeGitRepoProps) {
  await runCommand("git", ["init"], repoPath);
  await runCommand("git", ["remote", "add", "origin", props.remoteUrl], repoPath);
}
