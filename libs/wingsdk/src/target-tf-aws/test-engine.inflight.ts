import { FunctionClient } from "./function.inflight";
import { ITestEngineClient, TestResult } from "../cloud";

export class TestEngineClient implements ITestEngineClient {
  // A map from test names to their corresponding function ARNs.
  private readonly tests: Map<string, string>;

  constructor(tests: string) {
    // Expects a JSON string of the form:
    // [
    //   ["testName1", "functionArn1"],
    //   ["testName2", "functionArn2"],
    //   ...
    // ]
    this.tests = new Map(JSON.parse(tests) as [string, string][]);
  }

  public async listTests(): Promise<string[]> {
    return Array.from(this.tests.keys());
  }

  public async runTest(name: string): Promise<TestResult> {
    let functionArn = this.tests.get(name);
    if (!functionArn) {
      throw new Error(`No test found with name "${name}"`);
    }
    const client = new FunctionClient(functionArn);
    let pass = false;
    let error: string | undefined;
    try {
      await client.invoke("");
      pass = true;
    } catch (e) {
      error = (e as any).message;
    }
    return {
      name,
      pass,
      error,
    };
  }
}
