import { BucketClient } from "../../src/sim/bucket.inflight";
import { init as initBucket } from "../../src/sim/bucket.sim";

test("put and get objects from bucket", async () => {
  // GIVEN
  const { bucketAddr } = await initBucket({});
  const client = new BucketClient(bucketAddr);

  const KEY = "greeting.txt";
  const VALUE = { msg: "Hello world!" };

  // WHEN
  await client.put(KEY, VALUE);
  const response = await client.get("greeting.txt");

  // THEN
  expect(response).toEqual(VALUE);
});

test("get invalid object throws an error", async () => {
  // GIVEN
  const { bucketAddr } = await initBucket({});
  const client = new BucketClient(bucketAddr);

  // THEN
  await expect(() => client.get("unknown.txt")).rejects.toThrowError();
});
