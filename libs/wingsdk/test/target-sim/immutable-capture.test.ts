import { Function, IFunctionClient } from "../../src/cloud/function";
import { Inflight, NodeJsCode } from "../../src/core/inflight";
import { Duration } from "../../src/std";
import { SimApp } from "../../src/testing";

interface CaptureTest {
  name: string;
  in: any;
  out: string;
  expected: string;
}

function makeCaptureTest(options: CaptureTest) {
  test(options.name, async () => {
    const app = new SimApp();
    new Function(
      app,
      "Function",
      new Inflight(app, "foo", {
        code: NodeJsCode.fromInline(
          "async handle() { return JSON.stringify(" + options.out + "); }"
        ),
        bindings: {
          data: {
            my_capture: options.in,
          },
        },
      })
    );

    const sim = await app.startSimulator();
    const fn = sim.getResource("root/Function") as IFunctionClient;
    const ret = await fn.invoke("");
    expect(ret).toStrictEqual(options.expected);
    expect(app.snapshot()).toMatchSnapshot();
  });
}

makeCaptureTest({
  name: "array",
  in: ["hello", "dude"],
  out: "this.my_capture",
  expected: '["hello","dude"]',
});

makeCaptureTest({
  name: "string",
  in: "bam bam bam",
  out: "this.my_capture",
  expected: '"bam bam bam"',
});

makeCaptureTest({
  name: "number",
  in: 123,
  out: "this.my_capture + 20",
  expected: "143",
});

makeCaptureTest({
  name: "boolean",
  in: false,
  out: "this.my_capture",
  expected: "false",
});

makeCaptureTest({
  name: "map",
  in: { hello: "dude", world: "cup", foo: "bar" },
  out: "{ hello: this.my_capture.hello, world: this.my_capture.world, foo: this.my_capture.foo, len: Object.keys(this.my_capture).length }",
  expected: '{"hello":"dude","world":"cup","foo":"bar","len":3}',
});

makeCaptureTest({
  name: "set",
  in: new Set(["boom", "bam", "bang"]),
  out: "{ size: this.my_capture.size, has_bang: this.my_capture.has('bang'), has_bim: this.my_capture.has('bim') }",
  expected: '{"size":3,"has_bang":true,"has_bim":false}',
});

makeCaptureTest({
  name: "duration",
  in: Duration.fromHours(2),
  out: "{ min: this.my_capture.minutes, sec: this.my_capture.seconds, hours: this.my_capture.hours }",
  expected: '{"min":120,"sec":7200,"hours":2}',
});
