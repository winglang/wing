import { basename } from "path";
import { bench, describe } from "vitest";
import { runWingCommand } from "./utils";
import { benchmarksTestDir, walkdir } from "./paths";
import { parseMetaCommentFromPath } from "./meta_comment";

describe("compile", async () => {
  const targets = ["sim", "tf-aws"];
  const files: string[] = [];
  for await (const wingFile of walkdir(benchmarksTestDir)) {
    if (wingFile.endsWith(".w")) {
      files.push(wingFile);
    }
  }
  for (const wingFile of files) {
    for (const target of targets) {
      bench(
        `${basename(wingFile)} | ${target}`,
        async () => {
          await runWingCommand({
            cwd: benchmarksTestDir,
            wingFile: wingFile,
            args: ["compile", "--target", target],
            shouldSucceed: true,
          });
        },
        {
          warmupIterations: 1,
          iterations: 2,
          setup: async (_task, type) => {
            if (type !== "warmup") return;
            _task.addEventListener("complete", async (e) => {
              const task = e.task;
              const meanTime = task.result?.mean;
              if (!meanTime) {
                throw new Error("Could not get mean time for current test");
              }

              const metaComment = parseMetaCommentFromPath(wingFile);
              if (!metaComment) {
                // no comment found
                return;
              }
              
              const foundThreshold = metaComment.cases.find(
                (c) => c.target === target
              )?.maxMeanTime;

              if (!foundThreshold) {
                // no threshold found
                return;
              }

              if (meanTime > foundThreshold) {
                throw new Error(
                  `Mean time ${meanTime}ms is greater than threshold ${foundThreshold}ms`
                );
              }
            });
          },
        }
      );
    }
  }
});
