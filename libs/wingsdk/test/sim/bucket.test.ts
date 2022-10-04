import { join } from "path";
import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as sim from "../../src/sim";
import { BucketClient } from "../../src/sim/bucket.inflight";
import * as testing from "../../src/testing";
import { mkdtemp } from "../util";

test("create a bucket", async () => {
  const outdir = mkdtemp();
  const app = new core.App({
    synthesizer: new sim.Synthesizer({ outdir }),
  });
  new cloud.Bucket(app.root, "my_bucket");
  app.synth();

  const s = await testing.Simulator.fromWingApp(join(outdir, "app.wx"));
  expect(s.getAttributes("root/my_bucket")).toBeDefined();
  expect(s.getProps("root/my_bucket")).toEqual({
    public: false,
  });
});

test("put and get objects from bucket", async () => {
  // GIVEN
  const s = await testing.Simulator.fromTree({
    tree: {
      root: {
        type: "constructs.Construct",
        children: {
          my_bucket: {
            type: "wingsdk.cloud.Bucket",
          },
        },
      },
      initOrder: ["root", "root/my_bucket"],
    },
  });
  const attrs = s.getAttributes("root/my_bucket");
  const client = new BucketClient(attrs.bucketAddr);

  const KEY = "greeting.txt";
  const VALUE = JSON.stringify({ msg: "Hello world!" });

  // WHEN
  await client.put(KEY, VALUE);
  const response = await client.get("greeting.txt");

  // THEN
  expect(response).toEqual(VALUE);
  await s.cleanup();
});

test("get invalid object throws an error", async () => {
  // GIVEN
  const s = await testing.Simulator.fromTree({
    tree: {
      root: {
        type: "constructs.Construct",
        children: {
          my_bucket: {
            type: "wingsdk.cloud.Bucket",
          },
        },
      },
      initOrder: ["root", "root/my_bucket"],
    },
  });
  const attrs = s.getAttributes("root/my_bucket");
  const client = new BucketClient(attrs.bucketAddr);

  // THEN
  await expect(() => client.get("unknown.txt")).rejects.toThrowError();
  await s.cleanup();
});
