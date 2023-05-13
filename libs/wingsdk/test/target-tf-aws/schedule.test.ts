import * as cdktf from "cdktf";
import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import * as std from "../../src/std";
import * as tfaws from "../../src/target-tf-aws";
import { Testing } from "../../src/testing";
import { mkdtemp, tfResourcesOf, tfSanitize, treeJsonOf } from "../util";

test("schedule behavior with rate", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const fn = Testing.makeHandler(
    app,
    "Handler",
    `async handle(event) { console.log("Received: ", event); }`
  );
  const schedule = cloud.Schedule._newSchedule(app, "Schedule", {
    rate: std.Duration.fromMinutes(2),
  });
  schedule.onTick(fn);
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "aws_cloudwatch_event_rule", // main schedule event
    "aws_cloudwatch_event_target", // schedule target
    "aws_iam_role", // role for function
    "aws_iam_role_policy", // policy for role
    "aws_iam_role_policy_attachment", // execution policy for role
    "aws_lambda_function", // processor function
    "aws_lambda_permission", // function permission
    "aws_s3_bucket", // S3 bucket for code
    "aws_s3_object", // S3 object for code
  ]);
  expect(
    cdktf.Testing.toHaveResourceWithProperties(
      output,
      "aws_cloudwatch_event_rule",
      {
        schedule_expression: "rate(2 minutes)",
      }
    )
  ).toEqual(true);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("schedule behavior with cron", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const fn = Testing.makeHandler(
    app,
    "Handler",
    `async handle(event) { console.log("Received: ", event); }`
  );
  const schedule = cloud.Schedule._newSchedule(app, "Schedule", {
    cron: "0/1 * ? * *",
  });
  schedule.onTick(fn);
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "aws_cloudwatch_event_rule", // main schedule event
    "aws_cloudwatch_event_target", // schedule target
    "aws_iam_role", // role for function
    "aws_iam_role_policy", // policy for role
    "aws_iam_role_policy_attachment", // execution policy for role
    "aws_lambda_function", // processor function
    "aws_lambda_permission", // function permission
    "aws_s3_bucket", // S3 bucket for code
    "aws_s3_object", // S3 object for code
  ]);
  expect(
    cdktf.Testing.toHaveResourceWithProperties(
      output,
      "aws_cloudwatch_event_rule",
      {
        schedule_expression: "cron(0/1 * ? * * *)",
      }
    )
  ).toEqual(true);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("schedule with two functions", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });
  const fn1 = Testing.makeHandler(
    app,
    "Handler1",
    `async handle(event) { console.log("Received: ", event); }`
  );
  const fn2 = Testing.makeHandler(
    app,
    "Handler2",
    `async handle(event) { console.log("Received: ", event); }`
  );
  const schedule = cloud.Schedule._newSchedule(app, "Schedule", {
    cron: "0/1 * ? * *",
  });
  schedule.onTick(fn1);
  schedule.onTick(fn2);
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "aws_cloudwatch_event_rule", // main schedule event
    "aws_cloudwatch_event_target", // schedule target
    "aws_iam_role", // role for function
    "aws_iam_role_policy", // policy for role
    "aws_iam_role_policy_attachment", // execution policy for role
    "aws_lambda_function", // processor function
    "aws_lambda_permission", // function permission
    "aws_s3_bucket", // S3 bucket for code
    "aws_s3_object", // S3 object for code
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("schedule with rate and cron simultaneously", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });

  // THEN
  expect(() =>
    cloud.Schedule._newSchedule(app, "Schedule", {
      rate: std.Duration.fromSeconds(30),
      cron: "0/1 * ? * *",
    })
  ).toThrow("rate and cron cannot be configured simultaneously.");
});

test("cron with more than five values", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });

  // THEN
  expect(() =>
    cloud.Schedule._newSchedule(app, "Schedule", {
      cron: "0/1 * ? * * *",
    })
  ).toThrow(
    "cron string must be UNIX cron format [minute] [hour] [day of month] [month] [day of week]"
  );
});

test("schedule without rate or cron", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });

  // THEN
  expect(() => cloud.Schedule._newSchedule(app, "Schedule")).toThrow(
    "rate or cron need to be filled."
  );
});

test("schedule with rate less than 1 minute", () => {
  // GIVEN
  const app = new tfaws.App({ outdir: mkdtemp() });

  // THEN
  expect(() =>
    cloud.Schedule._newSchedule(app, "Schedule", {
      rate: std.Duration.fromSeconds(30),
    })
  ).toThrow("rate can not be set to less than 1 minute.");
});
