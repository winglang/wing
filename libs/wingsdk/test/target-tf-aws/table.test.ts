import { test, expect } from "vitest";
import { AwsApp } from "./aws-util";
import * as cloud from "../../src/cloud";
import { lift } from "../../src/core";
import * as ex from "../../src/ex";
import { sanitizeCode, tfResourcesOf, tfSanitize, treeJsonOf } from "../util";

test("default table behavior", () => {
  const app = new AwsApp();
  new ex.Table(app, "Table", {
    columns: { name: ex.ColumnType.STRING },
    primaryKey: "id",
    name: "my-wing-table",
  });
  const output = app.synth();

  expect(tfResourcesOf(output)).toEqual(["aws_dynamodb_table"]);
  expect(tfSanitize(output)).toMatchSnapshot();
});

test("function with a table binding", () => {
  const app = new AwsApp();
  const table = new ex.Table(app, "Table", {
    columns: { name: ex.ColumnType.STRING },
    primaryKey: "id",
    name: "my-wing-table",
  });
  const inflight = lift({ my_table: table })
    .grant({ my_table: ["insert"] })
    .inflight(async (ctx) => {
      await ctx.my_table.insert("test", { id: "test" } as any);
    });

  new cloud.Function(app, "Function", inflight);

  const output = app.synth();

  expect(sanitizeCode(inflight._toInflight())).toMatchSnapshot();
  expect(tfResourcesOf(output)).toEqual([
    "aws_cloudwatch_log_group", // log group for function
    "aws_dynamodb_table", // main table
    "aws_iam_role", // role for function
    "aws_iam_role_policy", // policy for role
    "aws_iam_role_policy_attachment", // execution policy for role
    "aws_lambda_function", // processor function
    "aws_s3_bucket", // S3 bucket for code
    "aws_s3_object", // S3 object for code
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});
