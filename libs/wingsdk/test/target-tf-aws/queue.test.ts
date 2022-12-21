import * as cloud from "../../src/cloud";
import * as std from "../../src/std";
import * as tfaws from "../../src/target-tf-aws";
import { Testing } from "../../src/testing";
import { mkdtemp } from "../../src/util";
import { tfResourcesOf, tfSanitize, treeJsonOf } from "../util";

test("default queue behavior", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  new cloud.Queue(app, "Queue");
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual(["aws_sqs_queue"]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("queue with custom timeout", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  new cloud.Queue(app, "Queue", {
    timeout: std.Duration.fromSeconds(30),
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
  const queue = new cloud.Queue(app, "Queue", {
    timeout: std.Duration.fromSeconds(30),
  });
  const processor = Testing.makeHandler(
    app,
    "Handler",
    `async handle(event) {
  cconsole.log("Received " + event.name);
}`
  );
  const processorFn = queue.onMessage(processor);
  const output = app.synth();

  // THEN
  expect(processorFn._toInflight().sanitizedText).toMatchSnapshot();

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
