import { join } from "node:path";
import { execSync } from "node:child_process";
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

type FileChanges = { relativeChanges: string[]; absoluteChanges: string[] };
export type TurboOutput = {
  absoluteRoot: string;
  globalInputFiles: string[];
  tasks: TurboTaskOutput[];
};
type TaskChangeMap = { [key: string]: { cached: boolean; changes: boolean } };

const currentFile = fileURLToPath(import.meta.url);
const rootDir = join(currentFile, "..", "..", "..", "..");

export function betterExec(command: string) {
  return execSync(command, {
    cwd: rootDir,
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 1024,
  }).trim();
}

export function getChangedFiles(
  startRef: string | undefined,
  endRef: string | undefined
): FileChanges {
  let relativeChanges = betterExec(
    `git diff --name-only ${startRef} ${endRef}`
  ).split("\n");

  if (endRef === "") {
    // include untracked files
    const OtherChangedFiles = betterExec(
      `git ls-files --other --exclude-standard`
    ).split("\n");

    relativeChanges = relativeChanges.concat(OtherChangedFiles);
  }

  const absoluteChanges = relativeChanges.map((file) => join(rootDir, file));

  return {
    relativeChanges,
    absoluteChanges,
  };
}

export function getTurboTaskData(): TurboOutput {
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

  return {
    absoluteRoot: rootDir,
    globalInputFiles: Object.keys(turboOutput.globalCacheInputs.files),
    tasks: turboOutput.tasks,
  };
}

export function getChanges(
  turbo: TurboOutput,
  fileChanges: FileChanges
): TaskChangeMap {
  // based only on the changes within the project itself and global deps
  const immediateChanges: TaskChangeMap = {};

  // includes transitive deps
  const fullChanges: TaskChangeMap = {};

  // create initial change map based on task data
  for (const task of turbo.tasks) {
    // double check that all the changes files based on git are actually included in all these tasks
    const absoluteTaskRoot = join(turbo.absoluteRoot, task.directory);
    const changesRelativeToTask = fileChanges.absoluteChanges
      .map((file) => file.replace(absoluteTaskRoot + "/", ""))
      .filter((file) => !file.startsWith("/"));

    immediateChanges[task.taskId] = {
      cached: task.cache.status === "HIT",
      changes: changesRelativeToTask.some((file) =>
        Object.keys(task.inputs).includes(file)
      ),
    };
  }

  // check if any global deps changed
  const globalPattern = `{${turbo.globalInputFiles.join(",")}}`;
  for (const changedFile of fileChanges.relativeChanges) {
    if (minimatch(changedFile, globalPattern)) {
      for (const taskId in immediateChanges) {
        immediateChanges[taskId].changes = true;
      }

      // early return because we know all tasks have changes
      return immediateChanges;
    }
  }

  /**
   * Check if any of the dependencies of the given task have changes.
   * @returns true if changes were found
   */
  function checkTransitiveChanges(turbo: TurboOutput, task: TurboTaskOutput) {
    const dataEntry = immediateChanges[task.taskId];
    if (dataEntry.changes) {
      return dataEntry;
    }

    let dependencies = getDependencies(turbo, task.taskId);

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
      if (immediateChanges[dependency].changes) {
        return {
          ...dataEntry,
          changes: true,
        };
      }
    }

    return dataEntry;
  }

  for (const task of turbo.tasks) {
    fullChanges[task.taskId] = checkTransitiveChanges(turbo, task);
  }

  return fullChanges;
}

/**
 * Get all the dependencies (including transitive) of the given task
 */
export function getDependencies(turbo: TurboOutput, taskId: string): string[] {
  const task = turbo.tasks.find((task) => task.taskId === taskId);
  if (!task) {
    throw new Error(`Could not find task ${taskId}`);
  }

  let dependencies = task.dependencies;

  // get all transitive dependencies
  for (const dependency of dependencies) {
    dependencies = dependencies.concat(getDependencies(turbo, dependency));
  }

  // dedupe
  dependencies = [...new Set(dependencies)];

  return dependencies;
}
