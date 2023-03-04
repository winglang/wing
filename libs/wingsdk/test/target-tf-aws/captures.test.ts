import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import * as tfaws from "../../src/target-tf-aws";
import { Testing } from "../../src/testing";
import { mkdtemp, sanitizeCode } from "../../src/util";
import { tfResourcesOf, tfSanitize } from "../util";

test("function with a bucket binding", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const bucket = cloud.Bucket._newBucket(app, "Bucket");
  const inflight = Testing.makeHandler(
    app,
    "Handler",
    `async handle(event) { await this.bucket.put("hello.txt", event); }`,
    {
      bucket: {
        obj: bucket,
        ops: [cloud.BucketInflightMethods.PUT],
      },
    }
  );
  cloud.Function._newFunction(app, "Function", inflight);
  const output = app.synth();

  // THEN
  expect(sanitizeCode(inflight._toInflight())).toMatchSnapshot();

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

test("function with a function binding", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const inflight1 = Testing.makeHandler(
    app,
    "Handler1",
    `async handle(event) { console.log(event); }`
  );
  const fn1 = cloud.Function._newFunction(app, "Function1", inflight1);
  const inflight2 = Testing.makeHandler(
    app,
    "Handler2",
    `async handle(event) {
      console.log("Event: " + event);
      await this.function.invoke(JSON.stringify({ hello: "world" }));
    }`,
    {
      function: {
        obj: fn1,
        ops: [cloud.FunctionInflightMethods.INVOKE],
      },
    }
  );
  cloud.Function._newFunction(app, "Function2", inflight2);
  const output = app.synth();

  // THEN
  expect(sanitizeCode(inflight1._toInflight())).toMatchSnapshot();
  expect(sanitizeCode(inflight2._toInflight())).toMatchSnapshot();

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

test("two functions reusing the same IFunctionHandler", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const inflight = Testing.makeHandler(
    app,
    "Handler1",
    `async handle(event) { console.log(event); }`
  );

  cloud.Function._newFunction(app, "Function1", inflight);
  cloud.Function._newFunction(app, "Function2", inflight);

  // THEN
  const output = app.synth();

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

test("function with a queue binding", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const queue = cloud.Queue._newQueue(app, "Queue");
  const pusher = Testing.makeHandler(
    app,
    "Pusher",
    `async handle(event) { await this.queue.push("info"); }`,
    {
      queue: {
        obj: queue,
        ops: [cloud.QueueInflightMethods.PUSH],
      },
    }
  );
  cloud.Function._newFunction(app, "Function", pusher);

  const processor = Testing.makeHandler(
    app,
    "Processor",
    `async handle(event) { console.log("Received" + event); }`
  );
  queue.onMessage(processor);
  const output = app.synth();

  // THEN
  expect(sanitizeCode(pusher._toInflight())).toMatchSnapshot();
  expect(sanitizeCode(processor._toInflight())).toMatchSnapshot();

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
