import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import * as testing from "../../src/simulator";
import { App } from "../../src/target-sim/app";
import { mkdtemp } from "../util";

test("onTrace", async () => {
  // GIVEN
  const app = new App({ outdir: mkdtemp(), entrypointDir: __dirname });
  cloud.Bucket._newBucket(app, "my_bucket", { public: false });
  const simfile = app.synth();

  let numTraces = 0;

  // WHEN
  const s = new testing.Simulator({ simfile });
  s.onTrace({
    callback: (_trace: cloud.Trace) => {
      numTraces++;
    },
  });
  await s.start();
  expect(s.getResourceConfig("/my_bucket").props.public).toEqual(false);

  const client = s.getResource("/my_bucket") as cloud.IBucketClient;
  await client.put("greeting.txt", "Hello world!");
  await s.stop();

  // THEN
  expect(numTraces).toEqual(5); // create resources, put operation, delete resources
});
