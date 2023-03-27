import { Construct, IConstruct } from "constructs";
import { Function } from "./function";
import * as cloud from "../cloud";
import * as core from "../core";

/**
 * AWS implementation of `cloud.TestRunner`.
 *
 * @inflight `@winglang/sdk.cloud.ITestRunnerClient`
 */
export class TestRunner extends cloud.TestRunner {
  constructor(scope: Construct, id: string) {
    super(scope, id);
  }

  /** @internal */
  public _bind(host: core.IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("TestRunner can only be bound by tfaws.Function for now");
    }

    // Collect all of the "test" cloud.Function's and their ARNs, and pass them
    // to the test engine so they can be invoked inflight.
    const testFunctions = this.findTestFunctions();
    host.addEnvironment(
      this.envTestFunctionArns(),
      JSON.stringify([...testFunctions.entries()])
    );

    super._bind(host, ops);
  }

  private findTestFunctions(): Map<string, string> {
    const arns = new Map<string, string>();
    const isAwsFunction = (fn: IConstruct): fn is Function => {
      return fn instanceof Function;
    };
    for (const fn of this.node.root.node.findAll().filter(isAwsFunction)) {
      if (TestRunner.isTest(fn)) {
        arns.set(fn.node.path, fn.arn);
      }
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
