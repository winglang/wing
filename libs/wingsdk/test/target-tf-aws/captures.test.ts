import { test, expect, describe } from "vitest";
import * as cloud from "../../src/cloud";
import * as tfaws from "../../src/target-tf-aws";
import { Testing } from "../../src/testing";
import { mkdtemp, sanitizeCode } from "../../src/util";
import { tfResourcesOf, tfSanitize } from "../util";

describe("function with bucket binding", () => {
  // Dirty little helper to check if a config contains a set of actions
  const statementsContain = (
    config: any,
    actions: string[],
    effect: string
  ): boolean => {
    const policies = config.resource.aws_iam_role_policy;

    // This is dangerous because it checks for any policy in the entire config to contain the actions
    // its safe for the tests here because we are really only checking 1 policy.
    for (const policy of Object.keys(policies)) {
      for (const statement of JSON.parse(policies[policy].policy).Statement) {
        if (statement.Effect !== effect) {
          continue;
        }
        if (actions.every((action) => statement.Action.includes(action))) {
          return true;
        }
      }
    }
    return false;
  };

  test("put operation", () => {
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

  test("put json operation has correct permissions", () => {
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
          ops: [cloud.BucketInflightMethods.PUT_JSON],
        },
      }
    );
    cloud.Function._newFunction(app, "Function", inflight);
    const output = JSON.parse(app.synth());
    const hasActions = statementsContain(output, ["s3:PutObject*"], "Allow");

    // THEN
    expect(hasActions).toEqual(true);
  });

  test("get json operation has correct permissions", () => {
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
          ops: [cloud.BucketInflightMethods.GET_JSON],
        },
      }
    );
    cloud.Function._newFunction(app, "Function", inflight);
    const output = JSON.parse(app.synth());
    const hasActions = statementsContain(
      output,
      ["s3:GetObject*", "s3:GetBucket*", "s3:List*"],
      "Allow"
    );

    // THEN
    expect(hasActions).toEqual(true);
  });
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
  queue.addConsumer(processor);
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
