import { resolve } from "path";
import { Duration } from "aws-cdk-lib";
import { PolicyStatement as CdkPolicyStatement } from "aws-cdk-lib/aws-iam";
import {
  Function as CdkFunction,
  Code,
  IEventSource,
  Runtime,
} from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import * as cloud from "../cloud";
import * as core from "../core";
import { createBundle } from "../shared/bundling";
import { PolicyStatement } from "../shared-aws";
import { IInflightHost, TraceType } from "../std";
import { FUNCTION_TYPE } from "../target-sim/schema-resources";

/**
 * AWS implementation of `cloud.Function`.
 *
 * @inflight `@winglang/sdk.cloud.IFunctionClient`
 */
export class Function extends cloud.Function {
  private readonly function: CdkFunction;
  /** Function ARN */
  public readonly arn: string;

  constructor(
    scope: Construct,
    id: string,
    inflight: cloud.IFunctionHandler,
    props: cloud.FunctionProps = {}
  ) {
    super(scope, id, inflight, props);

    // bundled code is guaranteed to be in a fresh directory
    const bundle = createBundle(this.entrypoint);

    this.function = new CdkFunction(this, "Default", {
      handler: "index.handler",
      code: Code.fromAsset(resolve(bundle.directory)),
      runtime: Runtime.NODEJS_18_X,
      environment: this.env,
      timeout: props.timeout
        ? Duration.seconds(props.timeout.seconds)
        : Duration.minutes(0.5),
      memorySize: props.memory ? props.memory : undefined,
    });

    this.arn = this.function.functionArn;
  }

  /** @internal */
  public _bind(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("functions can only be bound by awscdk.Function for now");
    }

    if (ops.includes(cloud.FunctionInflightMethods.INVOKE)) {
      host.addPolicyStatements([
        {
          actions: ["lambda:InvokeFunction"],
          resources: [`${this.function.functionArn}`],
        },
      ]);
    }

    // The function name needs to be passed through an environment variable since
    // it may not be resolved until deployment time.
    host.addEnvironment(this.envName(), this.function.functionArn);

    super._bind(host, ops);
  }

  /**
   * Generates the code lines for the cloud function,
   * overridden by the awscdk target to have the function context too
   * @param inflightClient inflight client code
   * @returns cloud function code string
   * @internal
   */
  protected _generateLines(inflightClient: core.Code): string[] {
    const lines = new Array<string>();

    lines.push("exports.handler = async function(event, context) {");
    lines.push(`
  const console_log = console.log.bind({});
    
  console.log = (...args) => {
  const logs = args.map(item => ({
    data: { message: item },
    sourceType: "${FUNCTION_TYPE}",
    sourcePath: context?.clientContext?.constructPath,
    type: "${TraceType.LOG}",
    timestamp: new Date().toISOString()
    }));
  !context.logs ? context.logs = [...logs] : context.logs.push(...logs);
    
  console_log(args);
  };`);

    lines.push(
      `  return { payload: (await (${inflightClient.text}).handle(event)) ?? "", context };`
    );
    lines.push("};");

    return lines;
  }

  /** @internal */
  public _toInflight(): core.Code {
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
  public addPolicyStatements(statements: PolicyStatement[]) {
    for (const statement of statements) {
      this.function.addToRolePolicy(new CdkPolicyStatement(statement));
    }
  }

  /** @internal */
  public get _functionName(): string {
    return this.function.functionName;
  }

  /** @internal */
  public get _function() {
    return this.function;
  }

  /** @internal */
  public _addEventSource(eventSource: IEventSource) {
    this.function.addEventSource(eventSource);
  }

  private envName(): string {
    return `FUNCTION_NAME_${this.node.addr.slice(-8)}`;
  }
}
