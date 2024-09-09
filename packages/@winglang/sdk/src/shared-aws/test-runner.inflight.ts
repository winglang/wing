import { FunctionClient } from "./function.inflight";
import { ITestRunnerClient, TestResult, Trace } from "../std";

export class TestRunnerClient implements ITestRunnerClient {
  // A map from test names to their corresponding function ARNs.
  private readonly tests: Map<string, string>;

  constructor({ $tests }: { $tests: string }) {
    // Expects a JSON string of the form:
    // [
    //   ["testPath1", "functionArn1"],
    //   ["testPath2", "functionArn2"],
    //   ...
    // ]
    this.tests = new Map(JSON.parse($tests) as [string, string][]);
  }

  public async listTests(): Promise<string[]> {
    return Array.from(this.tests.keys());
  }

  public async runTest(path: string): Promise<TestResult> {
    let functionArn = this.tests.get(path);
    if (!functionArn) {
      throw new Error(`No test found with path "${path}"`);
    }
    const client = new FunctionClient({
      $functionArn: functionArn,
      $constructPath: path,
    });
    let traces: Trace[] = [];
    let pass = false;
    let error: string | undefined;

    try {
      const [_, functionTraces] = await client.invokeWithLogs("");
      traces.push(...functionTraces);
      pass = true;
    } catch (e: any) {
      error = e.stack;
    }
    return {
      path,
      pass,
      error,
      traces,
    };
  }
}
