import { readFileSync, appendFileSync } from "fs";
import { parseRoundedJson } from "./util";
import { upsertPRComment } from "./github";
import { createTable } from "./table_report";

const MINIMUM_INTERESTING_PERCENTAGE = 3;

interface ProcessedBenchData {
  mean: number;
  moe: number;
  sd: number;
  name: string;
}

interface Deltas {
  meanBefore: number;
  moeBefore: number;
  meanAfter: number;
  moeAfter: number;
  maxSD: number;
  meanDiff: number;
  meanPercentDiff: number;
}

interface DifferentialBenches {
  [testName: string]: Deltas;
}

function avgBenches(
  benchList: any[]
): Record<string, ProcessedBenchData | undefined> {
  const benchValues: Record<string, ProcessedBenchData[]> = {};
  for (const bench of benchList) {
    for (const item of bench) {
      if (!benchValues[item.name]) {
        benchValues[item.name] = [];
      }
      const data = {
        name: item.name,
        mean: item["mean"],
        moe: item["moe"],
        sd: item["sd"],
      };
      benchValues[item.name].push(data);
    }
  }

  const returnData: Record<string, ProcessedBenchData> = {};
  for (const key in benchValues) {
    const data = benchValues[key];
    const mean = data.reduce((acc, cur) => acc + cur.mean, 0) / data.length;
    const moe = data.reduce((acc, cur) => acc + cur.moe, 0) / data.length;
    const sd = data.reduce((acc, cur) => acc + cur.sd, 0) / data.length;
    returnData[key] = {
      name: key,
      mean,
      moe,
      sd,
    };
  }

  return returnData;
}

function getLocalBench(filename: string) {
  try {
    const benchData = parseRoundedJson(readFileSync(filename, "utf-8"));
    return [benchData.files[0].groups[0].benchmarks];
  } catch (e) {
    console.warn(`Could not find local bench file ${filename}`);
    return [];
  }
}

export async function compareBenchmarks(
  previousSource: string,
  targetSource: string
): Promise<DifferentialBenches> {
  const previousResult = getLocalBench(previousSource);
  const targetResult = getLocalBench(targetSource);

  const previousBench = avgBenches(previousResult);
  const targetBench = avgBenches(targetResult);

  console.log(`${previousSource} => ${targetSource}`);

  const fmtNum = (num: number | typeof NaN | undefined, unit: string = "") => {
    if (num === undefined || isNaN(num)) {
      return "...";
    } else if (unit === "%" || unit === "") {
      return Math.round(num * 100) / 100 + unit;
    } else {
      return Math.round(num) + unit;
    }
  };

  const differences: DifferentialBenches = {};

  for (const [itemName, newData] of Object.entries(targetBench)) {
    const oldData = previousBench[itemName];

    differences[itemName] = {} as Deltas;

    differences[itemName].moeBefore = oldData?.moe ?? NaN;
    differences[itemName].meanBefore = oldData?.mean ?? NaN;

    differences[itemName].moeAfter = newData?.moe ?? NaN;
    differences[itemName].meanAfter = newData?.mean ?? NaN;

    differences[itemName].maxSD = Math.round(Math.max(
      newData?.sd ?? NaN,
      oldData?.sd ?? NaN
    ) * 1.5);

    differences[itemName].meanDiff =
      Math.round(
        (differences[itemName].meanAfter - differences[itemName].meanBefore) *
          100
      ) / 100;
    differences[itemName].meanPercentDiff =
      Math.round(
        ((differences[itemName].meanAfter - differences[itemName].meanBefore) /
          differences[itemName].meanBefore) *
          10000
      ) / 100;
  }

  // create a markdown table of the differences
  let markdown = `| Benchmark | Before | After | Change |\n`;
  markdown += `| :-- | --: | --: | --: |\n`;
  let colors = "";

  let hasInterestingResults = false;

  for (const key in differences) {
    const diff = differences[key];
    let prependSign = "";
    let appendColor = "";
    if (diff.meanDiff > 0) {
      prependSign = "+";
      appendColor = "🟥";
    } else if (diff.meanDiff <= 0) {
      appendColor = "🟩";
    }

    if (diff.meanPercentDiff <= MINIMUM_INTERESTING_PERCENTAGE) {
      appendColor = "⬜";
    } else {
      hasInterestingResults = true;
    }

    colors += appendColor;

    let changeText = !!diff.meanPercentDiff
      ? `${prependSign}${fmtNum(diff.meanDiff, "ms")} (${prependSign}${fmtNum(
          diff.meanPercentDiff,
          "%"
        )})${appendColor}`
      : "...";

    let beforeText = fmtNum(diff.meanBefore, "ms");
    if (!isNaN(diff.meanBefore)) {
      beforeText += `±${fmtNum(diff.moeBefore)}`;
    }
    let afterText = fmtNum(diff.meanAfter, "ms");
    if (!isNaN(diff.meanAfter)) {
      afterText += `±${fmtNum(diff.moeAfter)}`;
    }

    markdown += `| ${key} | ${beforeText} | ${afterText} | ${changeText} |\n`;
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

    if (hasInterestingResults && prNumber) {
      const comment = `\
## Benchmarks

<details>
<summary>Comparison to Baseline ${colors}</summary>

${markdown}

⬜ Within 1.5 standard deviations
🟩 Faster, Above 1.5 standard deviations
🟥 Slower, Above 1.5 standard deviations

_Benchmarks may vary outside of normal expectations, especially when running in GitHub Actions CI._

</details>

<details>
<summary>Results</summary>

${createTable(targetResult[0])}

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

export async function checkThreshold(differences: DifferentialBenches, threshold: number) {
  let hasFailures = false;
  for (const testName in differences) {
    const diff = differences[testName];
    if (diff.meanPercentDiff > threshold) {
      console.error(
        `(Above ${threshold}%) "${testName}" increased by ${diff.meanPercentDiff}%`
      );
      hasFailures = true;
    }
  }

  if (hasFailures) {
    process.exit(1);
  }
}