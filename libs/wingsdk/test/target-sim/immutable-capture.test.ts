import { Function, IFunctionClient } from "../../src/cloud/function";
import { Inflight, NodeJsCode } from "../../src/core/inflight";
import { Duration } from "../../src/std";
import { SimApp } from "../../src/testing";

interface CaptureTest {
  name: string;
  givenBindings: any;
  whenInflightExpression: string;
  thenResolvesTo: any;
}

function makeCaptureTest(options: CaptureTest) {
  test(options.name, async () => {
    const app = new SimApp();
    new Function(
      app,
      "Function",
      new Inflight(app, "foo", {
        code: NodeJsCode.fromInline(
          "async handle() { return JSON.stringify(" +
            options.whenInflightExpression +
            "); }"
        ),
        bindings: options.givenBindings,
      })
    );

    const sim = await app.startSimulator();
    const fn = sim.getResource("root/Function") as IFunctionClient;
    const ret = await fn.invoke("");
    expect(JSON.parse(ret)).toStrictEqual(options.thenResolvesTo);
    expect(app.snapshot()).toMatchSnapshot();
  });
}

makeCaptureTest({
  name: "array",
  givenBindings: { data: { my_capture: ["hello", "dude"] } },
  whenInflightExpression: "this.my_capture",
  thenResolvesTo: ["hello", "dude"],
});

makeCaptureTest({
  name: "string",
  givenBindings: { data: { my_capture: "bam bam bam" } },
  whenInflightExpression: "this.my_capture",
  thenResolvesTo: "bam bam bam",
});

makeCaptureTest({
  name: "number",
  givenBindings: { data: { my_capture: 123 } },
  whenInflightExpression: "this.my_capture + 20",
  thenResolvesTo: 143,
});

makeCaptureTest({
  name: "boolean",
  givenBindings: { data: { my_capture: false } },
  whenInflightExpression: "this.my_capture",
  thenResolvesTo: false,
});

makeCaptureTest({
  name: "struct",
  givenBindings: {
    data: { my_capture: { hello: "dude", world: "cup", foo: "bar" } },
  },
  whenInflightExpression:
    "{ hello: this.my_capture.hello, world: this.my_capture.world, foo: this.my_capture.foo, len: Object.keys(this.my_capture).length }",
  thenResolvesTo: { hello: "dude", world: "cup", foo: "bar", len: 3 },
});

makeCaptureTest({
  name: "set",
  givenBindings: { data: { my_capture: new Set(["boom", "bam", "bang"]) } },
  whenInflightExpression:
    "{ size: this.my_capture.size, has_bang: this.my_capture.has('bang'), has_bim: this.my_capture.has('bim') }",
  thenResolvesTo: { size: 3, has_bang: true, has_bim: false },
});

makeCaptureTest({
  name: "duration",
  givenBindings: { data: { my_capture: Duration.fromHours(2) } },
  whenInflightExpression:
    "{ min: this.my_capture.minutes, sec: this.my_capture.seconds, hours: this.my_capture.hours }",
  thenResolvesTo: { min: 120, sec: 7200, hours: 2 },
});

makeCaptureTest({
  name: "map",
  givenBindings: {
    data: {
      my_capture: Object.freeze(
        new Map([
          ["foo", 123],
          ["bar", 456],
        ])
      ),
    },
  },
  whenInflightExpression:
    "{ has_foo: this.my_capture.has('foo'), size: this.my_capture.size, get_bar: this.my_capture.get('bar') }",
  thenResolvesTo: { has_foo: true, size: 2, get_bar: 456 },
});

makeCaptureTest({
  name: "array of durations",
  givenBindings: {
    data: {
      my_array: [Duration.fromMinutes(10), Duration.fromMinutes(20)],
    },
  },
  whenInflightExpression: "this.my_array[0].minutes + this.my_array[1].minutes",
  thenResolvesTo: 30,
});

makeCaptureTest({
  name: "map of arrays",
  givenBindings: {
    data: {
      my_map: Object.freeze(
        new Map([
          ["foo", [1, 2]],
          ["bar", [3, 4]],
        ])
      ),
    },
  },
  whenInflightExpression:
    "this.my_map.get('foo')[0] + this.my_map.get('bar')[1]",
  thenResolvesTo: 5,
});

// array of maps
makeCaptureTest({
  name: "array of maps",
  givenBindings: {
    data: {
      my_array: [
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
  whenInflightExpression:
    "this.my_array[0].get('foo') + this.my_array[1].get('bar')",
  thenResolvesTo: 5,
});

// set of durations
makeCaptureTest({
  name: "set of durations",
  givenBindings: {
    data: {
      my_set: new Set([Duration.fromMinutes(10), Duration.fromMinutes(20)]),
    },
  },
  whenInflightExpression: "Array.from(this.my_set.values())",
  thenResolvesTo: [
    { hours: 0.16666666666666666, minutes: 10, seconds: 600 },
    { hours: 0.3333333333333333, minutes: 20, seconds: 1200 },
  ],
});

// map of arrays of durations
makeCaptureTest({
  name: "map of arrays of durations",
  givenBindings: {
    data: {
      my_map: Object.freeze(
        new Map([
          ["foo", [Duration.fromMinutes(10), Duration.fromMinutes(20)]],
          ["bar", [Duration.fromMinutes(30), Duration.fromMinutes(40)]],
        ])
      ),
    },
  },
  whenInflightExpression:
    "this.my_map.get('foo').at(0).minutes + this.my_map.get('bar').at(1).minutes",
  thenResolvesTo: 50,
});

// struct of maps
makeCaptureTest({
  name: "struct of maps",
  givenBindings: {
    data: {
      my_struct: {
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
  whenInflightExpression:
    "this.my_struct.foo.get('foo') + this.my_struct.bar.get('bar')",
  thenResolvesTo: 5,
});
