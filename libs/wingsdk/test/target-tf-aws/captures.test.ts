import * as cloud from "../../src/cloud";
import {
  BucketInflightMethods,
  FunctionInflightMethods,
  QueueInflightMethods,
} from "../../src/cloud";
import * as core from "../../src/core";
import * as tfaws from "../../src/target-tf-aws";
import { mkdtemp } from "../../src/util";
import { tfResourcesOf, tfSanitize } from "../util";

test("function captures primitive values", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const inflight = new core.Inflight({
    code: core.NodeJsCode.fromInline(
      `async function $proc($cap, event) {
        console.log("Hello, " + $cap.string);
        console.log("My favorite number is " + $cap.num);
        console.log("Is it raining? " + $cap.bool);
        console.log($cap.nothing + " hypothesis");
      }`
    ),
    entrypoint: "$proc",
    captures: {
      num: {
        value: 5,
      },
      string: {
        value: "world",
      },
      bool: {
        value: true,
      },
      nothing: {
        value: null,
      },
    },
  });
  const fn = new cloud.Function(app, "Function", inflight);
  const output = app.synth();

  // THEN
  expect(core.Testing.inspectPrebundledCode(fn).text).toMatchSnapshot();

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

test("function captures structured values", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const inflight = new core.Inflight({
    code: core.NodeJsCode.fromInline(
      `async function $proc($cap, event) {
          console.log("Map: " + JSON.stringify($cap.map));
          console.log("List: " + JSON.stringify($cap.list));
        }`
    ),
    entrypoint: "$proc",
    captures: {
      map: {
        value: {
          hello: "world",
          boom: {
            bam: 123,
          },
        },
      },
      list: {
        value: [1, 2, "thing"],
      },
    },
  });
  const fn = new cloud.Function(app, "Function", inflight);
  const output = app.synth();

  // THEN
  expect(core.Testing.inspectPrebundledCode(fn).text).toMatchSnapshot();

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

test("function captures a bucket", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const bucket = new cloud.Bucket(app, "Bucket");
  const inflight = new core.Inflight({
    code: core.NodeJsCode.fromInline(
      `async function $proc($cap, event) {
        console.log("Hello, " + event.name);
        // TODO: fix this
        await $cap.bucket.put("hello.txt", JSON.stringify(event));
      }`
    ),
    entrypoint: "$proc",
    captures: {
      bucket: {
        resource: bucket,
        methods: [BucketInflightMethods.PUT],
      },
    },
  });
  const fn = new cloud.Function(app, "Function", inflight);
  const output = app.synth();

  // THEN
  expect(core.Testing.inspectPrebundledCode(fn).text).toMatchSnapshot();

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
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const inflight1 = new core.Inflight({
    code: core.NodeJsCode.fromInline(
      `async function $proc($cap, event) {
          console.log("Event: " + JSON.stringify(event));
          return { greeting: "Hello, " + event.name + "!" };
        }`
    ),
    entrypoint: "$proc",
  });
  const fn1 = new cloud.Function(app, "Function1", inflight1);
  const inflight2 = new core.Inflight({
    code: core.NodeJsCode.fromInline(
      `async function $proc($cap, event) {
          console.log("Event: " + JSON.stringify(event));
          const data = await $cap.function.invoke(JSON.stringify({ name: "world" }));
          console.log("Greeting: " + data.value().greeting);
        }`
    ),
    entrypoint: "$proc",
    captures: {
      function: {
        resource: fn1,
        methods: [FunctionInflightMethods.INVOKE],
      },
    },
  });
  const fn2 = new cloud.Function(app, "Function2", inflight2);
  const output = app.synth();

  // THEN
  expect(core.Testing.inspectPrebundledCode(fn1).text).toMatchSnapshot();
  expect(core.Testing.inspectPrebundledCode(fn2).text).toMatchSnapshot();

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
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const bucket = new cloud.Bucket(app, "Bucket");
  const inflight = new core.Inflight({
    code: core.NodeJsCode.fromInline(
      `async function $proc($cap, event) {
          console.log("Hello, " + event.name);
          await $cap.bucket.put("hello.txt", JSON.stringify(event));
        }`
    ),
    entrypoint: "$proc",
    captures: {
      bucket: {
        resource: bucket,
        methods: [BucketInflightMethods.PUT],
      },
    },
  });
  const fn1 = new cloud.Function(app, "Function1", inflight);
  const fn2 = new cloud.Function(app, "Function2", inflight);

  // THEN
  expect(core.Testing.inspectPrebundledCode(fn1).text).toMatchSnapshot();
  expect(core.Testing.inspectPrebundledCode(fn2).text).toMatchSnapshot();
  const output = app.synth();

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
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const queue = new cloud.Queue(app, "Queue");
  const pusher = new core.Inflight({
    code: core.NodeJsCode.fromInline(
      `async function $proc($cap) {
          await $cap.queue.push(JSON.stringify({ name: "Alice" }));
        }`
    ),
    entrypoint: "$proc",
    captures: {
      queue: {
        resource: queue,
        methods: [QueueInflightMethods.PUSH],
      },
    },
  });
  const pusherFn = new cloud.Function(app, "Function", pusher);

  const processor = new core.Inflight({
    code: core.NodeJsCode.fromInline(
      `async function $proc($cap, event) {
          console.log("Received " + event.name);
        }`
    ),
    entrypoint: "$proc",
  });
  const processorFn = queue.onMessage(processor);
  const output = app.synth();

  // THEN
  expect(core.Testing.inspectPrebundledCode(pusherFn).text).toMatchSnapshot();
  expect(
    core.Testing.inspectPrebundledCode(processorFn).text
  ).toMatchSnapshot();

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
