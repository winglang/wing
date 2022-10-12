import * as cloud from "../../src/cloud";
import { BucketClient } from "../../src/sim/bucket.inflight";
import * as testing from "../../src/testing";
import { simulatorJsonOf, synthSimulatedApp } from "./util";

test("create a bucket", async () => {
  // GIVEN
  const appPath = synthSimulatedApp((scope) => {
    new cloud.Bucket(scope, "my_bucket");
  });

  const s = new testing.Simulator({ appPath });
  await s.start();
  expect(s.getAttributes("root/my_bucket")).toEqual({
    bucketAddr: expect.any(String),
  });
  expect(s.getProps("root/my_bucket")).toEqual({
    public: false,
  });
  await s.stop();

  expect(simulatorJsonOf(appPath)).toMatchSnapshot();
});

test("put and get objects from bucket", async () => {
  // GIVEN
  const appPath = synthSimulatedApp((scope) => {
    new cloud.Bucket(scope, "my_bucket");
  });
  const s = new testing.Simulator({ appPath });
  await s.start();

  const attrs = s.getAttributes("root/my_bucket");
  const client = new BucketClient(attrs.bucketAddr);

  const KEY = "greeting.txt";
  const VALUE = JSON.stringify({ msg: "Hello world!" });

  // WHEN
  await client.put(KEY, VALUE);
  const response = await client.get("greeting.txt");

  // THEN
  expect(response).toEqual(VALUE);
  await s.stop();

  expect(simulatorJsonOf(appPath)).toMatchSnapshot();
});

test("get invalid object throws an error", async () => {
  // GIVEN
  const appPath = synthSimulatedApp((scope) => {
    new cloud.Bucket(scope, "my_bucket");
  });
  const s = new testing.Simulator({ appPath });
  await s.start();

  const attrs = s.getAttributes("root/my_bucket");
  const client = new BucketClient(attrs.bucketAddr);

  // THEN
  await expect(() => client.get("unknown.txt")).rejects.toThrowError();
  await s.stop();

  expect(simulatorJsonOf(appPath)).toMatchSnapshot();
});
