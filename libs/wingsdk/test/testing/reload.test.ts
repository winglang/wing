import { test, expect } from "vitest";
import { Bucket } from "../../src/cloud";
import * as sim from "../../src/target-sim";
import * as testing from "../../src/testing";
import { mkdtemp } from "../util";

test("reloading the simulator updates the state of the tree", async () => {
  let workdir = mkdtemp();

  // Create a .wsim file
  const app = new sim.App({ outdir: workdir });
  const bucket1 = Bucket._newBucket(app, "my_bucket", { public: false });
  bucket1.display.hidden = false;
  const simfile = app.synth();

  // Start the simulator
  const s = new testing.Simulator({ simfile });
  await s.start();
  expect(s.getResourceConfig("/my_bucket").props.public).toEqual(false);
  expect(s.tree().rawData().tree.children?.my_bucket.display?.hidden).toEqual(
    false
  );

  // Update the .wsim file in-place
  const app2 = new sim.App({ outdir: workdir });
  const bucket2 = Bucket._newBucket(app2, "my_bucket", { public: true });
  bucket2.display.hidden = true;
  app2.synth();

  // Reload the simulator
  await s.reload();
  expect(s.getResourceConfig("/my_bucket").props.public).toEqual(true);
  expect(s.tree().rawData().tree.children?.my_bucket.display?.hidden).toEqual(
    true
  );
});
