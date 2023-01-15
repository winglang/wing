import { mkdtemp, readdir } from "fs/promises";
import { tmpdir } from "os";
import { extname, join } from "path";
import { compile, Target } from "./compile";
import * as sdk from '@winglang/wingsdk';

export async function test(entrypoint: string) {
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
  for (const result of results) {
    console.log(result.path, result.pass ? "pass" : "fail", result.error ?? "");
  }
}
