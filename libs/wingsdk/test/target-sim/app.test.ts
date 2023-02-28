import { basename } from "path";
import { simulatorJsonOf } from "./util";
import { Bucket } from "../../src/cloud";
import * as sim from "../../src/target-sim";
import { mkdtemp } from "../../src/util";

test("app name can be customized", async () => {
  // GIVEN
  const APP_NAME = "my-app";

  // WHEN
  const app = new sim.App({ outdir: mkdtemp(), name: APP_NAME });
  Bucket._newBucket(app, "my_bucket");
  const simfile = app.synth();

  // THEN
  expect(basename(simfile)).toEqual(`${APP_NAME}.wsim`);
  expect(JSON.stringify(simulatorJsonOf(simfile))).toContain("my_bucket");
});
