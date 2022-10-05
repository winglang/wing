import { Polycons } from "@monadahq/polycons";
import * as cdktf from "cdktf";
import * as cloud from "../../src/cloud";
import {
  BucketInflightMethods,
  FunctionInflightMethods,
  QueueInflightMethods,
} from "../../src/cloud";
import * as core from "../../src/core";
import * as tfaws from "../../src/tf-aws";
import { tfResourcesOf, tfSanitize } from "../util";

// TODO This is a hack. Our path for inflight requires should be relative
function removeAbsolutePath(text: string) {
  const regex = /"\/.+?\/winglang\/libs\/(.+?)"/g;

  // replace first group with static text
  return text.replace(regex, '"[REDACTED]/$1"');
}

test("function captures some primitives", () => {
  const output = cdktf.Testing.synthScope((scope) => {
    const factory = new tfaws.PolyconFactory();
    Polycons.register(scope, factory);

    const inflight = new core.Inflight({
      code: core.NodeJsCode.fromInline(
        `async function $proc($cap, event) {
          console.log("Hello, " + $cap.string);
          console.log("My favorite number is " + $cap.num);
          console.log("The order is " + JSON.stringify($cap.order));
        }`
      ),
      entrypoint: "$proc",
      captures: {
        num: {
          obj: 5,
        },
        string: {
          obj: "world",
        },
        map: {
          obj: true,
        },
      },
    });
    const fn = new cloud.Function(scope, "Function", inflight);

    const code = core.Testing.inspectPrebundledCode(fn);
    expect(removeAbsolutePath(code.text)).toMatchSnapshot();
  });

  expect(tfResourcesOf(output)).toEqual([
    "aws_iam_role",
    "aws_iam_role_policy",
    "aws_iam_role_policy_attachment",
    "aws_lambda_function",
    "aws_s3_bucket",
    "aws_s3_object",
  ]);
  expect(output).toMatchSnapshot();
});

