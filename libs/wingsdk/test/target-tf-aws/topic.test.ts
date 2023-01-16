import * as cloud from "../../src/cloud";
import * as tfaws from "../../src/target-tf-aws";
import { Testing } from "../../src/testing";
import { mkdtemp, sanitizeCode } from "../../src/util";
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
  const subscriber = Testing.makeHandler(
    app,
    "Handler",
    `async handle(event) { console.log("Received: ", event); }`
  );

  topic.onMessage(subscriber);
  const output = app.synth();

  // THEN
  expect(sanitizeCode(subscriber._toInflight())).toMatchSnapshot();
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
  const subOne = Testing.makeHandler(
    app,
    "Handler1",
    `async handle(event) { console.log("Got Event: ", event); }`
  );
  const subTwo = Testing.makeHandler(
    app,
    "Handler2",
    `async handle(event) { console.log("Ohh yea!! ", event); }`
  );

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
