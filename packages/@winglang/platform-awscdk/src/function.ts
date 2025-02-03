import { Duration } from "aws-cdk-lib";
import { PolicyStatement as CdkPolicyStatement } from "aws-cdk-lib/aws-iam";
import {
  Architecture,
  Function as CdkFunction,
  Code,
  Runtime,
  LayerVersion,
  LoggingFormat,
} from "aws-cdk-lib/aws-lambda";
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs";
import { Asset } from "aws-cdk-lib/aws-s3-assets";
import { Construct, IConstruct } from "constructs";
import { cloud } from "@winglang/sdk";
import { NotImplementedError } from "@winglang/sdk/core/errors";
import { createBundle } from "@winglang/sdk/shared/bundling";
import {
  Function as AwsFunction,
  NetworkConfig,
  PolicyStatement,
  externalLibraries,
} from "@winglang/sdk/shared-aws";
import { makeAwsLambdaHandler } from "@winglang/sdk/shared-aws/function-util";
import { resolve } from "path";
import { renameSync, rmSync, writeFileSync } from "fs";
import { App } from "./app";

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
  statements: PolicyStatement[],
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
export class Function extends AwsFunction implements IAwsCdkFunction {
  private readonly function: CdkFunction;
  private readonly assetPath: string;

  constructor(
    scope: Construct,
    id: string,
    inflight: cloud.IFunctionHandler,
    props: cloud.FunctionProps = {},
  ) {
    super(scope, id, inflight, props);

    if (props.concurrency != null) {
      throw new NotImplementedError(
        "Function concurrency isn't implemented yet on the current target.",
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
        "AWS CDK 'Asset' class no longer has an 'assetPath' property",
      );
    }
    this.assetPath = asset.assetPath;
  }

  public addLambdaLayer(layerArn: string): void {
    const layer = LayerVersion.fromLayerVersionArn(
      this,
      `Layer${layerArn}`,
      layerArn,
    );
    this.function.addLayers(layer);
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

  /**
   * Can be overridden by subclasses to customize the AWS CDK function creation.
   * @param code The AWS Lambda `Code` object that represents the inflight closure defined for this function.
   * @param props Cloud function properties.
   * @returns an object that implements `aws-lambda.IFunction`.
   */
  protected createFunction(
    code: Code,
    props: cloud.FunctionProps,
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
      loggingFormat: LoggingFormat.JSON,
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

  public addNetwork(config: NetworkConfig): void {
    config;
    throw new Error(
      "The AWS CDK platform provider does not support adding network configurations to AWS Lambda functions at the moment.",
    );
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
