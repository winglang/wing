import { TestRunnerAttributes, TestRunnerSchema } from "./schema-resources";
import { IFunctionClient } from "../cloud";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
  UpdatePlan,
} from "../simulator";
import { ITestRunnerClient, TestResult, TraceType } from "../std";

export class TestRunner
  implements ITestRunnerClient, ISimulatorResourceInstance
{
  // A map from test paths to their corresponding function handles.
  private readonly tests: Map<string, string>;
  private _context: ISimulatorContext | undefined;

  constructor(props: TestRunnerSchema) {
    this.tests = new Map(Object.entries(props.tests));
  }

  private get context(): ISimulatorContext {
    if (!this._context) {
      throw new Error("Cannot access context during class construction");
    }
    return this._context;
  }

  public async init(context: ISimulatorContext): Promise<TestRunnerAttributes> {
    this._context = context;
    return {};
  }

  public async cleanup(): Promise<void> {
    return;
  }

  public async save(): Promise<void> {}

  public async plan() {
    return UpdatePlan.AUTO;
  }

  public async listTests(): Promise<string[]> {
    return Array.from(this.tests.keys());
  }

  public async runTest(path: string): Promise<TestResult> {
    let functionHandle = this.tests.get(path);
    if (!functionHandle) {
      throw new Error(`No test found at path "${path}"`);
    }
    const fnClient = this.context.getClient(
      functionHandle,
      true
    ) as IFunctionClient;
    let pass = false;
    let error: string | undefined;
    const previousTraces = this.context.listTraces().length;
    try {
      await fnClient.invoke();
      pass = true;
    } catch (e: any) {
      error = e.stack;
    }
    // only return traces that were added after the test was run
    const newTraces = this.context.listTraces().slice(previousTraces);

    // as well as any log trace prior to that- https://github.com/winglang/wing/issues/4995
    const logTraces = this.context
      .listTraces()
      .slice(0, previousTraces)
      .filter((trace) => trace.type === TraceType.LOG);

    return {
      path,
      pass,
      error,
      traces: [...logTraces, ...newTraces],
    };
  }
}
