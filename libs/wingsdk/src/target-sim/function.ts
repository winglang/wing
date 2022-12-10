import { Construct } from "constructs";
import * as cloud from "../cloud";
import {
  Code,
  Language,
  NodeJsCode,
  Inflight,
  Resource,
  Policies,
} from "../core";
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
    props: cloud.FunctionProps
  ) {
    super(scope, id, inflight, props);

    if (inflight.code.language !== Language.NODE_JS) {
      throw new Error("Only Node.js code is currently supported.");
    }

    const resourceClients = inflight.makeClients(this);
    const bundledCode = inflight.bundle({
      host: this,
      resourceClients,
    });

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

  public toSimulator(): BaseResourceSchema {
    const schema: FunctionSchema = {
      type: cloud.FUNCTION_TYPE,
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
  public _bind(host: Resource, _policies: Policies): Code {
    return bindSimulatorResource("function", this, host);
  }
}
