#!/usr/bin/env node
// This file takes the benchmark results from
// hangar and converts them to a markdown table

// The JSON -> Markdown table converter is adapted to modern js from
// https://github.com/tsuz/json-to-markdown-table/blob/master/app.js

import { appendFileSync } from "node:fs";

/**
 * @param {any} json
 * @param {string[]} columns
 */
function Convert(json, columns) {
  return createTable(json, columns);
}

/**
 * @param {Object[]} object
 * @param {string[]} columns
 */
function createTable(object, columns) {
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
  object.forEach(function (/** @type {{ [x: string]: any; }} */ row) {
    const rows = columns.map((column) => {
      return base + formatDataTypes(row[column]);
    });

    // Remove rows with empty cells
    const empty = rows.every((/** @type {string | any[]} */ row) => {
      return row.length === 1;
    });

    if (!empty) outputString += rows.join("") + "|\n";
  });

  return outputString;
}

/**
 * Format datatypes
 * @param {any} value
 * @returns {string}
 */
function formatDataTypes(value) {
  if (value === undefined) {
    return "";
  } else if (value === null) {
    return "{null}";
  } else if (value instanceof Array) {
    const mapped = value.map(formatDataTypes);
    return "[ " + mapped.join(", ") + " ]";
  } else if (typeof value === "number") {
    // Round to 2 decimal places
    return `${Math.round(value * 100) / 100}`;
  } else if (value instanceof Object) {
    const mapped = Object.values(value).map(formatDataTypes);
    return JSON.stringify(mapped);
  }
  return value;
}

//

const jsonData = await import("../tools/hangar/results/report.json", {
  assert: { type: "json" },
});

const columns = ["name", "mean", "min", "max", "totalTime", "samples"];

const testResults = jsonData.default.testResults;

let resultString = "# Benchmark Results\n\n";

Object.keys(testResults).forEach((key) => {
  resultString += `## ${key}\n`;
  resultString += Convert(testResults[key], columns);
  resultString += "\n\n";
});

console.log(resultString);

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
