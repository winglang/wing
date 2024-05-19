import { Duration } from "aws-cdk-lib";
import { PolicyStatement as CdkPolicyStatement } from "aws-cdk-lib/aws-iam";
import {
  Architecture,
  Function as CdkFunction,
  Code,
  Runtime,
} from "aws-cdk-lib/aws-lambda";
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs";
import { Asset } from "aws-cdk-lib/aws-s3-assets";
import { Construct, IConstruct } from "constructs";
import { cloud, std, core } from "@winglang/sdk";
import { NotImplementedError } from "@winglang/sdk/lib/core/errors";
import { createBundle } from "@winglang/sdk/lib/shared/bundling";
import {
  IAwsFunction,
  PolicyStatement,
  externalLibraries,
} from "@winglang/sdk/lib/shared-aws";
import { makeAwsLambdaHandler } from "@winglang/sdk/lib/shared-aws/function-util";
import { resolve } from "path";
import { renameSync, rmSync, writeFileSync } from "fs";
import { App } from "./app";
import { LiftMap } from "@winglang/sdk/lib/core";

/**
 * Implementation of `awscdk.Function` are expected to implement this
 */
export interface IAwsCdkFunction extends IConstruct {
  awscdkFunction: CdkFunction;
}

export function isAwsCdkFunction(x: any): x is IAwsCdkFunction {
  return typeof x["awscdkFunction"] === "object";
}

/**
 * Adds a bunch of policy statements to the function's role.
 */
export function addPolicyStatements(
  fn: CdkFunction,
  statements: PolicyStatement[]
) {
  for (const statement of statements) {
    fn.addToRolePolicy(new CdkPolicyStatement(statement));
  }
}

/**
 * AWS implementation of `cloud.Function`.
 *
 * @inflight `@winglang/sdk.cloud.IFunctionClient`
 */
export class Function
  extends cloud.Function
  implements IAwsCdkFunction, IAwsFunction
{
  private readonly function: CdkFunction;
  private readonly assetPath: string;

  constructor(
    scope: Construct,
    id: string,
    inflight: cloud.IFunctionHandler,
    props: cloud.FunctionProps = {}
  ) {
    super(scope, id, inflight, props);

    if (props.concurrency != null) {
      throw new NotImplementedError(
        "Function concurrency isn't implemented yet on the current target."
      );
    }

    // The code in `this.entrypoint` will be replaced during preSynthesize
    // but we produce an initial version and bundle it so that `lambda.Function`
    // has something to work with.
    // This is a workaround for https://github.com/aws/aws-cdk/issues/28732
    const inflightCodeApproximation = this._getCodeLines(inflight).join("\n");
    writeFileSync(this.entrypoint, inflightCodeApproximation);
    const bundle = createBundle(this.entrypoint, externalLibraries);

    const code = Code.fromAsset(resolve(bundle.directory));

    this.function = this.createFunction(code, props);

    // hack: accessing private field from aws_lambda.AssetCode
    // https://github.com/aws/aws-cdk/blob/109b2abe4c713624e731afa1b82c3c1a3ba064c9/packages/aws-cdk-lib/aws-lambda/lib/code.ts#L266
    const asset: Asset = (code as any).asset;
    if (!asset.assetPath) {
      throw new Error(
        "AWS CDK 'Asset' class no longer has an 'assetPath' property"
      );
    }
    this.assetPath = asset.assetPath;
  }

  /** @internal */
  public _preSynthesize(): void {
    super._preSynthesize();

    // produce an inflight code bundle using the latest information, including all
    // changes made to captured variables/resources after the constructor
    const bundle = createBundle(this.entrypoint, externalLibraries);

    // copy files from bundle.directory to this.assetPath
    const assetDir = resolve(App.of(this).outdir, this.assetPath);
    rmSync(assetDir, { recursive: true, force: true });
    renameSync(bundle.directory, assetDir);
  }

  /** @internal */
  public get _liftMap(): LiftMap {
    return {
      [cloud.FunctionInflightMethods.INVOKE]: [],
      [cloud.FunctionInflightMethods.INVOKE_ASYNC]: [],
    };
  }

  public onLift(host: std.IInflightHost, ops: string[]): void {
    if (!isAwsCdkFunction(host)) {
      throw new Error("Expected host to implement IAwsCdkFunction");
    }

    if (ops.includes(cloud.FunctionInflightMethods.INVOKE)) {
      host.awscdkFunction.addToRolePolicy(
        new CdkPolicyStatement({
          actions: ["lambda:InvokeFunction"],
          resources: [`${this.function.functionArn}`],
        })
      );
    }

    // The function name needs to be passed through an environment variable since
    // it may not be resolved until deployment time.
    host.addEnvironment(this.envName(), this.function.functionArn);

    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(__dirname, __filename, "FunctionClient", [
      `process.env["${this.envName()}"], "${this.node.path}"`,
    ]);
  }

  /**
   * Can be overridden by subclasses to customize the AWS CDK function creation.
   * @param code The AWS Lambda `Code` object that represents the inflight closure defined for this function.
   * @param props Cloud function properties.
   * @returns an object that implements `aws-lambda.IFunction`.
   */
  protected createFunction(
    code: Code,
    props: cloud.FunctionProps
  ): CdkFunction {
    const logRetentionDays =
      props.logRetentionDays === undefined
        ? 30
        : props.logRetentionDays < 0
        ? RetentionDays.INFINITE // Negative value means Infinite retention
        : props.logRetentionDays;

    const logs = new LogGroup(this, "LogGroup", {
      retention: logRetentionDays,
    });

    return new CdkFunction(this, "Default", {
      handler: "index.handler",
      code,
      runtime: Runtime.NODEJS_20_X,
      environment: {
        NODE_OPTIONS: "--enable-source-maps",
        ...this.env,
      },
      timeout: props.timeout
        ? Duration.seconds(props.timeout.seconds)
        : Duration.minutes(1),
      memorySize: props.memory ?? 1024,
      architecture: Architecture.ARM_64,
      logGroup: logs,
    });
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

  private envName(): string {
    return `FUNCTION_NAME_${this.node.addr.slice(-8)}`;
  }

  public get awscdkFunction() {
    return this.function;
  }

  public get functionArn(): string {
    return this.function.functionArn;
  }

  public get functionName(): string {
    return this.function.functionName;
  }

  /**
   * @internal
   */
  protected _getCodeLines(handler: cloud.IFunctionHandler): string[] {
    return makeAwsLambdaHandler(handler);
  }
}
