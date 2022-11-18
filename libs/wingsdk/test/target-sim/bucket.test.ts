import * as cloud from "../../src/cloud";
import * as sim from "../../src/target-sim";
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
  expect(s.getAttributes("main/my_bucket")).toEqual({
    handle: expect.any(String),
  });
  expect(s.getProps("main/my_bucket")).toEqual({
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

  const client = s.getResourceByPath("main/my_bucket") as cloud.IBucketClient;

  const KEY = "greeting.txt";
  const VALUE = JSON.stringify({ msg: "Hello world!" });

  // WHEN
  await client.put(KEY, VALUE);
  const response = await client.get("greeting.txt");

  // THEN
  expect(response).toEqual(VALUE);
  await s.stop();

  expect(listMessages(s)).toEqual([
    "wingsdk.cloud.Bucket created.",
    "Put (key=greeting.txt).",
    "Get (key=greeting.txt).",
    "wingsdk.cloud.Bucket deleted.",
  ]);
  expect(simulatorJsonOf(simfile)).toMatchSnapshot();
});

test("put multiple objects and list all from bucket", async () => {
  // GIVEN
  const app = new sim.App({ outdir: mkdtemp() });
  new cloud.Bucket(app, "my_bucket");
  const simfile = app.synth();

  const s = new testing.Simulator({ simfile });
  await s.start();

  const client = s.getResourceByPath("main/my_bucket") as cloud.IBucketClient;
  const KEY1 = "greeting1.txt";
  const KEY2 = "greeting2.txt";
  const KEY3 = "greeting3.txt";
  const VALUE1 = JSON.stringify({ msg: "Hello world!" });
  const VALUE2 = JSON.stringify({ msg: "Hello world again!" });
  const VALUE3 = JSON.stringify({ msg: "Hello world again!" });

  // WHEN
  await client.put(KEY1, VALUE1);
  await client.put(KEY2, VALUE2);
  await client.put(KEY3, VALUE3);
  const response = await client.list();

  // THEN
  expect(response).toEqual([KEY1, KEY2, KEY3]);
  await s.stop();

  expect(listMessages(s)).toEqual([
    "wingsdk.cloud.Bucket created.",
    "Put (key=greeting1.txt).",
    "Put (key=greeting2.txt).",
    "Put (key=greeting3.txt).",
    "List (prefix=null).",
    "wingsdk.cloud.Bucket deleted.",
  ]);
  expect(simulatorJsonOf(simfile)).toMatchSnapshot();
});

test("get invalid object throws an error", async () => {
  // GIVEN
  const app = new sim.App({ outdir: mkdtemp() });
  new cloud.Bucket(app, "my_bucket");
  const simfile = app.synth();

  const s = new testing.Simulator({ simfile });
  await s.start();

  const client = s.getResourceByPath("main/my_bucket") as cloud.IBucketClient;

  // THEN
  await expect(() => client.get("unknown.txt")).rejects.toThrowError();
  await s.stop();

  expect(listMessages(s)).toEqual([
    "wingsdk.cloud.Bucket created.",
    "Get (key=unknown.txt).",
    "wingsdk.cloud.Bucket deleted.",
  ]);
  expect(s.listTraces()[1].data.status).toEqual("failure");
  expect(simulatorJsonOf(simfile)).toMatchSnapshot();
});

function listMessages(s: testing.Simulator) {
  return s.listTraces().map((event) => event.data.message);
}
