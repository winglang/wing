import { Construct, IConstruct } from "constructs";
import * as cloud from "../cloud";
import { FunctionProps, FUNCTION_TYPE } from "../cloud";
import { Code, Language, NodeJsCode, Inflight, CaptureMetadata } from "../core";
import { TextFile } from "../fs";
import { ISimulatorResource } from "./resource";
import { BaseResourceSchema } from "./schema";
import { FunctionSchema } from "./schema-resources";
import { bindSimulatorResource } from "./util";

export const ENV_WING_SIM_INFLIGHT_RESOURCE_PATH =
  "WING_SIM_INFLIGHT_RESOURCE_PATH";
export const ENV_WING_SIM_INFLIGHT_RESOURCE_TYPE =
  "WING_SIM_INFLIGHT_RESOURCE_TYPE";

/**
 * Simulator implementation of `cloud.Function`.
 *
 * @inflight `@winglang/wingsdk.cloud.IFunctionClient`
 */
export class Function extends cloud.FunctionBase implements ISimulatorResource {
  private readonly env: Record<string, string> = {};
  private readonly code: Code;

  constructor(
    scope: Construct,
    id: string,
    inflight: Inflight,
    props: FunctionProps
  ) {
    super(scope, id, inflight, props);

    if (inflight.code.language !== Language.NODE_JS) {
      throw new Error("Only Node.js code is currently supported.");
    }

    const captureClients = inflight.makeClients(this);
    const bundledCode = inflight.bundle({ captureScope: this, captureClients });

    const assetPath = `assets/${this.node.id}/index.js`;
    new TextFile(this, "Code", assetPath, {
      lines: [bundledCode.text],
    });
    this.code = NodeJsCode.fromFile(assetPath);

    for (const [name, value] of Object.entries(props.env ?? {})) {
      this.addEnvironment(name, value);
    }
  }

  public addEnvironment(name: string, value: string) {
    if (this.env[name] !== undefined) {
      throw new Error(`Environment variable "${name}" already set.`);
    }
    this.env[name] = value;
  }

  public toSimulatorSchema(): BaseResourceSchema {
    const schema: FunctionSchema = {
      type: FUNCTION_TYPE,
      path: this.node.path,
      props: {
        sourceCodeFile: this.code.path,
        sourceCodeLanguage: "javascript",
        environmentVariables: this.env,
      },
      attrs: {} as any,
    };
    return schema;
  }

  /** @internal */
  public _bind(captureScope: IConstruct, _metadata: CaptureMetadata): Code {
    return bindSimulatorResource("function", this, captureScope);
  }
}
