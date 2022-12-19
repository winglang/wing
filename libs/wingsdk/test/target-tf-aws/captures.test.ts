import * as cloud from "../../src/cloud";
import * as tfaws from "../../src/target-tf-aws";
import { Testing } from "../../src/testing";
import { mkdtemp } from "../../src/util";
import { tfResourcesOf, tfSanitize } from "../util";

test("function with a bucket binding", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const bucket = new cloud.Bucket(app, "Bucket");
  const inflight = Testing.makeHandler(
    app,
    "Handler",
    `async handle(event) { await this.bucket.put("hello.txt", event); }`,
    {
      bucket: {
        resource: bucket,
        ops: [cloud.BucketInflightMethods.PUT],
      },
    }
  );
  new cloud.Function(app, "Function", inflight);
  const output = app.synth();

  // THEN
  expect(inflight._toInflight().sanitizedText).toMatchSnapshot();

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
  const fn1 = new cloud.Function(app, "Function1", inflight1);
  const inflight2 = Testing.makeHandler(
    app,
    "Handler2",
    `async handle(event) {
      console.log("Event: " + event);
      await this.function.invoke(JSON.stringify({ hello: "world" }));
    }`,
    {
      function: {
        resource: fn1,
        ops: [cloud.FunctionInflightMethods.INVOKE],
      },
    }
  );
  new cloud.Function(app, "Function2", inflight2);
  const output = app.synth();

  // THEN
  expect(inflight1._toInflight().sanitizedText).toMatchSnapshot();
  expect(inflight2._toInflight().sanitizedText).toMatchSnapshot();

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
  new cloud.Function(app, "Function1", inflight);
  new cloud.Function(app, "Function2", inflight);

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
  const queue = new cloud.Queue(app, "Queue");
  const pusher = Testing.makeHandler(
    app,
    "Pusher",
    `async handle(event) { await this.queue.push("info"); }`,
    {
      queue: {
        resource: queue,
        ops: [cloud.QueueInflightMethods.PUSH],
      },
    }
  );
  new cloud.Function(app, "Function", pusher);

  const processor = Testing.makeHandler(
    app,
    "Processor",
    `async handle(event) { console.log("Received" + event); }`
  );
  queue.onMessage(processor);
  const output = app.synth();

  // THEN
  expect(pusher._toInflight().sanitizedText).toMatchSnapshot();
  expect(processor._toInflight().sanitizedText).toMatchSnapshot();

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
