import { writeFile } from "fs";
import { parse, resolve } from "path";
import { std } from "@winglang/sdk";
import chalk from "chalk";

export function printResults(
  testResults: { testName: string; results: std.TestResult[] }[],
  duration: number
) {
  const durationInSeconds = duration / 1000;
  const totalSum = testResults.length;
  const failing = testResults.filter(({ results }) => results.some(({ pass }) => !pass));
  const passing = testResults.filter(({ results }) => results.every(({ pass }) => !!pass));
  const failingTestsNumber = failing.reduce(
    (acc, { results }) => acc + results.filter(({ pass }) => !pass).length,
    0
  );
  const passingTestsNumber = testResults.reduce(
    (acc, { results }) => acc + results.filter(({ pass }) => !!pass).length,
    0
  );
  console.log(" "); // for getting a new line- \n does't seem to work :(
  const areErrors = failing.length > 0 && totalSum > 1;
  const showTitle = totalSum > 1;

  const res = [];

  if (showTitle) {
    // prints a list of the tests names with an icon
    res.push(`Results:`);
    res.push(...passing.map(({ testName }) => `    ${chalk.green("✓")} ${testName}`));
    res.push(...failing.map(({ testName }) => `    ${chalk.red("×")} ${testName}`));
  }

  if (areErrors) {
    // prints error messages form failed tests
    res.push(" ");
    res.push("Errors:");
    res.push(
      ...failing.map(({ testName, results }) =>
        [
          `At ${testName}`,
          results.filter(({ pass }) => !pass).map(({ error }) => chalk.red(error)),
        ].join("\n")
      )
    );
  }

  // prints a summary of how many tests passed and failed
  res.push(" ");
  res.push(
    `${chalk.dim("Tests")}${failingTestsNumber ? chalk.red(` ${failingTestsNumber} failed`) : ""}${
      failingTestsNumber && passingTestsNumber ? chalk.dim(" |") : ""
    }${passingTestsNumber ? chalk.green(` ${passingTestsNumber} passed`) : ""} ${chalk.dim(
      `(${failingTestsNumber + passingTestsNumber})`
    )}`
  );
  // prints a summary of how many tests files passed and failed
  res.push(
    `${chalk.dim("Test Files")}${failing.length ? chalk.red(` ${failing.length} failed`) : ""}${
      failing.length && passing.length ? chalk.dim(" |") : ""
    }${passing.length ? chalk.green(` ${passing.length} passed`) : ""} ${chalk.dim(
      `(${totalSum})`
    )}`
  );

  // prints the test duration
  res.push(
    `${chalk.dim("Duration")} ${Math.floor(durationInSeconds / 60)}m${(
      durationInSeconds % 60
    ).toFixed(2)}s`
  );

  console.log(res.filter((value) => !!value).join("\n"));
}

interface TestResultsJson {
  duration: number;
  results: Record<string, Record<string, std.TestResult>>;
}

export function writeResultsToFile(
  testResults: { testName: string; results: std.TestResult[] }[],
  duration: number,
  filePath: string
) {
  const output: TestResultsJson = { duration, results: {} };
  for (const result of testResults) {
    output.results[result.testName] = result.results.reduce(
      (acc, item) => ({ ...acc, [item.path.replace(/[\w+\/\\.-]+test:/, "")]: item }),
      {}
    );
  }

  writeFile(resolve(filePath), JSON.stringify(output, null, 2), { encoding: "utf-8" }, (error) => {
    if (error) {
      console.error(`error while writing test output file: ${error}`);
    }
  });
}

export function validateOutputFilePath(filePath: string) {
  const { ext } = parse(filePath);

  if (ext !== ".json") {
    throw new Error(`only .json output files are supported. (found "${ext}")`);
  }
}
