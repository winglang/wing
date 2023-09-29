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

test("default dynamodb table behavior", () => {
  const app = new tfaws.App({ outdir: mkdtemp() });
  ex.DynamodbTable._newDynamodbTable(app, "Table", {
    attributeDefinitions: { id: "S" } as any,
    hashKey: "id",
    name: "my-wing-table",
  });
  const output = app.synth();

  expect(tfResourcesOf(output)).toEqual(["aws_dynamodb_table"]);
  expect(tfSanitize(output)).toMatchSnapshot();
});

test("function with a table binding", () => {
  const app = new tfaws.App({ outdir: mkdtemp() });
  const table = ex.DynamodbTable._newDynamodbTable(app, "Table", {
    attributeDefinitions: { id: "S" } as any,
    hashKey: "id",
    name: "my-wing-table",
  });
  const inflight = Testing.makeHandler(
    app,
    "Handler",
    `async handle(event) {
  await this.my_table.putItem({ id: "test" });
  await this.my_table.scan();
}`,
    {
      my_table: {
        obj: table,
        ops: [
          ex.DynamodbTableInflightMethods.PUT_ITEM,
          ex.DynamodbTableInflightMethods.SCAN,
        ],
      },
    }
  );
  cloud.Function._newFunction(app, "Function", inflight);
  const output = app.synth();

  expect(sanitizeCode(inflight._toInflight())).toMatchSnapshot();
  expect(tfResourcesOf(output)).toEqual([
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
