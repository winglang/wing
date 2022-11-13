import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as sim from "../../src/target-sim";
import { IFunctionClient } from "../../src/target-sim";
import * as testing from "../../src/testing";
import { mkdtemp } from "../../src/util";

test("reloading the simulator updates the state of the tree", async () => {
  let workdir = mkdtemp();

  // Create an app.wx file
  const app = new sim.App({ outdir: workdir });
  new cloud.Bucket(app, "my_bucket", { public: false });
  const simfile = app.synth();

  // Start the simulator
  const s = new testing.Simulator({ simfile });
  await s.start();
  expect(s.getProps("root/my_bucket").public).toEqual(false);

  // Update the app.wx file in-place
  const app2 = new sim.App({ outdir: workdir });
  new cloud.Bucket(app2, "my_bucket", { public: true });
  app2.synth();

  // Reload the simulator
  await s.reload();
  expect(s.getProps("root/my_bucket").public).toEqual(true);
});

const INFLIGHT_CODE = core.NodeJsCode.fromInline(`
async function $proc($cap, message) {
    if (message === "BAD MESSAGE") {
        throw new Error("ERROR");
    }
}`);

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

test("reloading the simulator after working with ws", async () => {
  let workdir = mkdtemp();

  // GIVEN
  const app = new sim.App({ outdir: workdir });
  const handler = new core.Inflight({
    code: INFLIGHT_CODE,
    entrypoint: "$proc",
  });
  const queue = new cloud.Queue(app, "my_queue", {
    initialMessages: ["A", "B", "C", "D", "E", "F"],
  });
  queue.onMessage(handler, { batchSize: 5 });
  const simfile = app.synth();

  const s = new testing.Simulator({ simfile });
  await s.start();

  const fnClient = s.getResourceByPath(
    "root/my_queue/OnMessage-236ff3d72ad0ae46"
  ) as IFunctionClient;

  await sleep(200);

  // Update the app.wx file in-place
  const app2 = new sim.App({ outdir: workdir });
  new cloud.Bucket(app2, "my_bucket", { public: true });
  app2.synth();

  // THEN
  expect(await fnClient.timesCalled()).toEqual(2);

  await s.reload();

  expect(s.getProps("root/my_bucket").public).toEqual(true);
});

afterAll((done) => {
  done();
});
