import { basename, join } from "path";
import { test, expect } from "vitest";
import { simulatorJsonOf } from "./util";
import { Bucket } from "../../src/cloud";
import * as sim from "../../src/target-sim";
import { mkdtemp } from "../util";

test("app name can be customized", async () => {
  // GIVEN
  const APP_NAME = "my-app";

  // WHEN
  const outdir = join(mkdtemp(), `${APP_NAME}.wsim`);
  const app = new sim.App({ outdir, name: APP_NAME });
  Bucket._newBucket(app, "my_bucket");
  const simfile = app.synth();

  // THEN
  expect(basename(simfile)).toEqual(`${APP_NAME}.wsim`);
  expect(JSON.stringify(simulatorJsonOf(simfile))).toContain("my_bucket");
});
