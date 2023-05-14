import { TerraformOutput } from "cdktf/lib/terraform-output";
import { Lazy } from "cdktf/lib/tokens";
import { Construct } from "constructs";
import { Function as AwsFunction } from "./function";
import * as cloud from "../cloud";
import * as core from "../core";
import { IInflightHost } from "../std";

const OUTPUT_TEST_RUNNER_FUNCTION_ARNS = "WING_TEST_RUNNER_FUNCTION_ARNS";

/**
 * AWS implementation of `cloud.TestRunner`.
 *
 * @inflight `@winglang/sdk.cloud.ITestRunnerClient`
 */
export class TestRunner extends cloud.TestRunner {
  constructor(scope: Construct, id: string, props: cloud.TestRunnerProps = {}) {
    super(scope, id, props);

    // This output is created so the CLI's `wing test` command can obtain a list
    // of all ARNs of test functions by running `terraform output`.
    const output = new TerraformOutput(this, "TestFunctionArns", {
      value: Lazy.stringValue({
        produce: () => {
          return JSON.stringify([...this.getTestFunctionArns().entries()]);
        },
      }),
    });

    output.overrideLogicalId(OUTPUT_TEST_RUNNER_FUNCTION_ARNS);
  }

  /** @internal */
  public _bind(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof AwsFunction)) {
      throw new Error("TestRunner can only be bound by tfaws.Function for now");
    }

    // Collect all of the test functions and their ARNs, and pass them to the
    // test engine so they can be invoked inflight.
    // TODO: are we going to run into AWS's 4KB environment variable limit here?
    // some solutions:
    // - base64 encode the string value
    // - move the logic for picking one test from each isolated environment to
    //   here so that if there are N tests in the original app and N
    //   environments, we only need to output N test function ARNs instead of
    //   N * N
    const testFunctions = this.getTestFunctionArns();
    host.addEnvironment(
      this.envTestFunctionArns(),
      JSON.stringify([...testFunctions.entries()])
    );

    super._bind(host, ops);
  }

  /** @internal */
  public _preSynthesize(): void {
    // add a dependency on each test function
    for (const test of this.findTests()) {
      this.node.addDependency(test._fn);
    }

    super._preSynthesize();
  }

  private getTestFunctionArns(): Map<string, string> {
    const arns = new Map<string, string>();
    for (const test of this.findTests()) {
      if (!(test._fn instanceof AwsFunction)) {
        throw new Error(
          `Unsupported test function type, ${test._fn.node.path} was not a tfaws.Function`
        );
      }
      arns.set(test.node.path, (test._fn as AwsFunction).arn);
    }
    return arns;
  }

  /** @internal */
  public _toInflight(): core.Code {
    return core.InflightClient.for(__dirname, __filename, "TestRunnerClient", [
      `process.env["${this.envTestFunctionArns()}"]`,
    ]);
  }

  private envTestFunctionArns(): string {
    return `TEST_RUNNER_FUNCTIONS_${this.node.addr.slice(-8)}`;
  }
}
