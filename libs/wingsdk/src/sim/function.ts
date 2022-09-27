import { Construct, IConstruct } from "constructs";
import * as cloud from "../cloud";
import { FunctionProps } from "../cloud";
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

export class Function extends cloud.FunctionBase implements IResource {
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
    // FIXME
    return InflightClient.for(__filename, "FunctionClient", [
      `"${this.node.id}"`,
    ]);
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
      attrs: {} as any,
      callers: [],
      callees: [],
    };
  }

  public addEnvironment(name: string, value: string) {
    this.env[name] = value;
  }
}
