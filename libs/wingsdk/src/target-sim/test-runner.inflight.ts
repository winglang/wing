import { TestRunnerAttributes, TestRunnerSchema } from "./schema-resources";
import { IFunctionClient, ITestRunnerClient, TestResult } from "../cloud";
import { ISimulatorContext, ISimulatorResourceInstance } from "../testing";

export class TestRunnerClient
  implements ITestRunnerClient, ISimulatorResourceInstance
{
  // A map from test paths to their corresponding function handles.
  private readonly tests: Map<string, string>;
  private readonly context: ISimulatorContext;

  constructor(props: TestRunnerSchema["props"], context: ISimulatorContext) {
    this.tests = new Map(Object.entries(props.tests));
    this.context = context;
  }

  public async init(): Promise<TestRunnerAttributes> {
    return {};
  }

  public async cleanup(): Promise<void> {
    return;
  }

  public async listTests(): Promise<string[]> {
    return Array.from(this.tests.keys());
  }

  public async runTest(path: string): Promise<TestResult> {
    let functionHandle = this.tests.get(path);
    if (!functionHandle) {
      throw new Error(`No test found at path "${path}"`);
    }
    const fnClient = this.context.findInstance(
      functionHandle
    ) as IFunctionClient & ISimulatorResourceInstance;
    if (!fnClient) {
      throw new Error(`No function client found for test path "${path}"`);
    }
    let pass = false;
    let error: string | undefined;
    const previousTraces = this.context.listTraces().length;
    try {
      await fnClient.invoke("");
      pass = true;
    } catch (e) {
      error = (e as any).stack;
    }
    // only return traces that were added after the test was run
    const newTraces = this.context.listTraces().slice(previousTraces);
    return {
      path,
      pass,
      error,
      traces: newTraces,
    };
  }
}
