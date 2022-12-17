import * as cdktf from "cdktf";
import { Polycons } from "polycons";
import * as cloud from "../../src/cloud";
import * as tfaws from "../../src/target-tf-aws";
import { Testing } from "../../src/testing";
import { tfResourcesOf, tfSanitize } from "../util";

test("inflight function uses a logger", () => {
  const output = cdktf.Testing.synthScope((scope) => {
    const factory = new tfaws.PolyconFactory();
    Polycons.register(scope, factory);

    cloud.Logger.register(scope);
    const inflight = Testing.makeHandler(
      scope,
      "Handler",
      `async handle() {
  await this.logger.print("hello world!");
}`,
      {
        logger: {
          resource: cloud.Logger.of(scope),
          ops: [cloud.LoggerInflightMethods.PRINT],
        },
      }
    );
    new cloud.Function(scope, "Function", inflight);

    expect(inflight._inflightJsClient().sanitizedText).toMatchSnapshot();
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
