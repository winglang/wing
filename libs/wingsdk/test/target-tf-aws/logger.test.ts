import * as cdktf from "cdktf";
import { Polycons } from "polycons";
import * as cloud from "../../src/cloud";
import { Logger } from "../../src/cloud";
import * as tfaws from "../../src/target-tf-aws";
import { Testing } from "../../src/testing";
import { sanitizeCode } from "../../src/util";
import { tfResourcesOf, tfSanitize } from "../util";

test("inflight function uses a logger", () => {
  const output = cdktf.Testing.synthScope((scope) => {
    const factory = new tfaws.PolyconFactory();
    Polycons.register(scope, factory);
    Logger.register(scope);

    const inflight = Testing.makeHandler(
      scope,
      "Handler",
      `async handle() {
        console.log("hello world!");
      }`
    );
    new cloud.Function(scope, "Function", inflight);

    expect(sanitizeCode(inflight._toInflight())).toMatchSnapshot();
  });

  expect(tfResourcesOf(output)).toEqual([
    "aws_iam_role",
    "aws_iam_role_policy",
    "aws_iam_role_policy_attachment",
    "aws_lambda_function",
    "aws_s3_bucket",
    "aws_s3_object",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
});
