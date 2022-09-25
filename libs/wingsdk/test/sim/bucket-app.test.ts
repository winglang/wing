import { BucketClient } from "../../src/sim/bucket.inflight";
import * as testing from "../../src/testing";

test("basic", async () => {
  // GIVEN
  const sim = await testing.Simulator.fromResources({
    resources: {
      my_bucket: {
        type: "wingsdk.cloud.Bucket",
      },
    },
  });
  const attrs = sim.getAttributes("my_bucket");
  const client = new BucketClient(attrs.bucketAddr);

  // WHEN
  const KEY = "greeting.txt";
  const VALUE = "Hello, world!";

  await client.put(KEY, VALUE);
  const response = await client.get("greeting.txt");

  // THEN
  expect(response).toEqual(VALUE);
});
