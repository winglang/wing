import { Construct } from "constructs";
import { test, expect } from "vitest";
import { Bucket } from "../../src/cloud";
import { Function, IFunctionClient } from "../../src/cloud/function";
import { InflightBindings, NodeJsCode } from "../../src/core/inflight";
import { Duration } from "../../src/std";
import { Testing } from "../../src/testing";
import { SimApp } from "../sim-app";

interface CaptureTest {
  bindings: InflightBindings;
  inflightCode?: string[];
  whenInflightExpression?: string;
  thenResolvesTo?: any;
}

captureTest("array", () => ({
  bindings: { my_capture: { obj: ["hello", "dude"] } },
  inflightCode: [
    `assert(this.my_capture.length === 2)`,
    `assert(this.my_capture[0] === "hello")`,
    `assert(this.my_capture[1] === "dude")`,
  ],
}));

captureTest("string", () => ({
  bindings: { my_capture: { obj: "bam bam bam" } },
  inflightCode: [
    `assert(this.my_capture.length === 11)`,
    `assert(this.my_capture === "bam bam bam")`,
  ],
}));

captureTest("number", () => ({
  bindings: { my_capture: { obj: 123 } },
  inflightCode: [`assert(this.my_capture + 20 === 143)`],
}));

captureTest("boolean", () => ({
  bindings: { my_capture: { obj: false } },
  inflightCode: [`assert(this.my_capture === false)`],
}));

captureTest("struct", () => ({
  bindings: {
    my_capture: { obj: { hello: "dude", world: "cup", foo: "bar" } },
  },
  inflightCode: [
    `assert(this.my_capture.hello === "dude")`,
    `assert(this.my_capture.world === "cup")`,
    `assert(this.my_capture.foo === "bar")`,
    `assert(Object.keys(this.my_capture).length === 3)`,
  ],
}));

captureTest("set", () => ({
  bindings: {
    my_capture: { obj: new Set(["boom", "bam", "bang"]) },
  },
  inflightCode: [
    `assert(this.my_capture.has("boom"))`,
    `assert(this.my_capture.has("bam"))`,
    `assert(this.my_capture.has("bang"))`,
    `assert(this.my_capture.size === 3)`,
  ],
}));

captureTest("duration", () => ({
  bindings: { my_capture: { obj: Duration.fromHours(2) } },
  inflightCode: [
    `assert(this.my_capture.minutes === 120)`,
    `assert(this.my_capture.seconds === 7200)`,
    `assert(this.my_capture.hours === 2)`,
  ],
}));

captureTest("map", () => ({
  bindings: {
    my_capture: {
      obj: Object.freeze(
        new Map([
          ["foo", 123],
          ["bar", 456],
        ])
      ),
    },
  },
  inflightCode: [
    `assert(this.my_capture.has("foo"))`,
    `assert(this.my_capture.has("bar"))`,
    `assert(this.my_capture.size === 2)`,
    `assert(this.my_capture.get("foo") === 123)`,
    `assert(this.my_capture.get("bar") === 456)`,
  ],
}));

captureTest("array of durations", () => ({
  bindings: {
    my_array: {
      obj: [Duration.fromMinutes(10), Duration.fromMinutes(20)],
    },
  },
  inflightCode: [
    `assert(this.my_array.length === 2)`,
    `assert(this.my_array[0].minutes === 10)`,
    `assert(this.my_array[1].minutes === 20)`,
  ],
}));

captureTest("map of arrays", () => ({
  bindings: {
    my_map: {
      obj: Object.freeze(
        new Map([
          ["foo", [1, 2]],
          ["bar", [3, 4]],
        ])
      ),
    },
  },
  inflightCode: [
    `assert(this.my_map.has("foo"))`,
    `assert(this.my_map.has("bar"))`,
    `assert(this.my_map.size === 2)`,
    `assert(this.my_map.get("foo")[0] === 1)`,
    `assert(this.my_map.get("foo")[1] === 2)`,
    `assert(this.my_map.get("bar")[0] === 3)`,
    `assert(this.my_map.get("bar")[1] === 4)`,
  ],
}));

// array of maps
captureTest("array of maps", () => ({
  bindings: {
    my_array: {
      obj: [
        Object.freeze(
          new Map([
            ["foo", 1],
            ["bar", 2],
          ])
        ),
        Object.freeze(
          new Map([
            ["foo", 3],
            ["bar", 4],
          ])
        ),
      ],
    },
  },
  inflightCode: [
    `assert(this.my_array[0].get('foo') === 1)`,
    `assert(this.my_array[1].get('bar') === 4)`,
  ],
}));

// set of durations
captureTest("set of durations", () => ({
  bindings: {
    my_set: {
      obj: new Set([Duration.fromMinutes(10), Duration.fromMinutes(20)]),
    },
  },
  inflightCode: [
    `assert(Array.from(this.my_set)[0].minutes === 10)`,
    `assert(Array.from(this.my_set)[0].hours === 0.16666666666666666)`,
    `assert(Array.from(this.my_set)[1].seconds === 1200)`,
  ],
}));

