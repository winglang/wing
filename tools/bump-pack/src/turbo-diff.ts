/*
Usage: turbo-diff [options]

Summary:
  turbo-diff is a tool that can be used to determine which turbo tasks changed based on a git diff.

Output:
  The output is a JSON object with the following structure:
  {
    "<task-id>": {
      "cached": <boolean>,
      "changes": <boolean>
    }
  }

  The "cached" field indicates whether or not the task is cached based on the info that turbo has locally (or remotely if using a turbo remote cache).
  The "changes" field indicates whether or not the task has changes based on the git diff.

Expectations:
  - The winglang monorepo this is contained in must have a enough history to covert startRef and EndRef.

Remarks:
  Why can't we just use turbo's built in diffing?
  In turbo, you can use `-F=...[startRef..endRef]` to filter tasks based on a git diff. This method has two major issues:
  1. See this issue: https://github.com/vercel/turbo/issues/4678. 
     Basically, it does not actually use task inputs to determine if a task changed, it uses the entire project dir
  2. It only tells you if a project changed, not a specific task.

Options:
  --start-ref <ref>  The start ref to use for the git diff (default: "HEAD")
  --end-ref <ref>    The end ref to use for the git diff (default: "", current working tree)
*/

import { join } from "node:path";
import { execSync } from "node:child_process";
import { parseArgs } from "node:util";
import { setOutput } from "@actions/core";
import { minimatch } from "minimatch";
import { fileURLToPath } from "node:url";

type TurboTaskOutput = {
  package: string;
  taskId: string;
  directory: string;
  cache: {
    status: "HIT" | "MISS";
  };
  dependencies: string[];
  inputs: { [key: string]: any };
};
type TaskChangeMap = { [key: string]: { cached: boolean; changes: boolean } };

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

console.log(absoluteChangedFiles);

const turboArgs = [
  "pnpm",
  "turbo",
  "run",
  "compile",
  "test",
  "package",
  "bench",
  "preview:fly",
  "--dry-run=json",
];

const turboOutput = JSON.parse(betterExec(turboArgs.join(" ")));

const rawTasks: TurboTaskOutput[] = turboOutput.tasks;
const taskData: TaskChangeMap = {};

// create change map based on task data
for (const task of rawTasks) {
  // double check that all the changes files based on git are actually included in all these tasks
  const absoluteTaskRoot = join(rootDir, task.directory);
  const changesRelativeToTask = absoluteChangedFiles
    .map((file) => file.replace(absoluteTaskRoot + "/", ""))
    .filter((file) => !file.startsWith("/"));

  taskData[task.taskId] = {
    cached: task.cache.status === "HIT",
    changes: changesRelativeToTask.some((file) =>
      Object.keys(task.inputs).includes(file)
    ),
  };
}

// check if any global deps changed
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

for (const task of rawTasks) {
  updateChanges(task);
}

console.log(taskData);
if (process.env.GITHUB_ACTIONS) {
  setOutput("data", taskData);
}

function getDependencies(taskId: string): string[] {
  const task = rawTasks.find((task) => task.taskId === taskId);
  if (!task) {
    throw new Error(`Could not find task ${taskId}`);
  }

  let dependencies = task.dependencies;
  
  // get all transitive dependencies
  for (const dependency of dependencies) {
    dependencies = dependencies.concat(getDependencies(dependency));
  }

  // dedupe
  dependencies = [...new Set(dependencies)];

  return dependencies;
}

/**
 * Check if any of the dependencies of the given task have changes.
 * @returns true if changes were found
 */
function updateChanges(task: TurboTaskOutput) {
  const dataEntry = taskData[task.taskId];
  if (dataEntry.changes) {
    return true;
  }

  let dependencies = getDependencies(task.taskId)

  if (task.package === "hangar") {
    /*
    The wing console is a transitive dependency of hangar (hangar->winglang->@console/*).
    Because of that, turbo knows that hangar itself also depends on it.
    However, hangar doesn't actually interact with the console at all so it's functionally not a real dependency.
    There is no way to denote this in turbo configuration so we have to do it manually here.
    */
    dependencies = dependencies.filter(
      (dep) => !dep.startsWith("@wingconsole")
    );
  }

  for (const dependency of dependencies) {
    const depTask = rawTasks.find((task) => task.taskId === dependency);
    if (!depTask) {
      throw new Error(
        `Could not find dependency ${dependency} for task ${task.taskId}`
      );
    }
    if (taskData[dependency].changes) {
      dataEntry.changes = true;
      break;
    }
  }
}
