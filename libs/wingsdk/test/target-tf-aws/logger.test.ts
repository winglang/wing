import * as cdktf from "cdktf";
import { Polycons } from "polycons";
import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as tfaws from "../../src/target-tf-aws";
import { tfResourcesOf, tfSanitize } from "../util";

test("inflight function uses a logger", () => {
  const output = cdktf.Testing.synthScope((scope) => {
    const factory = new tfaws.PolyconFactory();
    Polycons.register(scope, factory);

    cloud.Logger.register(scope);
    const inflight = new core.Inflight({
      code: core.NodeJsCode.fromInline(
        `async function $proc($cap) {
          await $cap.logger.print("hello world!");
        }`
      ),
      entrypoint: "$proc",
      captures: {
        logger: {
          resource: cloud.Logger.of(scope),
          methods: [cloud.LoggerInflightMethods.PRINT],
        },
      },
    });
    const fn = new cloud.Function(scope, "Function", inflight);

    expect(core.Testing.inspectPrebundledCode(fn).text).toMatchSnapshot();
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
