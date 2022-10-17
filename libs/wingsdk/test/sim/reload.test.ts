import * as cloud from "../../src/cloud";
import * as testing from "../../src/testing";
import { mkdtemp } from "../../src/util";
import { synthSimulatedApp } from "./util";

test("reloading the simulator updates the state of the tree", async () => {
  // Create an app.wx file
  const workdir = mkdtemp();
  const appPath = synthSimulatedApp(
    (scope) => {
      new cloud.Bucket(scope, "my_bucket");
    },
    { workdir }
  );

  // Start the simulator
  const s = new testing.Simulator({ appPath });
  await s.start();
  expect(s.getProps("root/my_bucket").public).toEqual(false);

  // Update the app.wx file in-place
  synthSimulatedApp(
    (scope) => {
      new cloud.Bucket(scope, "my_bucket", { public: true });
    },
    { workdir }
  );

  // Reload the simulator
  await s.reload();
  expect(s.getProps("root/my_bucket").public).toEqual(true);
});
