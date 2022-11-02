import { Construct, IConstruct } from "constructs";
import * as cloud from "../cloud";
import { FunctionProps, FUNCTION_TYPE } from "../cloud";
import { Code, Language, NodeJsCode, Inflight, CaptureMetadata } from "../core";
import { TextFile } from "../fs";
import { IResource } from "./resource";
import { FunctionSchema } from "./schema-resources";
import { captureSimulatorResource } from "./util";

/**
 * Simulator implementation of `cloud.Function`.
 *
 * @inflight `@monadahq/wingsdk.sim.IFunctionClient`
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

    for (const [name, value] of Object.entries(props.env ?? {})) {
      this.addEnvironment(name, value);
    }
  }

  public addEnvironment(name: string, value: string) {
    this.env[name] = value;
  }

  /** @internal */
  public _addCallers(...callers: string[]) {
    this.callers.push(...callers);
  }

  /** @internal */
  public _capture(captureScope: IConstruct, _metadata: CaptureMetadata): Code {
    return captureSimulatorResource("function", this, captureScope);
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
}

/**
 * Simulator implementation of inflight client for `cloud.Function`.
 */
export interface IFunctionClient extends cloud.IFunctionClient {
  /**
   * Returns the number of times the function was invoked since its creation.
   *
   * @experimental
   */
  timesCalled(): Promise<number>;
}
