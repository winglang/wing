import { Construct, IConstruct } from "constructs";
import { Function } from "./function";
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
  constructor(scope: Construct, id: string) {
    super(scope, id);
  }

  public toSimulator(): BaseResourceSchema {
    const tests = this.findTestFunctions();
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

  private findTestFunctions(): Record<string, string> {
    const handles: Record<string, string> = {};
    const isSimFunction = (fn: IConstruct): fn is Function => {
      return fn instanceof Function;
    };
    for (const fn of this.node.root.node.findAll().filter(isSimFunction)) {
      if (TestRunner.isTest(fn)) {
        handles[fn.node.path] = simulatorHandleToken(fn);
      }
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
