import { Construct } from "constructs";
import { Function as AwsFunction } from "./function";
import * as cloud from "../cloud";
import * as core from "../core";

/**
 * AWS implementation of `cloud.TestRunner`.
 *
 * @inflight `@winglang/sdk.cloud.ITestRunnerClient`
 */
export class TestRunner extends cloud.TestRunner {
  constructor(scope: Construct, id: string, props: cloud.TestRunnerProps = {}) {
    super(scope, id, props);
  }

  /** @internal */
  public _bind(host: core.IInflightHost, ops: string[]): void {
    if (!(host instanceof AwsFunction)) {
      throw new Error("TestRunner can only be bound by tfaws.Function for now");
    }

    // Collect all of the "test" cloud.Function's and their ARNs, and pass them
    // to the test engine so they can be invoked inflight.
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
    for (const fn of this.findTests()) {
      this.node.addDependency(fn);
    }

    super._preSynthesize();
  }

  private getTestFunctionArns(): Map<string, string> {
    const arns = new Map<string, string>();
    for (const fn of this.findTests()) {
      if (!(fn instanceof AwsFunction)) {
        throw new Error(
          `Unsupported test function type, ${fn.node.path} was not a tfaws.Function`
        );
      }
      arns.set(fn.node.path, (fn as AwsFunction).arn);
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
