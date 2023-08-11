#!/usr/bin/env node

// Why is all of this here?
// See https://github.com/vercel/turbo/issues/4678
// turbo does not take "inputs" into account when using `-F=[...]` git diff filtering

import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { appendFileSync } from "node:fs";
import { parseArgs } from "node:util";

const currentDir = fileURLToPath(import.meta.url);
const rootDir = join(currentDir, "..", "..");
const myExec = (/** @type {string} */ command) =>
  execSync(command, {
    cwd: rootDir,
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 1024,
  }).trim();

const args = parseArgs({
  options: {
    startRef: {
      type: "string",
      default: "HEAD",
    },
    endRef: {
      type: "string",
      default: "",
    },
  },
});

let changedFiles = myExec(
  `git diff --name-only ${args.values.startRef} ${args.values.endRef}`
).split("\n");

if (args.values.endRef === "") {
  // include untracked files
  const OtherChangedFiles = myExec(`git ls-files -o --exclude-standard`).split(
    "\n"
  );

  changedFiles = changedFiles.concat(OtherChangedFiles);
}

// resolve to absolute paths
changedFiles = changedFiles.map((file) => join(rootDir, file));

const turboArgs = [
  "pnpm",
  "turbo",
  "run",
  "compile",
  "test",
  "package",
  "--dry-run=json",
];

const result = JSON.parse(myExec(turboArgs.join(" ")));

const data = {};

for (const task of result.tasks) {
  data[task.taskId] = task.cache.status !== "HIT";

  // double check that all the changes files based on git are actually included in all these tasks
  const absoluteTaskRoot = join(rootDir, task.directory);
  const relativeChanges = changedFiles
    .map((file) => file.replace(absoluteTaskRoot + "/", ""))
    .filter((file) => !file.startsWith("/"));

  const anyChanges = relativeChanges.some((file) =>
    Object.keys(task.inputs).includes(file)
  );
  data[task.taskId] = {
    cached: task.cache.status === "HIT",
    changes: anyChanges,
  };
}

// TODO check global dependencies

for (const task of result.tasks) {
  let dependencies = task.dependencies;
  if (task.package === "hangar") {
    // ignore the wing console
    dependencies = dependencies.filter(
      (/** @type {string} */ dependency) =>
        !dependency.startsWith("@wingconsole")
    );
  }
  for (const dependency of dependencies) {
    data[task.taskId].changes =
      data[task.taskId].changes || data[dependency].changes;
  }
}

console.log(data);

if (!!process.env.GITHUB_ACTIONS) {
  // we are running in a github action and we should output some useful stuff
  const githubOutputFile = process.env.GITHUB_OUTPUT;
  if (!githubOutputFile) {
    throw new Error("Missing github action environment variables");
  }

  appendFileSync(githubOutputFile, `data=${JSON.stringify(data)}\n`);
}
