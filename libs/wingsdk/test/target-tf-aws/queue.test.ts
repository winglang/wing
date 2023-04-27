import * as cdktf from "cdktf";
import { test, expect } from "vitest";
import { Queue } from "../../src/cloud";
import * as std from "../../src/std";
import * as tfaws from "../../src/target-tf-aws";
import { Testing } from "../../src/testing";
import { mkdtemp, sanitizeCode } from "../../src/util";
import { tfResourcesOf, tfSanitize, treeJsonOf } from "../util";

test("default queue behavior", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  Queue._newQueue(app, "Queue");
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual(["aws_sqs_queue"]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("queue with custom timeout", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  Queue._newQueue(app, "Queue", {
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
  const app = new tfaws.App({ outdir: mkdtemp() });
  Queue._newQueue(app, "Queue", {
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
  const app = new tfaws.App({ outdir: mkdtemp() });
  const queue = Queue._newQueue(app, "Queue", {
    timeout: std.Duration.fromSeconds(30),
  });
  const processor = Testing.makeHandler(
    app,
    "Handler",
    `\
async handle(event) {
  console.log("Received " + event.name);
}`
  );
  const processorFn = queue.addConsumer(processor);
  const output = app.synth();

  // THEN
  expect(sanitizeCode(processorFn._toInflight())).toMatchSnapshot();

  expect(tfResourcesOf(output)).toEqual([
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
  const app = new tfaws.App({ outdir: mkdtemp() });
  const queue = Queue._newQueue(app, "The-Incredible_Queue-01");
  const output = app.synth();

  // THEN
  expect(
    cdktf.Testing.toHaveResourceWithProperties(output, "aws_sqs_queue", {
      name: `The-Incredible_Queue-01-${queue.node.addr.substring(0, 8)}`,
    })
  );
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("replace invalid character from queue name", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const queue = Queue._newQueue(app, "The*Incredible$Queue");
  const output = app.synth();

  // THEN
  expect(
    cdktf.Testing.toHaveResourceWithProperties(output, "aws_sqs_queue", {
      name: `The-Incredible-Queue-${queue.node.addr.substring(0, 8)}`,
    })
  );
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});
