import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import * as sim from "../../src/target-sim";
import * as testing from "../../src/testing";
import { mkdtemp } from "../../src/util";

test("onTrace", async () => {
  // GIVEN
  const app = new sim.App({ outdir: mkdtemp() });
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