// map of arrays of durations
captureTest("map of arrays of durations", () => ({
  bindings: {
    my_map: {
      obj: Object.freeze(
        new Map([
          ["foo", [Duration.fromMinutes(10), Duration.fromMinutes(20)]],
          ["bar", [Duration.fromMinutes(30), Duration.fromMinutes(40)]],
        ])
      ),
    },
  },
  inflightCode: [
    `assert(this.my_map.get('foo')[0].minutes === 10)`,
    `assert(this.my_map.get('foo')[1].seconds === 20 * 60)`,
    `assert(this.my_map.get('bar')[0].minutes === 30)`,
    `assert(this.my_map.get('bar')[1].seconds === 40 * 60)`,
  ],
}));

// struct of maps
captureTest("struct of maps", () => ({
  bindings: {
    my_struct: {
      obj: {
        foo: Object.freeze(
          new Map([
            ["foo", 1],
            ["bar", 2],
          ])
        ),
        bar: Object.freeze(
          new Map([
            ["foo", 3],
            ["bar", 4],
          ])
        ),
      },
    },
  },
  inflightCode: [
    `assert(this.my_struct.foo.get('foo') === 1)`,
    `assert(this.my_struct.foo.get('bar') === 2)`,
    `assert(this.my_struct.bar.get('foo') === 3)`,
    `assert(this.my_struct.bar.get('bar') === 4)`,
  ],
}));

// array of buckets
captureTest("array of buckets", (scope) => ({
  bindings: {
    my_buckets: {
      obj: [Bucket._newBucket(scope, "B1"), Bucket._newBucket(scope, "B2")],
    },
  },
  inflightCode: [
    `await this.my_buckets[0].put("hello.txt", "world");`,
    `const objects = await this.my_buckets[0].list();`,
    `assert(objects.length === 1)`,
    `assert(objects[0] === "hello.txt")`,
    `await this.my_buckets[1].put("foo", "bar");`,
    `assert(await this.my_buckets[1].get("foo") === "bar")`,
  ],
}));

// map of buckets
captureTest("map of buckets", (scope) => ({
  bindings: {
    my_map: {
      obj: Object.freeze(
        new Map([
          ["foo", Bucket._newBucket(scope, "B1")],
          ["bar", Bucket._newBucket(scope, "B2")],
        ])
      ),
    },
  },
  inflightCode: [
    `const foo = this.my_map.get("foo");`,
    `await foo.put("hello.txt", "world");`,
    `assert(await foo.get("hello.txt") === "world")`,
  ],
}));

// struct with resources
captureTest("struct with resources", (scope) => ({
  bindings: {
    my_struct: {
      obj: {
        bucky: Bucket._newBucket(scope, "B1"),
        mapy: Object.freeze(
          new Map([
            ["foo", Bucket._newBucket(scope, "B2")],
            ["bar", Bucket._newBucket(scope, "B3")],
          ])
        ),
        arry: {
          boom: [
            Bucket._newBucket(scope, "B4"),
            Bucket._newBucket(scope, "B5"),
          ],
        },
      },
    },
  },
  inflightCode: [
    `const b = this.my_struct.bucky;`,
    `await b.put("hello.txt", "world");`,
    `assert(await b.get("hello.txt") === "world")`,
    `const boom = this.my_struct.arry.boom[1];`,
    `assert((await boom.list()).length === 0)`,
    `const bar = this.my_struct.mapy.get("bar");`,
    `await bar.put("foo", "bar");`,
    `assert(await bar.get("foo") === "bar")`,
  ],
}));

// -----------------------------

function captureTest(name: string, t: (scope: Construct) => CaptureTest) {
  test(name, async () => {
    const app = new SimApp();

    const options = t(app);

    const renderInflightCode = () => {
      const lines: string[] = [];
      for (const line of options.inflightCode ?? []) {
        const re = /^assert\((.*)\)$/;
        const match = re.exec(line);
        if (match) {
          lines.push(
            `if (!(${
              match[1]
            })) { throw new Error(\`assertion failed: ${JSON.stringify(
              match[1]
            )}\`); }`
          );
        } else {
          lines.push(line);
        }
      }

      return lines;
    };

    Function._newFunction(
      app,
      "Function",
      Testing.makeHandler(
        app,
        "foo",
        [
          "async handle() {",
          ...renderInflightCode(),
          options.whenInflightExpression
            ? `return JSON.stringify(${options.whenInflightExpression});`
            : "",
          "}",
        ].join("\n"),
        options.bindings
      )
    );

    const sim = await app.startSimulator();
    const fn = sim.getResource("root/Function") as IFunctionClient;
    const ret = await fn.invoke("");
    if (options.thenResolvesTo) {
      expect(JSON.parse(ret)).toStrictEqual(options.thenResolvesTo);
    }
    expect(app.snapshot()).toMatchSnapshot();
  });
}
