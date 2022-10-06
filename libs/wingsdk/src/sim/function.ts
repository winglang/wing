import { Construct, IConstruct } from "constructs";
import * as cloud from "../cloud";
import { FunctionProps, FUNCTION_TYPE } from "../cloud";
import {
  Code,
  Language,
  NodeJsCode,
  Inflight,
  CaptureMetadata,
  InflightClient,
} from "../core";
import { TextFile } from "../fs";
import { IResource } from "./resource";
import { FunctionSchema } from "./schema";

/**
 * Simulator implementation of `cloud.Function`.
 */
export class Function extends cloud.FunctionBase implements IResource {
  private readonly callers = new Array<string>();
  private readonly callees = new Array<string>();
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

    for (const capture of Object.values(inflight.captures)) {
      if (capture.resource !== undefined) {
        this.callees.push(capture.resource.node.path);
      }
    }

    const captureClients = inflight.makeClients(this);
    const bundledCode = inflight.bundle({ captureScope: this, captureClients });

    const assetPath = `assets/${this.node.id}/index.js`;
    new TextFile(this, "Code", assetPath, {
      lines: [bundledCode.text],
    });
    this.code = NodeJsCode.fromFile(assetPath);
  }

  private get addr(): string {
    return `\${${this.node.path}#attrs.functionAddr}`;
  }

  /**
   * @internal
   */
  public _addCallers(...callers: string[]) {
    this.callers.push(...callers);
  }

  /**
   * @internal
   */
  public _capture(captureScope: IConstruct, _metadata: CaptureMetadata): Code {
    if (!(captureScope instanceof Function)) {
      throw new Error(
        "functions can only be captured by a sim.Function for now"
      );
    }

    this.callers.push(captureScope.node.path);

    const env = `FUNCTION_ADDR__${this.node.id}`;
    captureScope.addEnvironment(env, this.addr);

    return InflightClient.for(__filename, "FunctionClient", [
      `process.env["${env}"]`,
    ]);
  }

  /** @internal */
  public _toResourceSchema(): FunctionSchema {
    return {
      type: FUNCTION_TYPE,
      props: {
        sourceCodeFile: this.code.path,
        sourceCodeLanguage: "javascript",
        environmentVariables: this.env,
      },
      attrs: {} as any,
      callers: this.callers,
      callees: this.callees,
    };
  }

  public addEnvironment(name: string, value: string) {
    this.env[name] = value;
  }
}
