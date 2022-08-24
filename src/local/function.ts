import { unlinkSync, writeFileSync } from "fs";
import { basename, dirname, join, resolve } from "path";
import type { FunctionSchema } from "@monadahq/wing-local";
import { Construct } from "constructs";
import * as esbuild from "esbuild";
import * as cloud from "../cloud";
import { FunctionImplProps } from "../cloud";
import {
  Capture,
  Code,
  ICapturable,
  Language,
  NodeJsCode,
  Inflight,
} from "../core";
import { TextFile } from "../fs";
import { IResource } from "./resource";

export class Function extends cloud.FunctionBase implements IResource {
  private readonly env: Record<string, string> = {};
  private readonly code: Code;

  constructor(scope: Construct, id: string, props: FunctionImplProps) {
    super(scope, id, props);

    const inflight = props.inflight;

    if (inflight.code.language !== Language.NODE_JS) {
      throw new Error("Only Node.js code is currently supported.");
    }

    const bundledCode = this.rewriteHandler(inflight);

    const assetPath = `assets/${this.node.id}/index.js`;
    new TextFile(this, "Code", assetPath, {
      lines: [bundledCode.text],
    });
    this.code = NodeJsCode.fromFile(assetPath);
  }

  public capture(_consumer: any, _capture: Capture): Code {
    throw new Error("Method not implemented.");
  }

  /** @internal */
  public _toResourceSchema(): FunctionSchema {
    return {
      id: this.node.id,
      path: this.node.path,
      type: "cloud.Function",
      props: {
        sourceCodeFile: this.code.path,
        sourceCodeLanguage: "javascript",
        environmentVariables: this.env,
      },
      callers: [],
      callees: [],
    };
  }

  public addEnvironment(name: string, value: string) {
    this.env[name] = value;
  }

  /**
   * Rewrite the handler code to include the captured variables and bundle
   * any dependencies.
   */
  private rewriteHandler(inflight: Inflight): Code {
    const lines = new Array<string>();

    const code = inflight.code;

    const absolutePath = resolve(code.path);
    const workdir = dirname(absolutePath);
    const filename = basename(code.path);

    lines.push("const $cap = {}");
    for (const [name, capture] of Object.entries(inflight.captures)) {
      const clientCode = this.createClient(name, capture);
      lines.push(`$cap["${name}"] = ${clientCode.text};`);
    }
    lines.push();
    lines.push(code.text);
    lines.push();
    lines.push("exports.handler = async function(event) {");
    lines.push("  return await $proc($cap, event);");
    lines.push("};");

    const content = lines.join("\n");
    const filenamenew = filename + ".new.js";
    writeFileSync(join(workdir, filenamenew), content);

    esbuild.buildSync({
      bundle: true,
      target: "node16",
      platform: "node",
      absWorkingDir: workdir,
      entryPoints: [filenamenew],
      outfile: absolutePath,
      minify: false,
      external: [],
      allowOverwrite: true,
    });

    // clean up the temporary file
    unlinkSync(join(workdir, filenamenew));

    return code;
  }

  private createClient(name: string, capture: Capture): Code {
    if (isPrimitive(capture.obj)) {
      return NodeJsCode.fromInline(JSON.stringify(capture.obj));
    }

    if (
      typeof capture.obj == "object" &&
      typeof capture.obj.capture === "function"
    ) {
      const c: ICapturable = capture.obj;
      return c.capture(this, capture);
    }

    throw new Error(`unable to capture "${name}", no "capture" method`);
  }
}

function isPrimitive(value: any) {
  return (
    (typeof value !== "object" && typeof value !== "function") || value === null
  );
}
