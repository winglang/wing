import * as assert from "assert";
import { Construct } from "constructs";
import { test, expect } from "vitest";
import {
  Function,
  IFunctionClient,
  IFunctionHandler,
} from "../../src/cloud/function";
import { lift } from "../../src/core/inflight";
import { Duration } from "../../src/std";
import { SimApp } from "../sim-app";

type CaptureTest = {
  code: IFunctionHandler;
};

captureTest("array", () =>
  lift({ my_capture: ["hello", "dude"] }).inflight(async (ctx) => {
    assert(ctx.my_capture.length === 2);
    assert(ctx.my_capture[0] === "hello");
    assert(ctx.my_capture[1] === "dude");
  })
);

captureTest("string", () =>
  lift({ my_capture: "bam bam bam" }).inflight(async (ctx) => {
    assert(ctx.my_capture.length === 11);
    assert(ctx.my_capture === "bam bam bam");
  })
);

captureTest("number", () =>
  lift({ my_capture: 123 }).inflight(async (ctx) => {
    assert(ctx.my_capture + 20 === 143);
  })
);

captureTest("boolean", () =>
  lift({ my_capture: false }).inflight(async (ctx) => {
    assert(ctx.my_capture === false);
  })
);

captureTest("struct", () =>
  lift({
    my_capture: { hello: "dude", world: "cup", foo: "bar" },
  }).inflight(async (ctx) => {
    assert(ctx.my_capture.hello === "dude");
    assert(ctx.my_capture.world === "cup");
    assert(ctx.my_capture.foo === "bar");
    assert(Object.keys(ctx.my_capture).length === 3);
  })
);

captureTest("set", () =>
  lift({ my_capture: new Set(["boom", "bam", "bang"]) }).inflight(
    async (ctx) => {
      assert(ctx.my_capture.has("boom"));
      assert(ctx.my_capture.has("bam"));
      assert(ctx.my_capture.has("bang"));
      assert(ctx.my_capture.size === 3);
    }
  )
);

captureTest("duration", () =>
  lift({ my_capture: Duration.fromHours(2) }).inflight(async (ctx) => {
    assert(ctx.my_capture.minutes === 120);
    assert(ctx.my_capture.seconds === 7200);
    assert(ctx.my_capture.hours === 2);
  })
);

captureTest("map", () =>
  lift({
    my_capture: new Map([
      ["foo", 123],
      ["bar", 456],
    ]),
  }).inflight(async (ctx) => {
    assert(ctx.my_capture.has("foo"));
    assert(ctx.my_capture.has("bar"));
    assert(ctx.my_capture.size === 2);
    assert(ctx.my_capture.get("foo") === 123);
    assert(ctx.my_capture.get("bar") === 456);
  })
);

captureTest("array of durations", () =>
  lift({
    my_array: [Duration.fromMinutes(10), Duration.fromMinutes(20)],
  }).inflight(async (ctx) => {
    assert(ctx.my_array.length === 2);
    assert(ctx.my_array[0].minutes === 10);
    assert(ctx.my_array[1].minutes === 20);
  })
);

captureTest("map of arrays", () =>
  lift({
    my_map: new Map([
      ["foo", [1, 2]],
      ["bar", [3, 4]],
    ]),
  }).inflight(async (ctx) => {
    assert(ctx.my_map.has("foo"));
    assert(ctx.my_map.has("bar"));
    assert(ctx.my_map.size === 2);
    assert(ctx.my_map.get("foo")?.[0] === 1);
    assert(ctx.my_map.get("foo")?.[1] === 2);
    assert(ctx.my_map.get("bar")?.[0] === 3);
    assert(ctx.my_map.get("bar")?.[1] === 4);
  })
);

// array of maps
captureTest("array of maps", () =>
  lift({
    my_array: [
      new Map([
        ["foo", 1],
        ["bar", 2],
      ]),
      new Map([
        ["foo", 3],
        ["bar", 4],
      ]),
    ],
  }).inflight(async (ctx) => {
    assert(ctx.my_array[0].get("foo") === 1);
    assert(ctx.my_array[1].get("bar") === 4);
  })
);

