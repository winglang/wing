// Why is all of this here?
// See https://github.com/vercel/turbo/issues/4678
// turbo does not take "inputs" into account when using `-F=[...]` git diff filtering

import { join } from "node:path";
import { execSync } from "node:child_process";
import { parseArgs } from "node:util";
import { setOutput } from "@actions/core";
import { minimatch } from "minimatch";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
const rootDir = join(currentFile, "..", "..", "..", "..");
function betterExec(command: string) {
  return execSync(command, {
    cwd: rootDir,
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 1024,
  }).trim();
}

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

let relativeChangedFiles = betterExec(
  `git diff --name-only ${args.values.startRef} ${args.values.endRef}`
).split("\n");

if (args.values.endRef === "") {
  // include untracked files
  const OtherChangedFiles = betterExec(
    `git ls-files --other --exclude-standard`
  ).split("\n");

  relativeChangedFiles = relativeChangedFiles.concat(OtherChangedFiles);
}

// resolve to absolute paths
const absoluteChangedFiles = relativeChangedFiles.map((file) =>
  join(rootDir, file)
);

const turboArgs = [
  "pnpm",
  "turbo",
  "run",
  "compile",
  "test",
  "package",
  "bench",
  "--dry-run=json",
];

const turboOutput = JSON.parse(betterExec(turboArgs.join(" ")));

const taskData: { [key: string]: { cached: boolean; changes: boolean } } = {};

for (const task of turboOutput.tasks) {
  // double check that all the changes files based on git are actually included in all these tasks
  const absoluteTaskRoot = join(rootDir, task.directory);
  const changesRelativeToTask = absoluteChangedFiles
    .map((file) => file.replace(absoluteTaskRoot + "/", ""))
    .filter((file) => !file.startsWith("/"));

  const anyChanges = changesRelativeToTask.some((file) =>
    Object.keys(task.inputs).includes(file)
  );
  taskData[task.taskId] = {
    cached: task.cache.status === "HIT",
    changes: anyChanges,
  };
}

const globalDeps = Object.keys(turboOutput.globalCacheInputs.files);
const globalPattern = `{${globalDeps.join(",")}}`;
for (const changedFile of relativeChangedFiles) {
  if (minimatch(changedFile, globalPattern)) {
    for (const taskId in taskData) {
      taskData[taskId].changes = true;
    }
    break;
  }
}

for (const task of turboOutput.tasks) {
  const dataEntry = taskData[task.taskId];
  if (dataEntry.changes) {
    continue;
  }
  let dependencies = task.dependencies;
  if (task.package === "hangar") {
    // ignore the wing console
    dependencies = dependencies.filter(
      (dependency: string) => !dependency.startsWith("@wingconsole")
    );
  }
  for (const dependency of dependencies) {
    dataEntry.changes = dataEntry.changes || taskData[dependency].changes;
  }
}

console.log(taskData);

if (process.env.GITHUB_ACTIONS) {
  setOutput("data", taskData);
}
