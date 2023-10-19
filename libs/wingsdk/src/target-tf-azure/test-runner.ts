import { TerraformOutput } from "cdktf/lib/terraform-output";
import { Lazy } from "cdktf/lib/tokens";
import { Construct } from "constructs";
import { Function as AzureFunction } from "./function";
import * as core from "../core";
import * as std from "../std";

const OUTPUT_TEST_RUNNER_FUNCTION_IDENTIFIERS =
  "WING_TEST_RUNNER_FUNCTION_ARNS"; //TODO: [tsuf] rename arns to identifiers

/**
 * Tf-Azure implementation of `cloud.TestRunner`.
 *
 * @inflight `@winglang/sdk.cloud.ITestRunnerClient`
 */
export class TestRunner extends std.TestRunner {
  constructor(scope: Construct, id: string, props: std.TestRunnerProps = {}) {
    super(scope, id, props);
    // This output is created so the CLI's `wing test` command can obtain a list
    // of all names of test functions by running `terraform output`.
    const output = new TerraformOutput(this, "TestFunctionIdentifiers", {
      value: Lazy.stringValue({
        produce: () => {
          return JSON.stringify([
            ...this.getTestFunctionIdentifiers().entries(),
          ]);
        },
      }),
    });

    output.overrideLogicalId(OUTPUT_TEST_RUNNER_FUNCTION_IDENTIFIERS);
  }

  public bind(host: std.IInflightHost, ops: string[]): void {
    if (!(host instanceof AzureFunction)) {
      throw new Error(
        "TestRunner can only be bound by tfazure.Function for now"
      );
    }

    const testFunctions = this.getTestFunctionIdentifiers();
    host.addEnvironment(
      this.envTestFunctionIdentifiers(),
      JSON.stringify([...testFunctions.entries()])
    );

    super.bind(host, ops);
  }

  /** @internal */
  public _preSynthesize(): void {
    // add a dependency on each test function
    for (const test of this.findTests()) {
      if (test._fn) {
        this.node.addDependency(test._fn);
      }
    }

    super._preSynthesize();
  }

  private getTestFunctionIdentifiers(): Map<string, string> {
    const arns = new Map<string, string>();
    for (const test of this.findTests()) {
      if (test._fn) {
        if (!(test._fn instanceof AzureFunction)) {
          throw new Error(
            `Unsupported test function type, ${test._fn.node.path} was not a tfazure.Function`
          );
        }
        arns.set(test.node.path, (test._fn as AzureFunction).name);
      }
    }
    return arns;
  }

  /** @internal */
  public _toInflight(): string {
    return core.InflightClient.for(__dirname, __filename, "TestRunnerClient", [
      `process.env["${this.envTestFunctionIdentifiers()}"]`,
    ]);
  }

  private envTestFunctionIdentifiers(): string {
    return `TEST_RUNNER_FUNCTIONS_${this.node.addr.slice(-8)}`;
  }
}
