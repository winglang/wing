import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import * as ex from "../../src/ex";
import { Testing } from "../../src/simulator";
import * as tfaws from "../../src/target-tf-aws";
import {
  mkdtemp,
  sanitizeCode,
  tfResourcesOf,
  tfSanitize,
  treeJsonOf,
} from "../util";

test("default table behavior", () => {
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
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
  const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
  const table = new ex.Table(app, "Table", {
    columns: { name: ex.ColumnType.STRING },
    primaryKey: "id",
    name: "my-wing-table",
  });
  const inflight = Testing.makeHandler(
    app,
    "Handler",
    `async handle(event) {
  await this.my_table.insert({ id: "test" });
}`,
    {
      my_table: {
        obj: table,
        ops: [ex.TableInflightMethods.INSERT],
      },
    }
  );
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
