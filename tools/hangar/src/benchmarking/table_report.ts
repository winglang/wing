// This file takes the benchmark results from
// hangar and converts them to a markdown table

// The JSON -> Markdown table converter is adapted to ts from
// https://github.com/tsuz/json-to-markdown-table/blob/master/app.js

import { appendFileSync } from "fs";

export const DEFAULT_COLUMNS = ["name", "mean", "min", "max", "moe", "sd"];

export function createTable(
  object: object[],
  columns: string[] = DEFAULT_COLUMNS
) {
  const base = "|";
  // Create columns
  let outputString = columns.join(base);
  outputString = base + outputString + "|\n";

  // Create table format in markdown
  columns.forEach(() => {
    outputString += base + "----";
  });
  outputString += base + "\n";

  // Create rows
  object.forEach(function (row: { [x: string]: any }) {
    const rows = columns.map((column) => {
      return base + formatDataTypes(row[column]);
    });

    // Remove rows with empty cells
    const empty = rows.every((row: string | any[]) => {
      return row.length === 1;
    });

    if (!empty) outputString += rows.join("") + "|\n";
  });

  return outputString;
}

function formatDataTypes(value: any): string {
  if (value === undefined || value === null) {
    return "...";
  } else if (value instanceof Array) {
    return "[ " + value.map(formatDataTypes).join(", ") + " ]";
  } else if (typeof value === "number") {
    return `${Math.round(value)}ms`;
  } else if (value instanceof Object) {
    return JSON.stringify(Object.values(value).map(formatDataTypes));
  }
  return value;
}

export async function printTable(jsonData: any) {
  const testResults = jsonData.testResults;

  let resultString = "# Benchmark Results\n\n";

  for (const key in testResults) {
    console.table(testResults[key]);
    resultString += createTable(testResults[key]);
    resultString += "\n\n";
  }

  if (process.env.GITHUB_ACTIONS === "true") {
    // we are running in a github action and we should output some useful stuff
    const githubStepSummaryFile = process.env.GITHUB_STEP_SUMMARY;
    if (!githubStepSummaryFile) {
      throw new Error(
        "Missing github action environment variable GITHUB_STEP_SUMMARY"
      );
    }

    appendFileSync(githubStepSummaryFile, resultString);
  }
}
