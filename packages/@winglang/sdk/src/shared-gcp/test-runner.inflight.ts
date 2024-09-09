import { execSync } from "child_process";
import { FunctionClient } from "./function.inflight";
import { ITestRunnerClient, TestResult, Trace } from "../std";

export class TestRunnerClient implements ITestRunnerClient {
  // A map from test names to their corresponding function ARNs.
  private readonly tests: Map<string, string>;
  private readonly token: string;

  constructor({ $tests }: { $tests: string }) {
    // Expects a JSON string of the form:
    // [
    //   ["testPath1", "functionArn1"],
    //   ["testPath2", "functionArn2"],
    //   ...
    // ]
    this.tests = new Map(JSON.parse($tests) as [string, string][]);
    this.token =
      process.env.GCP_ID_TOKEN ??
      execSync("gcloud auth print-identity-token").toString().replace("\n", "");
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
      $functionName: functionArn,
      $projectId: process.env.GOOGLE_PROJECT_ID as string,
      $region: process.env.GOOGLE_REGION as string,
    });
    let traces: Trace[] = [];
    let pass = false;
    let error: string | undefined;

    try {
      const [_, functionTraces] = await client.invokeWithLogs("", this.token);
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
