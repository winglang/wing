import { BucketClient } from "../../src/sim/bucket.inflight";
import { Simulator } from "../../src/testing/simulator";

test("put and get objects from bucket", async () => {
  // GIVEN
  const sim = await Simulator.fromResources({
    resources: {
      my_bucket: {
        type: "wingsdk.cloud.Bucket",
      },
    },
  });
  const attrs = sim.getAttributes("my_bucket");
  const client = new BucketClient(attrs.bucketAddr);

  const KEY = "greeting.txt";
  const VALUE = JSON.stringify({ msg: "Hello world!" });

  // WHEN
  await client.put(KEY, VALUE);
  const response = await client.get("greeting.txt");

  // THEN
  expect(response).toEqual(VALUE);
  await sim.cleanup();
});

test("get invalid object throws an error", async () => {
  // GIVEN
  const sim = await Simulator.fromResources({
    resources: {
      my_bucket: {
        type: "wingsdk.cloud.Bucket",
      },
    },
  });
  const attrs = sim.getAttributes("my_bucket");
  const client = new BucketClient(attrs.bucketAddr);

  // THEN
  await expect(() => client.get("unknown.txt")).rejects.toThrowError();
  await sim.cleanup();
});
