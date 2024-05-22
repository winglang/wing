import { mkdir, writeFile } from "fs/promises";
import { parse } from "path";
import { std } from "@winglang/sdk";
import chalk from "chalk";
import { SnapshotResult } from "./snapshots";
import { SingleTestResult } from "./test";

export function printResults(testResults: SingleTestResult[], duration: number) {
  const durationInSeconds = duration / 1000;
  const totalSum = testResults.length;
  const unsupportedFiles = testResults.filter(({ results }) =>
    results.some(({ unsupported }) => unsupported)
  );
  const failing = testResults.filter(({ results }) =>
    results.some(({ pass, unsupported }) => !pass && !unsupported)
  );
  const passing = testResults.filter(({ results }) => results.every(({ pass }) => !!pass));
  const failingTestsNumber = failing.reduce(
    (acc, { results }) =>
      acc + results.filter(({ pass, unsupported }) => !pass && !unsupported).length,
    0
  );
  const unsupportedTestsNumber = unsupportedFiles.reduce(
    (acc, { results }) => acc + results.filter(({ unsupported }) => !!unsupported).length,
    0
  );
  const passingTestsNumber = testResults.reduce(
    (acc, { results }) => acc + results.filter(({ pass }) => !!pass).length,
    0
  );
  const areErrors = failing.length + unsupportedFiles.length > 0 && totalSum > 1;
  const showTitle = totalSum > 1;

  const res = [];

  if (showTitle) {
    // prints a list of the tests names with an icon
    res.push("");
    res.push(`Results:`);
    res.push(...passing.map(({ testName }) => `    ${chalk.green("✓")} ${testName}`));
    res.push(...failing.map(({ testName }) => `    ${chalk.red("×")} ${testName}`));
    res.push(...unsupportedFiles.map(({ testName }) => `    ${chalk.yellow("?")} ${testName}`));
  }

  if (areErrors) {
    // prints error messages form failed tests
    res.push("");
    res.push("Errors:");
    res.push(
      ...[...failing, ...unsupportedFiles].map(({ testName, results }) =>
        [
          `At ${testName}`,
          results.reduce(
            (acc: string[], { pass, error, unsupported }) =>
              pass ? acc : unsupported && error ? [...acc, error] : [...acc, chalk.red(error)],
            []
          ),
        ].join("\n")
      )
    );
  }

  // prints a summary of how many tests passed and failed
  res.push("");
  const testCount = [
    failingTestsNumber && chalk.red(` ${failingTestsNumber} failed`),
    passingTestsNumber && chalk.green(` ${passingTestsNumber} passed`),
    unsupportedTestsNumber && chalk.yellow(` ${unsupportedTestsNumber} unsupported`),
  ]
    .filter((item) => !!item)
    .join(chalk.dim(" |"));

  const fileCount = [
    failing.length && chalk.red(` ${failing.length} failed`),
    passing.length && chalk.green(` ${passing.length} passed`),
    unsupportedFiles.length && chalk.yellow(` ${unsupportedFiles.length} unsupported`),
  ]
    .filter((item) => !!item)
    .join(chalk.dim(" |"));

  res.push(
    `${chalk.dim("Tests")}${testCount} ${chalk.dim(
      `(${failingTestsNumber + passingTestsNumber + unsupportedTestsNumber})`
    )}`
  );

  const snapshotSummary = renderSnapshotSummary(testResults);

  // print snapshot summary
  res.push(`${chalk.dim("Snapshots")} ${snapshotSummary}`);

  // prints a summary of how many tests files passed and failed
  res.push(`${chalk.dim("Test Files")}${fileCount} ${chalk.dim(`(${totalSum})`)}`);

  // prints the test duration
  res.push(
    `${chalk.dim("Duration")} ${Math.floor(durationInSeconds / 60)}m${(
      durationInSeconds % 60
    ).toFixed(2)}s`
  );

  console.log(res.join("\n"));
}

export interface TestResultsJson {
  duration: number;
  platforms: string[];
  results: Record<string, Record<string, std.TestResult>>;
}

function renderSnapshotSummary(results: SingleTestResult[]) {
  const stats: { [key: string]: number } = {};

  // count the number of each snapshot result
  for (const t of results) {
    stats[t.snapshot] = (stats[t.snapshot] ?? 0) + 1;
  }

  // color map
  const snapshotSummaryColors = {
    [SnapshotResult.NEW]: chalk.yellow,
    [SnapshotResult.UPDATED]: chalk.yellow,
    [SnapshotResult.VERIFIED]: chalk.green,
    [SnapshotResult.SKIPPED]: chalk.dim,
    [SnapshotResult.MISMATCH]: chalk.red,
  };

  const snapshotSummary = [];
  for (const t of [
    SnapshotResult.MISMATCH,
    SnapshotResult.VERIFIED,
    SnapshotResult.NEW,
    SnapshotResult.UPDATED,
    SnapshotResult.SKIPPED,
  ]) {
    const count = t in stats ? stats[t] : 0;
    if (count > 0) {
      snapshotSummary.push(snapshotSummaryColors[t](`${stats[t]} ${t.toLowerCase()}`));
    }
  }

  return snapshotSummary.join(chalk.dim(" | "));
}

export async function writeResultsToFile(
  testResults: { testName: string; results: std.TestResult[] }[],
  duration: number,
  filePath: string,
  platforms: string[]
) {
  const output: TestResultsJson = { duration, platforms, results: {} };
  for (const result of testResults) {
    output.results[result.testName] = result.results.reduce(
      (acc, item) => ({ ...acc, [item.path.replace(/[\w+\/\\.-]+test:/, "")]: item }),
      {}
    );
  }

  try {
    const { dir } = parse(filePath);
    if (dir !== "") {
      await mkdir(dir, { recursive: true });
    }
    await writeFile(filePath, JSON.stringify(output, null, 2), { encoding: "utf-8" });
  } catch (error) {
    console.error(`error while writing test output file: ${error}`);
  }
}

export function validateOutputFilePath(filePath: string) {
  const { ext } = parse(filePath);

  if (ext !== ".json") {
    throw new Error(`only .json output files are supported. (found "${ext}")`);
  }
}
