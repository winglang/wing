import { basename } from "path";
import { bench, describe } from "vitest";
import { runWingCommand } from "./utils";
import { benchmarksTestDir, walkdir } from "./paths";
import { readFile } from "fs-extra";
import YAML from "yaml";

const targets = ["sim", "tf-aws"];
const files: string[] = [];
for await (const wingFile of walkdir(benchmarksTestDir)) {
  if (wingFile.endsWith(".w")) {
    files.push(wingFile);
  }
}

describe("compile", async () => {
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

              // read data from file
              const wingData = await readFile(wingFile, "utf-8");

              // regex parse the comment to get the threshold
              const specialCommentRegex = /^\/\*\\\n(.+)\\\*\/$/gms;
              const specialComment = specialCommentRegex.exec(wingData);
              const rawYaml = specialComment?.[1];
              if (!rawYaml) {
                throw new Error("Could not parse special test comment");
              }

              const yaml = YAML.parse(rawYaml);
              const cases: any[] = yaml.cases;
              const foundThreshold = cases.find(
                (c) => c.target === target
              ).meanThreshold;

              if (!foundThreshold) {
                throw new Error(
                  `Could not find threshold for target ${target}`
                );
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
