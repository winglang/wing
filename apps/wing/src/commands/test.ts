import { mkdtemp, readdir } from "fs/promises";
import { tmpdir } from "os";
import { basename, extname, join } from "path";
import { compile, Target } from "./compile";
import * as chalk from "chalk";
import * as sdk from "@winglang/sdk";

export async function test(entrypoints: string[]) {
  for (const entrypoint of entrypoints) {
    await testOne(entrypoint);
  }
}

async function testOne(entrypoint: string) {
  const workdir = await mkdtemp(join(tmpdir(), "wing-test-"));
  await compile(entrypoint, { outDir: workdir, target: Target.SIM });
  const wsim = (await readdir(workdir)).find((f) => extname(f) === ".wsim");
  if (!wsim) {
    throw new Error("no .wsim file found in output directory");
  }

  const simfile = join(workdir, wsim);
  const s = new sdk.testing.Simulator({ simfile });
  await s.start();
  const results = await s.runAllTests();
  await s.stop();

  // print report
  let hasFailures = false;

  // find the longest `path` of all the tests
  const longestPath = results.reduce(
    (longest, result) =>
      result.path.length > longest ? result.path.length : longest,
    0
  );

  // if there are no inflight tests, add a dummy "pass" result
  // to indicate that compilation and preflight checks passed
  if (results.length === 0) {
    results.push({
      pass: true,
      path: '',
      traces: [],
    });
  }

  for (const result of results.sort(sortTests)) {
    const status = result.pass ? chalk.green("pass") : chalk.red("fail");

    const details = new Array<string>();

    // add any log messages that were emitted during the test
    for (const log of result.traces.filter(t => t.type == "log")) {
      details.push(chalk.gray(log.data.message));
    }

    // if the test failed, add the error message and trace
    if (result.error) {
      details.push(...result.error.split("\n").map(l => chalk.red(l)));
    }

    // construct the first row of the test result by collecting the various components and joining
    // them with spaces.

    const firstRow = new Array<string>();
    firstRow.push(status);

    // if we have details, surround the rows with a box, otherwise, just print a line
    if (details.length > 0) {
      firstRow.push(chalk.gray("┌"));
    } else {
      firstRow.push(chalk.gray("─"));
    }

    firstRow.push(basename(entrypoint));

    if (result.path?.length > 0) {
      firstRow.push(chalk.gray("»"));
      firstRow.push(chalk.whiteBright(result.path.padEnd(longestPath)));
    } else {
      firstRow.push(chalk.gray("(no tests)"));

    }

    // okay we are ready to print the test result

    // print the primary description of the test
    console.log(firstRow.join(" "));

    // print additional rows that are related to this test
    for (let i = 0; i < details.length; i++) {
      const left = i === details.length - 1 ? "└" : "│";
      console.log(`    ${chalk.gray(` ${left} `)}${details[i]}`);
    }

    if (!result.pass) {
      hasFailures = true;
    }
  }

  if (hasFailures) {
    process.exit(1);
  }
}

function sortTests(a: sdk.testing.TestResult, b: sdk.testing.TestResult) {
  if (a.pass && !b.pass) {
    return -1;
  }
  if (!a.pass && b.pass) {
    return 1;
  }
  return a.path.localeCompare(b.path);
}
