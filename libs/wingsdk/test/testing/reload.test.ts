import * as cloud from "../../src/cloud";
import * as sim from "../../src/target-sim";
import * as testing from "../../src/testing";
import { mkdtemp } from "../../src/util";

test("reloading the simulator updates the state of the tree", async () => {
  let workdir = mkdtemp();

  // Create an .wx file
  const app = new sim.App({ outdir: workdir });
  new cloud.Bucket(app, "my_bucket", { public: false });
  const simfile = app.synth();

  // Start the simulator
  const s = new testing.Simulator({ simfile });
  await s.start();
  expect(s.getResourceConfig("main/my_bucket").props.public).toEqual(false);

  // Update the .wx file in-place
  const app2 = new sim.App({ outdir: workdir });
  new cloud.Bucket(app2, "my_bucket", { public: true });
  app2.synth();

  // Reload the simulator
  await s.reload();
  expect(s.getResourceConfig("main/my_bucket").props.public).toEqual(true);
});
