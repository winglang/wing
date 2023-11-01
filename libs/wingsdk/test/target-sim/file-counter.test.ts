import { Construct } from "constructs";
import { test, expect } from "vitest";
import { waitUntilTraceCount } from "./util";
import * as cloud from "../../src/cloud";
import { Testing } from "../../src/simulator";
import { IResource, Trace } from "../../src/std";
import { SimApp } from "../sim-app";

test(
  "can create sequential files in a bucket",
  async () => {
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
        const processor = Testing.makeHandler(
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
        this.processor = queue.setConsumer(processor);
      }
    }

    const app = new SimApp();
    const helloWorld = new HelloWorld(app, "HelloWorld");

    const s = await app.startSimulator();

    const pusher = s.getResource("/HelloWorld/Queue") as cloud.IQueueClient;

    // WHEN
    const traceCheck = (trace: Trace) =>
      trace.sourcePath === helloWorld.processor.node.path &&
      trace.data.status === "success";

    await pusher.push("kachow!");
    await waitUntilTraceCount(s, 1, traceCheck);
    await pusher.push("zoom!");
    await waitUntilTraceCount(s, 2, traceCheck);

    // THEN
    const bucket = s.getResource("/HelloWorld/Bucket") as cloud.IBucketClient;
    await expect(bucket.get("file-1000.txt")).resolves.toEqual("kachow!");
    await expect(bucket.get("file-1001.txt")).resolves.toEqual("zoom!");
    await s.stop();

    expect(app.snapshot()).toMatchSnapshot();
  },
  { timeout: 20000 }
);
