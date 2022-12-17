import { readFileSync } from "fs";
import { join } from "path";
import { Construct } from "constructs";
import * as esbuild from "esbuild-wasm";
import * as cloud from "../cloud";
import * as core from "../core";
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
  private readonly env: Record<string, string> = {};
  private readonly code: core.Code;

  constructor(
    scope: Construct,
    id: string,
    inflight: cloud.IFunctionHandler,
    props: cloud.FunctionProps
  ) {
    super(scope, id, inflight, props);

    inflight._bind(this, ["handle"]);

    const inflightClient = inflight._inflightJsClient();
    const lines = new Array<string>();
    lines.push("exports.handler = async function(event) {");
    lines.push(`  return await ${inflightClient.text}.handle(event);`);
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
    this.code = core.NodeJsCode.fromFile(assetPath);

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
  public _bind(host: core.Resource, ops: string[]): void {
    bindSimulatorResource("function", this, host);
    super._bind(host, ops);
  }

  /** @internal */
  public _inflightJsClient(): core.Code {
    // TODO: assert that `env` is added to the `host` resource
    const env = `FUNCTION_HANDLE_${this.node.addr.slice(-8)}`;
    return core.NodeJsCode.fromInline(
      `$simulator.findInstance(process.env["${env}"])`
    );
  }
}

core.Resource._annotateInflight(Function, "invoke", {});
