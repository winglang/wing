import { readFileSync } from "fs";
import { join } from "path";
import { Construct } from "constructs";
import * as esbuild from "esbuild-wasm";
import * as cloud from "../cloud";
import { Code, NodeJsCode, OperationPolicy, Resource } from "../core";
import { TextFile } from "../fs";
import { mkdtemp } from "../util";
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
  /** @internal */
  public readonly _policies = {
    [cloud.FunctionInflightMethods.INVOKE]: {},
  };

  private readonly env: Record<string, string> = {};
  private readonly code: Code;

  constructor(
    scope: Construct,
    id: string,
    inflight: cloud.IFunctionHandler,
    props: cloud.FunctionProps
  ) {
    super(scope, id, inflight, props);

    const code = inflight._bind(this, inflight._policies.handle);

    const lines = new Array<string>();
    lines.push("exports.handler = async function(event) {");
    lines.push(`  return await ${code.text}.handle(event);`);
    lines.push("};");

    const tempdir = mkdtemp();
    const outfile = join(tempdir, "index.js");

    esbuild.buildSync({
      bundle: true,
      stdin: {
        contents: lines.join("\n"),
        resolveDir: tempdir,
        sourcefile: "inflight.js",
      },
      target: "node16",
      platform: "node",
      absWorkingDir: tempdir,
      outfile,
      minify: false,
      external: ["aws-sdk"],
    });

    const assetPath = `assets/${this.node.id}/index.js`;
    new TextFile(this, "Code", assetPath, {
      lines: [readFileSync(outfile, "utf-8")],
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
  public _bind(host: Resource, _policy: OperationPolicy): Code {
    return bindSimulatorResource("function", this, host);
  }
}
