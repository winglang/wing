import { Construct } from "constructs";
import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import { SimApp } from "../../src/testing";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

test("can create sequential files in a bucket", async () => {
  // GIVEN
  class HelloWorld extends Construct {
    constructor(scope: Construct, id: string) {
      super(scope, id);

      const counter = new cloud.Counter(this, "Counter", {
        initial: 1000,
      });
      const bucket = new cloud.Bucket(this, "Bucket");
      const queue = new cloud.Queue(this, "Queue");
      const processor = new core.Inflight({
        code: core.NodeJsCode.fromInline(
          `async function $proc($cap, body) {
            let next = await $cap.counter.inc();
            let key = "file-" + next + ".txt";
            await $cap.bucket.put(key, body);
          }`
        ),
        entrypoint: "$proc",
        bindings: {
          counter: {
            resource: counter,
            methods: [cloud.CounterInflightMethods.INC],
          },
          bucket: {
            resource: bucket,
            methods: [cloud.BucketInflightMethods.PUT],
          },
        },
      });
      queue.onMessage(processor);
    }
  }

  const app = new SimApp();
  cloud.Logger.register(app);
  new HelloWorld(app, "HelloWorld");

  const s = await app.startSimulator();

  const pusher = s.getResource("/HelloWorld/Queue") as cloud.IQueueClient;

  // WHEN
  await pusher.push("kachow!");
  await pusher.push("zoom!");
  await sleep(500);

  // THEN
  const bucket = s.getResource("/HelloWorld/Bucket") as cloud.IBucketClient;
  await expect(bucket.get("file-1000.txt")).resolves.toEqual("kachow!");
  await expect(bucket.get("file-1001.txt")).resolves.toEqual("zoom!");
  await s.stop();

  expect(app.snapshot()).toMatchSnapshot();
});
