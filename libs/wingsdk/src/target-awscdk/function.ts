import { resolve } from "path";
import { Construct } from "constructs";
import * as cloud from "../cloud";
import * as core from "../core";
import { Function as CdkFunction, Code, Runtime } from "aws-cdk-lib/aws-lambda";
import { Effect, PolicyStatement, PolicyStatementProps } from "aws-cdk-lib/aws-iam";
import { Duration } from "aws-cdk-lib";

/**
 * AWS implementation of `cloud.Function`.
 *
 * @inflight `@winglang/sdk.cloud.IFunctionClient`
 */
export class Function extends cloud.FunctionBase {
  private readonly function: CdkFunction;
  /** Function ARN */
  public readonly arn: string;

  constructor(scope: Construct, id: string, inflight: cloud.IFunctionHandler, props: cloud.FunctionProps) {
    super(scope, id, inflight, props);

    // bundled code is guaranteed to be in a fresh directory
    const codeDir = resolve(this.assetPath, "..");

    this.function = new CdkFunction(this, "Default", {
      handler: "index.handler",
      code: Code.fromAsset(codeDir),
      runtime: Runtime.NODEJS_16_X,
      timeout: props.timeout
        ? Duration.seconds(props.timeout.seconds)
        : Duration.minutes(0.5),
    });

    if (props.env) {
      for (const [key, val] of Object.entries(props.env)) {
        this.function.addEnvironment(key, val);
      }
    }

    this.arn = this.function.functionArn;
  }

  /** @internal */
  public _toInflight(): core.Code {
    return core.InflightClient.for(__filename.replace("awscdk", "tf-aws"), "FunctionClient", [
      `process.env["${this.envName()}"]`,
    ]);
  }

  /**
   * Add environment variable to the function.
   */
  public addEnvironment(name: string, value: string) {
    if (this.function) {
      this.function.addEnvironment(name, value);
    }
  }

  /**
   * Add a policy statement to the Lambda role.
   */
  public addPolicyStatements(...statements: PolicyStatementProps[]) {
    statements.map((s) => {
      this.function.addToRolePolicy(new PolicyStatement({
        actions: s.actions,
        resources: s.resources,
        effect: s.effect ?? Effect.ALLOW,
      }));
    });
  }

  /** @internal */
  public get _functionName(): string {
    return this.function.functionName;
  }

  private envName(): string {
    return `FUNCTION_NAME_${this.node.addr.slice(-8)}`;
  }
}

Function._annotateInflight("invoke", {});