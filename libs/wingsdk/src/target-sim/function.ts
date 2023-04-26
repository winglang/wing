import { relative } from "path";
import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { FunctionSchema, FUNCTION_TYPE } from "./schema-resources";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import * as cloud from "../cloud";
import * as core from "../core";
import { App } from "../core";
import { IInflightHost } from "../std";
import { Duration } from "../std/duration";
import { BaseResourceSchema } from "../testing/simulator";

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
    const outdir = App.of(this).outdir;
    const schema: FunctionSchema = {
      type: FUNCTION_TYPE,
      path: this.node.path,
      props: {
        sourceCodeFile: relative(outdir, this.entrypoint),
        sourceCodeLanguage: "javascript",
        environmentVariables: this.env,
        timeout: this.timeout.seconds * 1000,
      },
      attrs: {} as any,
    };
    return schema;
  }

  /** @internal */
  public _bind(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host);
    super._bind(host, ops);
  }

  /** @internal */
  public _toInflight(): core.Code {
    return makeSimulatorJsClient(__filename, this);
  }
}