// set of durations
captureTest("set of durations", () =>
  lift({
    my_set: new Set([Duration.fromMinutes(10), Duration.fromMinutes(20)]),
  }).inflight(async (ctx) => {
    assert(Array.from(ctx.my_set)[0].minutes === 10);
    assert(Array.from(ctx.my_set)[0].hours === 0.16666666666666666);
    assert(Array.from(ctx.my_set)[1].seconds === 1200);
  })
);

// map of arrays of durations
captureTest("map of arrays of durations", () =>
  lift({
    my_map: new Map([
      ["foo", [Duration.fromMinutes(10), Duration.fromMinutes(20)]],
      ["bar", [Duration.fromMinutes(30), Duration.fromMinutes(40)]],
    ]),
  }).inflight(async (ctx) => {
    assert(ctx.my_map.get("foo")?.[0].minutes === 10);
    assert(ctx.my_map.get("foo")?.[1].seconds === 20 * 60);
    assert(ctx.my_map.get("bar")?.[0].minutes === 30);
    assert(ctx.my_map.get("bar")?.[1].seconds === 40 * 60);
  })
);

// struct of maps
captureTest("struct of maps", () =>
  lift({
    my_struct: {
      foo: new Map([
        ["foo", 1],
        ["bar", 2],
      ]),
      bar: new Map([
        ["foo", 3],
        ["bar", 4],
      ]),
    },
  }).inflight(async (ctx) => {
    assert(ctx.my_struct.foo.get("foo") === 1);
    assert(ctx.my_struct.foo.get("bar") === 2);
    assert(ctx.my_struct.bar.get("foo") === 3);
    assert(ctx.my_struct.bar.get("bar") === 4);
  })
);

// capturing collections of buckets isn't supported yet

// // array of buckets
// captureTest("array of buckets", (scope) => ({
//   bindings: {
//     my_buckets: {
//       obj: [new Bucket(scope, "B1"), new Bucket(scope, "B2")],
//     },
//   },
//   inflightCode: [
//     `await this.my_buckets[0].put("hello.txt", "world");`,
//     `const objects = await this.my_buckets[0].list();`,
//     `assert(objects.length === 1)`,
//     `assert(objects[0] === "hello.txt")`,
//     `await this.my_buckets[1].put("foo", "bar");`,
//     `assert(await this.my_buckets[1].get("foo") === "bar")`,
//   ],
// }));

// // map of buckets
// captureTest("map of buckets", (scope) => ({
//   bindings: {
//     my_map: {
//       obj: Object.freeze(
//         new Map([
//           ["foo", new Bucket(scope, "B1")],
//           ["bar", new Bucket(scope, "B2")],
//         ])
//       ),
//     },
//   },
//   inflightCode: [
//     `const foo = this.my_map.get("foo");`,
//     `await foo.put("hello.txt", "world");`,
//     `assert(await foo.get("hello.txt") === "world")`,
//   ],
// }));

// // struct with resources
// captureTest("struct with resources", (scope) => ({
//   bindings: {
//     my_struct: {
//       obj: {
//         bucky: new Bucket(scope, "B1"),
//         mapy: Object.freeze(
//           new Map([
//             ["foo", new Bucket(scope, "B2")],
//             ["bar", new Bucket(scope, "B3")],
//           ])
//         ),
//         arry: {
//           boom: [new Bucket(scope, "B4"), new Bucket(scope, "B5")],
//         },
//       },
//     },
//   },
//   inflightCode: [
//     `const b = this.my_struct.bucky;`,
//     `await b.put("hello.txt", "world");`,
//     `assert(await b.get("hello.txt") === "world")`,
//     `const boom = this.my_struct.arry.boom[1];`,
//     `assert((await boom.list()).length === 0)`,
//     `const bar = this.my_struct.mapy.get("bar");`,
//     `await bar.put("foo", "bar");`,
//     `assert(await bar.get("foo") === "bar")`,
//   ],
// }));

// -----------------------------

function captureTest(name: string, t: (scope: Construct) => IFunctionHandler) {
  test(name, async () => {
    const app = new SimApp();

    const handler = t(app);

    new Function(app, "Function", handler);

    const sim = await app.startSimulator();
    const fn = sim.getResource("root/Function") as IFunctionClient;
    await fn.invoke();
    expect(app.snapshot()).toMatchSnapshot();
  });
}
