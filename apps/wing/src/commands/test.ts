import { mkdtemp, readdir } from "fs/promises";
import { tmpdir } from "os";
import { basename, extname, join } from "path";
import { compile, Target } from "./compile";
import * as sdk from '@winglang/wingsdk';

const RED = "31";
const GREEN = "32";
const GRAY = "30;1";
const WHITE = "37;1";

export async function test(entrypoints: string[]) {
  for (const entrypoint of entrypoints) {
    await testOne(entrypoint);
  }
}

async function testOne(entrypoint: string) {
  const workdir = await mkdtemp(join(tmpdir(), "wing-test-"));
  await compile(entrypoint, { outDir: workdir, target: Target.SIM });
  const wsim = (await readdir(workdir)).find(f => extname(f) === ".wsim");
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
    (longest, result) => result.path.length > longest ? result.path.length : longest, 
    0);

  // if there are no inflight tests, add a dummy "pass" result
  // to indicate that compilation and preflight checks passed
  if (results.length === 0) {
    results.push({
      pass: true,
      path: "(no inflight tests)",
      traces: [],
    });
  }

  for (const result of results.sort(sortTests)) {
    const status = result.pass 
      ? color(GREEN, "pass") 
      : color(RED, "fail");

    const pathWithPadding = color(WHITE, result.path.padEnd(longestPath));
    const error = result.error 
      ? `\n${color(RED, result.error)}`
      : "";

    const sep = color(GRAY, ' | ');
    const row = [
      status,
      basename(entrypoint),
      pathWithPadding + error,
    ].join(sep);

    console.log(row);

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

function color(code: string, text: string) {
  if (process.stdout.isTTY) {
    return `\x1B[${code}m${text}\x1B[0m`;
  } else {
    return text;
  }
}
