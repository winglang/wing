import { log } from "console";
import { Construct } from "constructs";
import { CloudfunctionsFunction } from "../.gen/providers/google/cloudfunctions-function";
import * as cloud from "../cloud";
import * as core from "../core";
import { NameOptions, ResourceNames } from "../shared/resource-names";
import { IGcpFunction } from "../shared-gcp/function";
import { PolicyStatement } from "../shared-gcp/types";
import { IInflightHost } from "../std";

// TODO(wiktor.zajac) update rules to match GCP
/**
 * Function names are limited to 64 characters.
 * You can use alphanumeric characters, hyphens (-), and underscores (_).
 */
const FUNCTION_NAME_OPTS: NameOptions = {
  maxLen: 64,
  disallowedRegex: /[^a-zA-Z0-9\_\-]+/g,
};

/**
 * GCP implementation of `cloud.Function`.
 *
 * @inflight `@winglang/sdk.cloud.IFunctionClient`
 */
export class Function extends cloud.Function implements IGcpFunction {
  private readonly function: CloudfunctionsFunction;
  // TODO(wiktor.zajac) check if it does it need to be undefined,
  // or a default value can be set to [] and readonly keyword added
  private policyStatements?: any[];

  constructor(
    scope: Construct,
    id: string,
    inflight: cloud.IFunctionHandler,
    props: cloud.FunctionProps = {}
  ) {
    super(scope, id, inflight, props);

    const name = ResourceNames.generateName(this, FUNCTION_NAME_OPTS);

    this.function = new CloudfunctionsFunction(this, "Default", {
      name: name,
      runtime: "nodejs18.x",
    });

    log(this.function);
  }

  public bind(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("functions can only be bound by tfaws.Function for now");
    }

    if (ops.includes(cloud.FunctionInflightMethods.INVOKE)) { }
  }

  public addPolicyStatements(statements: PolicyStatement[]): void {
    if (!this.policyStatements) {
      this.policyStatements = [];
    }

    for (const statement of statements) {
      this.policyStatements.push({
        // TODO(wiktor.zajac) fix this along with [PolicyStatement] type
        statement,
      });
    }
  }

  public _toInflight(): string {
    return core.InflightClient.for(
      __dirname.replace("target-tf-gcp", "shared-gcp"),
      __filename,
      "FunctionClient",
      [`process.env["${this.envName()}"], "${this.node.path}"`]
    );
  }

  private envName(): string {
    return `FUNCTION_NAME_${this.node.addr.slice(-8)}`;
  }
}
