import * as cloud from "../../src/cloud";
import * as sim from "../../src/sim";
import { BucketClient } from "../../src/sim/bucket.inflight";
import * as testing from "../../src/testing";
import { mkdtemp } from "../../src/util";
import { simulatorJsonOf } from "./util";

test("create a bucket", async () => {
  // GIVEN
  const app = new sim.App({ outdir: mkdtemp() });
  new cloud.Bucket(app, "my_bucket");
  const simfile = app.synth();

  // THEN
  const s = new testing.Simulator({ simfile });
  await s.start();
  expect(s.getAttributes("root/my_bucket")).toEqual({
    bucketAddr: expect.any(String),
  });
  expect(s.getProps("root/my_bucket")).toEqual({
    public: false,
  });
  await s.stop();

  expect(simulatorJsonOf(simfile)).toMatchSnapshot();
});

test("put and get objects from bucket", async () => {
  // GIVEN
  const app = new sim.App({ outdir: mkdtemp() });
  new cloud.Bucket(app, "my_bucket");
  const simfile = app.synth();

  const s = new testing.Simulator({ simfile });
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

  expect(simulatorJsonOf(simfile)).toMatchSnapshot();
});

test("get invalid object throws an error", async () => {
  // GIVEN
  const app = new sim.App({ outdir: mkdtemp() });
  new cloud.Bucket(app, "my_bucket");
  const simfile = app.synth();

  const s = new testing.Simulator({ simfile });
  await s.start();

  const attrs = s.getAttributes("root/my_bucket");
  const client = new BucketClient(attrs.bucketAddr);

  // THEN
  await expect(() => client.get("unknown.txt")).rejects.toThrowError();
  await s.stop();

  expect(simulatorJsonOf(simfile)).toMatchSnapshot();
});
