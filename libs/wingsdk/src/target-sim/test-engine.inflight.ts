import { ISimulatorResourceInstance } from "./resource";
import { TestEngineAttributes, TestEngineSchema } from "./schema-resources";
import { IFunctionClient, ITestEngineClient, TestResult } from "../cloud";
import { ISimulatorContext } from "../testing";

export class TestEngineClient
  implements ITestEngineClient, ISimulatorResourceInstance
{
  // A map from test paths to their corresponding function handles.
  private readonly tests: Map<string, string>;
  private readonly context: ISimulatorContext;

  constructor(props: TestEngineSchema["props"], context: ISimulatorContext) {
    this.tests = new Map(Object.entries(props.tests));
    this.context = context;
  }

  public async init(): Promise<TestEngineAttributes> {
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
    try {
      await fnClient.invoke("");
      pass = true;
    } catch (e) {
      error = (e as any).message;
    }
    return {
      path,
      pass,
      error,
    };
  }
}
