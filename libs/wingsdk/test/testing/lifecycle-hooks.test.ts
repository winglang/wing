import * as cloud from "../../src/cloud";
import * as sim from "../../src/target-sim";
import * as testing from "../../src/testing";
import { SimulatorEvent } from "../../src/testing";
import { mkdtemp } from "../../src/util";

test("lifecycle hooks - onEvent", async () => {
  // GIVEN
  const app = new sim.App({ outdir: mkdtemp() });
  new cloud.Bucket(app, "my_bucket", { public: false });
  const simfile = app.synth();

  let numEvents = 0;

  const lifecycleHooks = {
    onEvent: (_event: SimulatorEvent) => {
      numEvents++;
    },
  };

  // WHEN
  const s = new testing.Simulator({ simfile, lifecycleHooks });
  await s.start();
  expect(s.getProps("root/my_bucket").public).toEqual(false);

  const client = s.getResourceByPath("root/my_bucket") as cloud.IBucketClient;
  await client.put("greeting.txt", "Hello world!");
  await s.stop();

  // THEN
  expect(numEvents).toEqual(3); // create resource, put operation, delete resource
});
