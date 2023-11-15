import { resolve } from "path";
import { Duration } from "aws-cdk-lib";
import { PolicyStatement as CdkPolicyStatement } from "aws-cdk-lib/aws-iam";
import {
  Architecture,
  Function as CdkFunction,
  Code,
  IEventSource,
  Runtime,
} from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import * as cloud from "../cloud";
import * as core from "../core";
import { createBundle } from "../shared/bundling";
import { DEFAULT_MEMORY_SIZE } from "../shared/function";
import { IAwsFunction, PolicyStatement } from "../shared-aws";
import { IInflightHost } from "../std";

/**
 * AWS implementation of `cloud.Function`.
 *
 * @inflight `@winglang/sdk.cloud.IFunctionClient`
 */
export class Function extends cloud.Function implements IAwsFunction {
  private readonly function: CdkFunction;
  /** Function ARN */
  public readonly functionArn: string;

  constructor(
    scope: Construct,
    id: string,
    inflight: cloud.IFunctionHandler,
    props: cloud.FunctionProps = {}
  ) {
    super(scope, id, inflight, props);

    // bundled code is guaranteed to be in a fresh directory
    const bundle = createBundle(this.entrypoint);

    const logRetentionDays =
      props.logRetentionDays === undefined
        ? 30
        : props.logRetentionDays < 0
          ? undefined // Negative value means Infinite retention
          : props.logRetentionDays;

    this.function = new CdkFunction(this, "Default", {
      handler: "index.handler",
      code: Code.fromAsset(resolve(bundle.directory)),
      runtime: Runtime.NODEJS_18_X,
      environment: this.env,
      timeout: props.timeout
        ? Duration.seconds(props.timeout.seconds)
        : Duration.minutes(1),
      memorySize: props.memory ?? DEFAULT_MEMORY_SIZE,
      architecture: Architecture.ARM_64,
      logRetention: logRetentionDays,
    });

    this.functionArn = this.function.functionArn;
  }

  /** @internal */
  public _supportedOps(): string[] {
    return [cloud.FunctionInflightMethods.INVOKE];
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("functions can only be bound by awscdk.Function for now");
    }

    if (ops.includes(cloud.FunctionInflightMethods.INVOKE)) {
      host.addPolicyStatements({
        actions: ["lambda:InvokeFunction"],
        resources: [`${this.function.functionArn}`],
      });
    }

    // The function name needs to be passed through an environment variable since
    // it may not be resolved until deployment time.
    host.addEnvironment(this.envName(), this.function.functionArn);

    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(
      __dirname.replace("target-awscdk", "shared-aws"),
      __filename,
      "FunctionClient",
      [`process.env["${this.envName()}"], "${this.node.path}"`]
    );
  }

  /**
   * Add environment variable to the function.
   */
  public addEnvironment(name: string, value: string) {
    // Keep a local map of the env vars. Those env vars will be added once the function is initialized
    super.addEnvironment(name, value);

    if (this.function) {
      this.function.addEnvironment(name, value);
    }
  }

  /**
   * Add a policy statement to the Lambda role.
   */
  public addPolicyStatements(...statements: PolicyStatement[]) {
    for (const statement of statements) {
      this.function.addToRolePolicy(new CdkPolicyStatement(statement));
    }
  }

  /** @internal */
  public _addEventSource(eventSource: IEventSource) {
    this.function.addEventSource(eventSource);
  }

  private envName(): string {
    return `FUNCTION_NAME_${this.node.addr.slice(-8)}`;
  }

  get _awsFunction() {
    return this.function;
  }

  public arn(): string {
    return this.function.functionArn;
  }

  public functionName(): string {
    return this.function.functionName;
  }
}
