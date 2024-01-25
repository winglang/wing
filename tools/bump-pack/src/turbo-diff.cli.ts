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

import { parseArgs } from "node:util";
import { setOutput } from "@actions/core";
import { getChangedFiles, getChanges, getTurboTaskData } from "./turbo-diff";

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

const changes = getChangedFiles(args.values.startRef, args.values.endRef);
console.log(changes.absoluteChanges);

const turboOutput = getTurboTaskData();

const taskData = getChanges(turboOutput, changes);

console.log(taskData);
if (process.env.GITHUB_ACTIONS) {
  setOutput("data", taskData);
}
