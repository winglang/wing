import * as cdktf from "cdktf";
import { test, expect } from "vitest";
import { AwsApp } from "./aws-util";
import { Function, IFunctionClient, Queue } from "../../src/cloud";
import { inflight, lift } from "../../src/core";
import { QueueRef } from "../../src/shared-aws";
import * as std from "../../src/std";
import { SimApp } from "../sim-app";
import { sanitizeCode, tfResourcesOf, tfSanitize, treeJsonOf } from "../util";

test("default queue behavior", () => {
  // GIVEN
  const app = new AwsApp();
  new Queue(app, "Queue");
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual(["aws_sqs_queue"]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("queue with custom timeout", () => {
  // GIVEN
  const app = new AwsApp();
  new Queue(app, "Queue", {
    timeout: std.Duration.fromSeconds(30),
  });
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual(["aws_sqs_queue"]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("queue with custom retention", () => {
  // GIVEN
  const app = new AwsApp();
  new Queue(app, "Queue", {
    retentionPeriod: std.Duration.fromMinutes(30),
  });
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual(["aws_sqs_queue"]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("queue with a consumer function", () => {
  // GIVEN
  const app = new AwsApp();
  const queue = new Queue(app, "Queue", {
    timeout: std.Duration.fromSeconds(30),
  });
  const processor = inflight(async (_, event) => {
    console.log("Received " + event.name);
  });
  const processorFn = queue.setConsumer(processor);
  const output = app.synth();

  // THEN
  expect(sanitizeCode(processorFn._toInflight())).toMatchSnapshot();

  expect(tfResourcesOf(output)).toEqual([
    "aws_cloudwatch_log_group", // log group for function
    "aws_iam_role", // role for function
    "aws_iam_role_policy", // policy for role
    "aws_iam_role_policy_attachment", // execution policy for role
    "aws_lambda_event_source_mapping", // connection between queue and function
    "aws_lambda_function", // processor function
    "aws_s3_bucket", // S3 bucket for code
    "aws_s3_object", // S3 object for code
    "aws_sqs_queue", // main queue
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("queue name valid", () => {
  // GIVEN
  const app = new AwsApp();
  const queue = new Queue(app, "The-Incredible_Queue-01");
  const output = app.synth();

  // THEN
  expect(
    cdktf.Testing.toHaveResourceWithProperties(output, "aws_sqs_queue", {
      name: `The-Incredible_Queue-01-${queue.node.addr.substring(0, 8)}`,
    })
  ).toBeTruthy();
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("replace invalid character from queue name", () => {
  // GIVEN
  const app = new AwsApp();
  const queue = new Queue(app, "The*Incredible$Queue");
  const output = app.synth();

  // THEN
  expect(
    cdktf.Testing.toHaveResourceWithProperties(output, "aws_sqs_queue", {
      name: `The-Incredible-Queue-${queue.node.addr.substring(0, 8)}`,
    })
  ).toBeTruthy();
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("QueueRef fails with an invalid ARN", async () => {
  const app = new SimApp();
  expect(() => {
    new QueueRef(app, "QueueRef", "not-an_arn");
  }).toThrow(/"not-an_arn" is not a valid Amazon SQS ARN/);
});

test("QueueRef in a SimApp can be used to reference an existing queue within a simulated app", async () => {
  const app = new SimApp();

  const queueRef = new QueueRef(
    app,
    "QueueRef",
    "arn:aws:sqs:us-west-2:123456789012:MyQueue1234"
  );

  // we can't really make a remote call here, so we'll just check that
  // we have the right inflight client with the right queue name.
  new Function(
    app,
    "Function",
    lift({ queue: queueRef })
      .grant({ queue: ["push"] })
      .inflight(async (ctx) => {
        const q = ctx.queue as any;

        if (!q.client) {
          throw new Error("Queue AWS SDK client not found");
        }
        if (q.client.constructor.name !== "SQSClient") {
          throw new Error("Queue AWS SDK client is not an SQSClient");
        }
        return q._queueUrlOrArn; // yes, internal stuff
      })
  );

  expect(queueRef.queueArn).toStrictEqual(
    "arn:aws:sqs:us-west-2:123456789012:MyQueue1234"
  );

  const sim = await app.startSimulator();

  const fn = sim.getResource("root/Function") as IFunctionClient;

  const reply = await fn.invoke();
  expect(reply).toStrictEqual("arn:aws:sqs:us-west-2:123456789012:MyQueue1234");
});

test("QueueRef in an TFAWS app can be used to reference an existing queue", () => {
  // GIVEN
  const app = new AwsApp();
  const queue = new QueueRef(
    app,
    "QueueRef",
    "arn:aws:sqs:us-west-2:123456789012:MyQueue1234"
  );

  const handler = lift({ queue })
    .grant({ queue: ["push", "approxSize"] })
    .inflight(async () => {});

  new Function(app, "Function", handler);

  const output = app.synth();

  // THEN

  const statements = JSON.parse(
    JSON.parse(output).resource.aws_iam_role_policy
      .Function_IamRolePolicy_E3B26607.policy
  ).Statement;

  expect(statements).toStrictEqual([
    {
      Action: ["sqs:GetQueueUrl"],
      Effect: "Allow",
      Resource: ["arn:aws:sqs:us-west-2:123456789012:MyQueue1234"],
    },
    {
      Action: ["sqs:SendMessage"],
      Effect: "Allow",
      Resource: ["arn:aws:sqs:us-west-2:123456789012:MyQueue1234"],
    },
    {
      Action: ["sqs:GetQueueAttributes"],
      Effect: "Allow",
      Resource: ["arn:aws:sqs:us-west-2:123456789012:MyQueue1234"],
    },
  ]);

  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});
