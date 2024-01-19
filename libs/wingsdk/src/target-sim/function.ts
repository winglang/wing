import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { FunctionSchema } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import { Bundler } from "../core";
import { BaseResourceSchema } from "../simulator/simulator";
import { IInflightHost } from "../std";
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
export class Function extends cloud.Function implements ISimulatorResource {
  private readonly timeout: Duration;
  private bundledEntrypoint: string | undefined;

  constructor(
    scope: Construct,
    id: string,
    inflight: cloud.IFunctionHandler,
    props: cloud.FunctionProps = {}
  ) {
    super(scope, id, inflight, props);

    // props.memory is unused since we are not simulating it
    this.timeout = props.timeout ?? Duration.fromMinutes(1);
  }

  public toSimulator(): BaseResourceSchema {
    if (!this.bundledEntrypoint) {
      throw new Error("bundledir is undefined");
    }

    const schema: FunctionSchema = {
      type: cloud.FUNCTION_FQN,
      path: this.node.path,
      addr: this.node.addr,
      props: {
        sourceCodeFile: this.bundledEntrypoint,
        sourceCodeLanguage: "javascript",
        environmentVariables: this.env,
        handlerName: this.handlerName,
        timeout: this.timeout.seconds * 1000,
      },
      attrs: {} as any,
    };
    return schema;
  }

  public _preSynthesize(): void {
    super._preSynthesize();
    this.bundledEntrypoint = Bundler.of(this).bundle.entrypointPath;
  }

  /** @internal */
  public _supportedOps(): string[] {
    return [
      cloud.FunctionInflightMethods.INVOKE,
      cloud.FunctionInflightMethods.INVOKE_ASYNC,
    ];
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }
}