test("function captures a bucket", () => {
  const output = cdktf.Testing.synthScope((scope) => {
    const factory = new tfaws.PolyconFactory();
    Polycons.register(scope, factory);

    const bucket = new cloud.Bucket(scope, "Bucket");
    const inflight = new core.Inflight({
      code: core.NodeJsCode.fromInline(
        `async function $proc($cap, event) {
          console.log("Hello, " + event.name);
          await $cap.bucket.put("hello.txt", Serializable.fromJSON(event));
        }`
      ),
      entrypoint: "$proc",
      captures: {
        bucket: {
          obj: bucket,
          methods: [BucketInflightMethods.PUT],
        },
      },
    });
    const fn = new cloud.Function(scope, "Function", inflight);

    const code = core.Testing.inspectPrebundledCode(fn);
    expect(removeAbsolutePath(code.text)).toMatchSnapshot();
  });

  expect(tfResourcesOf(output)).toEqual([
    "aws_iam_role",
    "aws_iam_role_policy",
    "aws_iam_role_policy_attachment",
    "aws_lambda_function",
    "aws_s3_bucket",
    "aws_s3_bucket_public_access_block",
    "aws_s3_bucket_server_side_encryption_configuration",
    "aws_s3_object",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
});

test("function captures a function", () => {
  const output = cdktf.Testing.synthScope((scope) => {
    const factory = new tfaws.PolyconFactory();
    Polycons.register(scope, factory);

    const inflight1 = new core.Inflight({
      code: core.NodeJsCode.fromInline(
        `async function $proc($cap, event) {
          console.log("Event: " + JSON.stringify(event));
          return { greeting: "Hello, " + event.name + "!" };
        }`
      ),
      entrypoint: "$proc",
    });
    const fn1 = new cloud.Function(scope, "Function1", inflight1);
    const inflight2 = new core.Inflight({
      code: core.NodeJsCode.fromInline(
        `async function $proc($cap, event) {
          console.log("Event: " + JSON.stringify(event));
          const data = await $cap.function.invoke($Serializable.fromJSON({ name: "world" }));
          console.log("Greeting: " + data.value().greeting);
        }`
      ),
      entrypoint: "$proc",
      captures: {
        function: {
          obj: fn1,
          methods: [FunctionInflightMethods.INVOKE],
        },
      },
    });
    const fn2 = new cloud.Function(scope, "Function2", inflight2);

    expect(
      removeAbsolutePath(core.Testing.inspectPrebundledCode(fn1).text)
    ).toMatchSnapshot();
    expect(
      removeAbsolutePath(core.Testing.inspectPrebundledCode(fn2).text)
    ).toMatchSnapshot();
  });

  expect(tfResourcesOf(output)).toEqual([
    "aws_iam_role",
    "aws_iam_role_policy",
    "aws_iam_role_policy_attachment",
    "aws_lambda_function",
    "aws_s3_bucket",
    "aws_s3_object",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
});

test("two functions reusing the same inflight", () => {
  const output = cdktf.Testing.synthScope((scope) => {
    const factory = new tfaws.PolyconFactory();
    Polycons.register(scope, factory);

    const bucket = new cloud.Bucket(scope, "Bucket");
    const inflight = new core.Inflight({
      code: core.NodeJsCode.fromInline(
        `async function $proc($cap, event) {
          console.log("Hello, " + event.name);
          await $cap.bucket.put("hello.txt", Serializable.fromJSON(event));
        }`
      ),
      entrypoint: "$proc",
      captures: {
        bucket: {
          obj: bucket,
          methods: [BucketInflightMethods.PUT],
        },
      },
    });
    const fn1 = new cloud.Function(scope, "Function1", inflight);
    const fn2 = new cloud.Function(scope, "Function2", inflight);

    expect(
      removeAbsolutePath(core.Testing.inspectPrebundledCode(fn1).text)
    ).toMatchSnapshot();
    expect(
      removeAbsolutePath(core.Testing.inspectPrebundledCode(fn2).text)
    ).toMatchSnapshot();
  });

  expect(tfResourcesOf(output)).toEqual([
    "aws_iam_role",
    "aws_iam_role_policy",
    "aws_iam_role_policy_attachment",
    "aws_lambda_function",
    "aws_s3_bucket",
    "aws_s3_bucket_public_access_block",
    "aws_s3_bucket_server_side_encryption_configuration",
    "aws_s3_object",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
});

test("function captures a queue", () => {
  const output = cdktf.Testing.synthScope((scope) => {
    const factory = new tfaws.PolyconFactory();
    Polycons.register(scope, factory);

    const queue = new cloud.Queue(scope, "Queue");
    const pusher = new core.Inflight({
      code: core.NodeJsCode.fromInline(
        `async function $proc($cap) {
          await $cap.queue.push(Serializable.fromJSON({ name: "Alice" }));
        }`
      ),
      entrypoint: "$proc",
      captures: {
        queue: {
          obj: queue,
          methods: [QueueInflightMethods.PUSH],
        },
      },
    });
    const pusherFn = new cloud.Function(scope, "Function", pusher);

    const processor = new core.Inflight({
      code: core.NodeJsCode.fromInline(
        `async function $proc($cap, event) {
          console.log("Received " + event.name);
        }`
      ),
      entrypoint: "$proc",
    });
    const processorFn = queue.onMessage(processor);

    expect(
      removeAbsolutePath(core.Testing.inspectPrebundledCode(pusherFn).text)
    ).toMatchSnapshot();
    expect(
      removeAbsolutePath(core.Testing.inspectPrebundledCode(processorFn).text)
    ).toMatchSnapshot();
  });

  expect(tfResourcesOf(output)).toEqual([
    "aws_iam_role",
    "aws_iam_role_policy",
    "aws_iam_role_policy_attachment",
    "aws_lambda_event_source_mapping",
    "aws_lambda_function",
    "aws_s3_bucket",
    "aws_s3_object",
    "aws_sqs_queue",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
});
