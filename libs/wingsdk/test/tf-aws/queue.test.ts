import { Polycons } from "@monadahq/polycons";
import * as cdktf from "cdktf";
import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as tfaws from "../../src/tf-aws";
import { tfResourcesOf, tfSanitize } from "../util";

test("default queue behavior", () => {
  const output = cdktf.Testing.synthScope((scope) => {
    const factory = new tfaws.PolyconFactory();
    Polycons.register(scope, factory);

    new cloud.Queue(scope, "Queue");
  });

  expect(tfResourcesOf(output)).toEqual(["aws_sqs_queue"]);
  expect(tfSanitize(output)).toMatchSnapshot();
});

test("queue with custom timeout", () => {
  const output = cdktf.Testing.synthScope((scope) => {
    const factory = new tfaws.PolyconFactory();
    Polycons.register(scope, factory);

    new cloud.Queue(scope, "Queue", {
      timeout: core.Duration.fromSeconds(30),
    });
  });

  expect(tfResourcesOf(output)).toEqual(["aws_sqs_queue"]);
  expect(tfSanitize(output)).toMatchSnapshot();
});

test("queue with a consumer function", () => {
  const output = cdktf.Testing.synthScope((scope) => {
    const factory = new tfaws.PolyconFactory();
    Polycons.register(scope, factory);

    const queue = new cloud.Queue(scope, "Queue", {
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

    expect(
      core.Testing.inspectPrebundledCode(processorFn).text
    ).toMatchSnapshot();
  });

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
