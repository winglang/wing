import { test, expect } from "vitest";
import { Bucket } from "../../src/cloud";
import * as testing from "../../src/simulator";
import { Node } from "../../src/std";
import { App } from "../../src/target-sim/app";
import { mkdtemp } from "../util";

test("reloading the simulator updates the state of the tree", async () => {
  let workdir = mkdtemp();

  // Create a .wsim file
  const app = new App({ outdir: workdir, entrypointDir: __dirname });
  const bucket1 = new Bucket(app, "my_bucket", { public: false });
  Node.of(bucket1).hidden = false;
  const simfile = app.synth();

  // Start the simulator
  const s = new testing.Simulator({ simfile });
  await s.start();
  expect(s.getResourceConfig("/my_bucket").props.public).toEqual(false);
  expect(s.tree().rawData().tree.children?.my_bucket.display?.hidden).toEqual(
    false
  );

  // Update the .wsim file in-place
  const app2 = new App({ outdir: workdir, entrypointDir: __dirname });
  const bucket2 = new Bucket(app2, "my_bucket", { public: true });
  Node.of(bucket2).hidden = true;
  app2.synth();

  // Reload the simulator
  await s.reload();
  expect(s.getResourceConfig("/my_bucket").props.public).toEqual(true);
  expect(s.tree().rawData().tree.children?.my_bucket.display?.hidden).toEqual(
    true
  );
});
