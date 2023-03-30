import { Construct } from "constructs";
import { Function as SimFunction } from "./function";
import { ISimulatorResource } from "./resource";
import { BaseResourceSchema } from "./schema";
import { TestRunnerSchema, TEST_RUNNER_TYPE } from "./schema-resources";
import { simulatorHandleToken } from "./util";
import * as cloud from "../cloud";
import * as core from "../core";

/**
 * Simulator implementation of `cloud.TestRunner`.
 *
 * @inflight `@winglang/sdk.cloud.ITestRunnerClient`
 */
export class TestRunner extends cloud.TestRunner implements ISimulatorResource {
  constructor(scope: Construct, id: string, props: cloud.TestRunnerProps = {}) {
    super(scope, id, props);
  }

  public toSimulator(): BaseResourceSchema {
    const tests = this.getTestFunctionHandles();
    const schema: TestRunnerSchema = {
      type: TEST_RUNNER_TYPE,
      path: this.node.path,
      props: {
        tests,
      },
      attrs: {} as any,
    };
    return schema;
  }

  /** @internal */
  public _bind(host: core.IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("TestRunner can only be bound by tfaws.Function for now");
    }

    super._bind(host, ops);
  }

  /** @internal */
  public _preSynthesize(): void {
    // add a dependency on each test function
    for (const fn of this.findTestFunctions()) {
      this.node.addDependency(fn);
    }

    super._preSynthesize();
  }

  private findTestFunctions(): SimFunction[] {
    const isSimFunction = (fn: any): fn is SimFunction => {
      return fn instanceof SimFunction;
    };
    return this.node.root.node
      .findAll()
      .filter(TestRunner.isTest)
      .filter(isSimFunction);
  }

  private getTestFunctionHandles(): Record<string, string> {
    const handles: Record<string, string> = {};
    for (const fn of this.findTestFunctions()) {
      handles[fn.node.path] = simulatorHandleToken(fn);
    }
    return handles;
  }

  /** @internal */
  public _toInflight(): core.Code {
    return core.InflightClient.for(
      __dirname,
      __filename,
      "TestRunnerClient",
      []
    );
  }
}
