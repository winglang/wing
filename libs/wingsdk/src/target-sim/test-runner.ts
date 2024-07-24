import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { TestRunnerSchema } from "./schema-resources";
import { simulatorHandleToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import { ToSimulatorOutput } from "../simulator/simulator";
import * as std from "../std";
import { IInflightHost } from "../std";

/**
 * Simulator implementation of `cloud.TestRunner`.
 *
 * @inflight `@winglang/sdk.cloud.ITestRunnerClient`
 */
export class TestRunner extends std.TestRunner implements ISimulatorResource {
  constructor(scope: Construct, id: string, props: std.TestRunnerProps) {
    super(scope, id, props);
  }

  public toSimulator(): ToSimulatorOutput {
    const tests = this.getTestFunctionHandles();
    const props: TestRunnerSchema = {
      tests,
    };
    return {
      type: std.TEST_RUNNER_FQN,
      props,
    };
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource("test-runner", this, host, ops);
    super.onLift(host, ops);
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

  private getTestFunctionHandles(): Record<string, string> {
    const handles: Record<string, string> = {};
    for (const test of this.findTests()) {
      if (test._fn) {
        handles[test.node.path] = simulatorHandleToken(test._fn);
      }
    }
    return handles;
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClient("test-runner", this);
  }
}
