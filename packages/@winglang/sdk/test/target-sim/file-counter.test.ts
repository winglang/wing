import { Construct } from "constructs";
import { test, expect } from "vitest";
import { waitUntilTraceCount } from "./util";
import * as cloud from "../../src/cloud";
import { lift } from "../../src/core";
import { IResource, Trace } from "../../src/std";
import { SimApp } from "../sim-app";

test(
  "can create sequential files in a bucket",
  { timeout: 20_000 },
  async () => {
    // GIVEN
    class HelloWorld extends Construct {
      public readonly processor: IResource;

      constructor(scope: Construct, id: string) {
        super(scope, id);

        const counter = new cloud.Counter(this, "Counter", {
          initial: 1000,
        });

        const bucket = new cloud.Bucket(this, "Bucket");
        const queue = new cloud.Queue(this, "Queue");

        this.processor = queue.setConsumer(
          lift({ counter, bucket })
            .grant({
              counter: [cloud.CounterInflightMethods.INC],
              bucket: [cloud.BucketInflightMethods.PUT],
            })
            .inflight(async (ctx, event) => {
              let next = await ctx.counter.inc();
              let key = "file-" + next + ".txt";
              await ctx.bucket.put(key, event);
            })
        );
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
  }
);
