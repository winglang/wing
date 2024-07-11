import { test, expect, describe } from "vitest";
import { AwsApp } from "./aws-util";
import * as cloud from "../../src/cloud";
import { inflight, lift } from "../../src/core";
import { sanitizeCode, tfResourcesOf, tfSanitize } from "../util";

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
    const app = new AwsApp();
    const bucket = new cloud.Bucket(app, "Bucket");
    new cloud.Function(
      app,
      "Function",
      lift({ bucket })
        .grant({ bucket: ["put"] })
        .inflight(async (ctx, event) => {
          await ctx.bucket.put("hello.txt", event ?? "none");
          return undefined;
        })
    );
    const output = app.synth();

    // THEN
    expect(tfResourcesOf(output)).toEqual([
      "aws_cloudwatch_log_group",
      "aws_iam_role",
      "aws_iam_role_policy",
      "aws_iam_role_policy_attachment",
      "aws_lambda_function",
      "aws_s3_bucket",
      "aws_s3_object",
    ]);
    expect(tfSanitize(output)).toMatchSnapshot();
  });

  test("put json operation has correct permissions", () => {
    // GIVEN
    const app = new AwsApp();
    const bucket = new cloud.Bucket(app, "Bucket");
    new cloud.Function(
      app,
      "Function",
      lift({ bucket })
        .grant({ bucket: ["putJson"] })
        .inflight(async (ctx, event) => {
          await ctx.bucket.putJson("hello.json", event as any);
          return undefined;
        })
    );
    const output = JSON.parse(app.synth());
    const hasActions = statementsContain(output, ["s3:PutObject*"], "Allow");

    // THEN
    expect(hasActions).toEqual(true);
  });

  test("get json operation has correct permissions", () => {
    // GIVEN
    const app = new AwsApp();
    const bucket = new cloud.Bucket(app, "Bucket");

    new cloud.Function(
      app,
      "Function",
      lift({ bucket })
        .grant({ bucket: ["getJson"] })
        .inflight(async (ctx) => {
          await ctx.bucket.getJson("hello.txt");
          return undefined;
        })
    );
    const output = JSON.parse(app.synth());
    const hasActions = statementsContain(
      output,
      ["s3:GetObject*", "s3:GetBucket*"],
      "Allow"
    );

    // THEN
    expect(hasActions).toEqual(true);
  });
});

test("function with a function binding", () => {
  // GIVEN
  const app = new AwsApp();
  const inflight1 = inflight(async (_, event) => {
    console.log(event);
  });
  const fn1 = new cloud.Function(app, "Function1", inflight1);
  const inflight2 = lift({ fn1 })
    .grant({ fn1: ["invoke"] })
    .inflight(async (ctx, event) => {
      console.log("Event: " + event);
      await ctx.fn1.invoke(JSON.stringify({ hello: "world" }));
    });
  new cloud.Function(app, "Function2", inflight2);
  const output = app.synth();

  // THEN
  expect(sanitizeCode(inflight1._toInflight())).toMatchSnapshot();
  expect(sanitizeCode(inflight2._toInflight())).toMatchSnapshot();

  expect(tfResourcesOf(output)).toEqual([
    "aws_cloudwatch_log_group",
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
  const app = new AwsApp();
  const handler = inflight(async (_, event) => {
    console.log(event);
  });

  new cloud.Function(app, "Function1", handler);
  new cloud.Function(app, "Function2", handler);

  // THEN
  const output = app.synth();

  expect(tfResourcesOf(output)).toEqual([
    "aws_cloudwatch_log_group",
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
  const app = new AwsApp();
  const queue = new cloud.Queue(app, "Queue");
  const pusher = lift({ queue })
    .grant({ queue: ["push"] })
    .inflight(async (ctx) => {
      await ctx.queue.push("info");
    });

  new cloud.Function(app, "Function", pusher);

  const processor = inflight(async (_, event) => {
    console.log("Received" + event);
  });
  queue.setConsumer(processor);

  const output = app.synth();

  // THEN
  expect(sanitizeCode(pusher._toInflight())).toMatchSnapshot();
  expect(sanitizeCode(processor._toInflight())).toMatchSnapshot();

  expect(tfResourcesOf(output)).toEqual([
    "aws_cloudwatch_log_group",
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
