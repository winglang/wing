import { relative } from "path";
import { Construct } from "constructs";
import { ISimulatorInflightHost, ISimulatorResource } from "./resource";
import { FunctionSchema } from "./schema-resources";
import { simulatorHandleToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import { App } from "../core";
import { BaseResourceSchema, PolicyStatement } from "../simulator/simulator";
import { IInflightHost, IResource } from "../std";
import { Duration } from "../std/duration";

export const ENV_WING_SIM_INFLIGHT_RESOURCE_PATH =
  "WING_SIM_INFLIGHT_RESOURCE_PATH";
export const ENV_WING_SIM_INFLIGHT_RESOURCE_TYPE =
  "WING_SIM_INFLIGHT_RESOURCE_TYPE";

/**
 * Simulator implementation of `cloud.Function`.
 *
 * @inflight `@winglang/sdk.cloud.IFunctionClient`
 */
export class Function
  extends cloud.Function
  implements ISimulatorResource, ISimulatorInflightHost
{
  private readonly timeout: Duration;
  private readonly concurrency: number;
  private readonly permissions: Array<[IResource, string]> = [];
  public _liftMap = undefined;

  constructor(
    scope: Construct,
    id: string,
    inflight: cloud.IFunctionHandler,
    props: cloud.FunctionProps = {}
  ) {
    super(scope, id, inflight, props);

    // props.memory is unused since we are not simulating it
    this.timeout = props.timeout ?? Duration.fromMinutes(1);
    this.concurrency = props.concurrency ?? 100;
  }

  public addPermission(resource: IResource, op: string): void {
    this.permissions.push([resource, op]);
  }

  public toSimulator(): BaseResourceSchema {
    const outdir = App.of(this).outdir;

    const policy: Array<PolicyStatement> = [];
    for (const [resource, operation] of this.permissions) {
      policy.push({
        operation,
        resourceHandle: simulatorHandleToken(resource),
      });
    }

    const schema: FunctionSchema = {
      type: cloud.FUNCTION_FQN,
      path: this.node.path,
      addr: this.node.addr,
      props: {
        sourceCodeFile: relative(outdir, this.entrypoint),
        sourceCodeLanguage: "javascript",
        environmentVariables: this.env,
        timeout: this.timeout.seconds * 1000,
        concurrency: this.concurrency,
      },
      policy: policy,
      attrs: {} as any,
    };

    return schema;
  }

  /** @internal */
  public _supportedOps(): string[] {
    return [
      cloud.FunctionInflightMethods.INVOKE,
      cloud.FunctionInflightMethods.INVOKE_ASYNC,
    ];
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host, ops);
    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }
}

/**
 * Simulator-specific inflight methods for `cloud.Function`.
 */
export enum FunctionInflightMethods {
  HAS_AVAILABLE_WORKERS = "hasAvailableWorkers",
}
