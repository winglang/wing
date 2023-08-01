import { FunctionClient } from "./function.inflight";
import { ITestRunnerClient, TestResult, Trace } from "../std";

export class TestRunnerClient implements ITestRunnerClient {
  // A map from test names to their corresponding function ARNs.
  private readonly tests: Map<string, string>;
  private readonly extendedLogging: boolean;

  constructor(tests: string, extendedLogging: boolean) {
    // Expects a JSON string of the form:
    // [
    //   ["testPath1", "functionArn1"],
    //   ["testPath2", "functionArn2"],
    //   ...
    // ]
    this.tests = new Map(JSON.parse(tests) as [string, string][]);
    this.extendedLogging = extendedLogging;
  }

  public async listTests(): Promise<string[]> {
    return Array.from(this.tests.keys());
  }

  public async runTest(path: string): Promise<TestResult> {
    let functionArn = this.tests.get(path);
    if (!functionArn) {
      throw new Error(`No test found with path "${path}"`);
    }
    const client = new FunctionClient(functionArn, path);
    let traces: Trace[] = [];
    let pass = false;
    let error: string | undefined;

    try {
      const [_, functionTraces] = await client.invokeWithLogs(
        "",
        this.extendedLogging
      );
      traces.push(...functionTraces);
      pass = true;
    } catch (e) {
      error = (e as any).stack;
    }
    return {
      path,
      pass,
      error,
      traces,
    };
  }
}
