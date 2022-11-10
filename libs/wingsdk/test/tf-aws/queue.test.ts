import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as tfaws from "../../src/tf-aws";
import { mkdtemp } from "../../src/util";
import { tfResourcesOf, tfSanitize } from "../util";

test("default queue behavior", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  new cloud.Queue(app, "Queue");
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual(["aws_sqs_queue"]);
  expect(tfSanitize(output)).toMatchSnapshot();
});

test("queue with custom timeout", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  new cloud.Queue(app, "Queue", {
    timeout: core.Duration.fromSeconds(30),
  });
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual(["aws_sqs_queue"]);
  expect(tfSanitize(output)).toMatchSnapshot();
});

test("queue with a consumer function", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const queue = new cloud.Queue(app, "Queue", {
    timeout: core.Duration.fromSeconds(30),
  });
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
  expect(
    core.Testing.inspectPrebundledCode(processorFn).text
  ).toMatchSnapshot();

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
});
