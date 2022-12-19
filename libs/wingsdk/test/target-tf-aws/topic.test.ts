import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as tfaws from "../../src/target-tf-aws";
import { mkdtemp } from "../../src/util";
import {
  tfResourcesOf,
  tfResourcesOfCount,
  tfSanitize,
  treeJsonOf,
} from "../util";

test("default topic behavior", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  new cloud.Topic(app, "Topic");
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual(["aws_sns_topic"]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("topic with subscriber function", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const topic = new cloud.Topic(app, "Topic");
  const subscriber = new core.Inflight({
    code: core.NodeJsCode.fromInline(
      `async function $proc($cap, event) {
        console.log("Received: ", event);
      }`
    ),
    entrypoint: "$proc",
  });

  const subscriberFn = topic.onMessage(subscriber);
  const output = app.synth();

  // THEN
  expect(
    core.Testing.inspectPrebundledCode(subscriberFn).text
  ).toMatchSnapshot();
  expect(tfResourcesOf(output)).toEqual([
    "aws_iam_role", // role for subscriber function
    "aws_iam_role_policy", // policy for subscriber function role
    "aws_iam_role_policy_attachment", // execution policy for subscriber role
    "aws_lambda_function", // subscriber function
    "aws_lambda_permission", // policy allowing sns to publsh to subscriber lambda
    "aws_s3_bucket", // S3 bucket for code
    "aws_s3_object", // S3 object for code
    "aws_sns_topic", // main topic
    "aws_sns_topic_subscription", // subscriber lambda subscription to topic
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("topic with multiple subscribers", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const topic = new cloud.Topic(app, "Topic");
  const subOne = new core.Inflight({
    code: core.NodeJsCode.fromInline(
      `async function $proc($cap, event) {
        console.log("Got Event: ", event);
      }`
    ),
    entrypoint: "$proc",
  });
  const subTwo = new core.Inflight({
    code: core.NodeJsCode.fromInline(
      `async function $proc($cap, event) {
        console.log("Ohh yea!!", event);
      }`
    ),
    entrypoint: "$proc",
  });

  // WHEN
  topic.onMessage(subOne);
  topic.onMessage(subTwo);

  const output = app.synth();

  // THEN
  expect(tfResourcesOfCount(output, "aws_sns_topic")).toEqual(1); // 1 topic
  // 2 everything else
  expect(tfResourcesOfCount(output, "aws_iam_role")).toEqual(2);
  expect(tfResourcesOfCount(output, "aws_iam_role_policy")).toEqual(2);
  expect(tfResourcesOfCount(output, "aws_iam_role_policy_attachment")).toEqual(
    2
  );
  expect(tfResourcesOfCount(output, "aws_lambda_function")).toEqual(2);
  expect(tfResourcesOfCount(output, "aws_lambda_permission")).toEqual(2);
  expect(tfResourcesOfCount(output, "aws_s3_bucket")).toEqual(2);
  expect(tfResourcesOfCount(output, "aws_s3_object")).toEqual(2);
  expect(tfResourcesOfCount(output, "aws_sns_topic_subscription")).toEqual(2);
});
