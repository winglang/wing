import { Construct } from "constructs";
import { test, expect } from "vitest";
import { waitUntilQueueEmpty, waitUntilResourcesDone } from "./util";
import * as cloud from "../../src/cloud";
import { IResource } from "../../src/std";
import { Testing } from "../../src/testing";
import { SimApp } from "../sim-app";

test("can create sequential files in a bucket", async () => {
  // GIVEN
  class HelloWorld extends Construct {
    public readonly processor: IResource;

    constructor(scope: Construct, id: string) {
      super(scope, id);

      const counter = cloud.Counter._newCounter(this, "Counter", {
        initial: 1000,
      });
      const bucket = cloud.Bucket._newBucket(this, "Bucket");
      const queue = cloud.Queue._newQueue(this, "Queue");
      this.processor = Testing.makeHandler(
        this,
        "Processor",
        `async handle(event) {
          let next = await this.counter.inc();
          let key = "file-" + next + ".txt";
          await this.bucket.put(key, event);
        }`,
        {
          counter: {
            obj: counter,
            ops: [cloud.CounterInflightMethods.INC],
          },
          bucket: {
            obj: bucket,
            ops: [cloud.BucketInflightMethods.PUT],
          },
        }
      );
      queue.setConsumer(this.processor);
    }
  }

  const app = new SimApp();
  const helloWorld = new HelloWorld(app, "HelloWorld");

  const s = await app.startSimulator();

  const pusher = s.getResource("/HelloWorld/Queue") as cloud.IQueueClient;

  // WHEN
  void pusher.push("kachow!");
  await waitUntilResourcesDone(s, helloWorld.processor);
  void pusher.push("zoom!");
  await waitUntilResourcesDone(s, helloWorld.processor);

  // THEN
  const bucket = s.getResource("/HelloWorld/Bucket") as cloud.IBucketClient;
  await expect(bucket.get("file-1000.txt")).resolves.toEqual("kachow!");
  await expect(bucket.get("file-1001.txt")).resolves.toEqual("zoom!");
  await s.stop();

  expect(app.snapshot()).toMatchSnapshot();
});
