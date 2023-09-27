import { readFileSync, appendFileSync } from "fs";
import { parseRoundedJson } from "./util";
import { getBenchForBranch, upsertPRComment } from "./github";
import { createTable } from "./table_report";

function avgBenches(benchList: any[]): Record<string, any> {
  const mainBenchMeanOfMeans: Record<string, any> = {};
  for (const bench of benchList) {
    for (const item of bench) {
      if (!mainBenchMeanOfMeans[item.name]) {
        mainBenchMeanOfMeans[item.name] = [];
      }
      mainBenchMeanOfMeans[item.name].push(item["mean"]);
    }
  }
  for (const key in mainBenchMeanOfMeans) {
    const sum = mainBenchMeanOfMeans[key].reduce(
      (a: number, b: number) => a + b,
      0
    );
    mainBenchMeanOfMeans[key] = sum / mainBenchMeanOfMeans[key].length;
  }

  return mainBenchMeanOfMeans;
}

function getLocalBench(filename: string) {
  try {
    const benchData = parseRoundedJson(readFileSync(filename, "utf-8"));
    return [benchData.testResults.compile];
  } catch (e) {
    console.warn(`Could not find local bench file ${filename}`);
    return [];
  }
}

async function getDataFromSource(source: string) {
  if (source.startsWith(".") || source.startsWith("/")) {
    return getLocalBench(source);
  } else {
    return await getBenchForBranch(source);
  }
}

export async function compareBenchmarks(
  previousSource: string,
  targetSource: string
) {
  const previousResult = await getDataFromSource(previousSource);
  const targetResult = await getDataFromSource(targetSource);

  const previousBench = avgBenches(previousResult);
  const targetBench = avgBenches(targetResult);

  console.log(`${previousSource} => ${targetSource}`);

  const differences: Record<string, any> = {};

  for (const [itemName, newMean] of Object.entries(targetBench)) {
    const oldMean = previousBench[itemName];

    differences[itemName] = {};
    differences[itemName].meanBefore = oldMean ?? NaN;
    differences[itemName].meanAfter = newMean;
    differences[itemName].meanDiff =
      Math.round((newMean - oldMean) * 100) / 100;
    differences[itemName].meanPercentDiff =
      Math.round(((newMean - oldMean) / oldMean) * 10000) / 100;
  }

  const formatNumber = (num: number | typeof NaN | undefined, unit: string) => {
    if (num === undefined || isNaN(num)) {
      return "...";
    } else if (unit === "%") {
      return Math.round(num * 10) / 10 + unit;
    } else {
      return Math.round(num) + unit;
    }
  };

  // create a markdown table of the differences
  let markdown = `| Benchmark | Before | After | Change |\n`;
  markdown += `| :-- | --: | --: | --: |\n`;
  for (const key in differences) {
    const diff = differences[key];
    const changeText = !!diff.meanPercentDiff
      ? `${formatNumber(diff.meanDiff, "ms")} (${formatNumber(
          diff.meanPercentDiff,
          "%"
        )})`
      : "...";
    markdown += `| ${key} | ${formatNumber(
      diff.meanBefore,
      "ms"
    )} | ${formatNumber(diff.meanAfter, "ms")} | ${changeText} |\n`;
  }

  console.table(differences);

  if (process.env.GITHUB_ACTIONS === "true") {
    // we are running in a github action and we should output some useful stuff
    const githubStepSummaryFile = process.env.GITHUB_STEP_SUMMARY;
    if (!githubStepSummaryFile) {
      throw new Error(
        "Missing github action environment variable GITHUB_STEP_SUMMARY"
      );
    }

    appendFileSync(githubStepSummaryFile, markdown);

    const prNumber = parseInt(process.env.BENCH_PR ?? "");

    if (prNumber) {
      const comment = `\
## Benchmarks

<details>
<summary>Results</summary>

${createTable(targetResult[0])}

</details>

<details>
<summary>Comparison to ${previousSource}</summary>

${markdown}

</details>

###### Last Updated (UTC) ${new Date()
        .toISOString()
        .slice(0, 16)
        .replace("T", " ")}
`;
      await upsertPRComment(prNumber, comment);
    }
  }

  return differences;
}
