import { Construct, IConstruct } from "constructs";
import { fqnForType } from "../constants";
import { App, Resource } from "../core";

/**
 * Global identifier for `TestRunner`.
 */
export const TEST_RUNNER_FQN = fqnForType("cloud.TestRunner");

/**
 * Properties for `TestRunner`.
 */
export interface TestRunnerProps {}

/**
 * Represents a test engine.
 *
 * @inflight `@winglang/sdk.cloud.ITestRunnerClient`
 */
export abstract class TestRunner extends Resource {
  /**
   * Create a new test engine.
   * @internal
   */
  public static _newTestRunner(
    scope: Construct,
    id: string,
    props: TestRunnerProps = {}
  ): TestRunner {
    return App.of(scope).newAbstract(TEST_RUNNER_FQN, scope, id, props);
  }

  /**
   * Returns whether a construct represents a runnable test.
   * @param c A construct.
   * @returns Whether the construct is a test.
   */
  public static isTest(c: IConstruct): boolean {
    const regex = /(\/test$|\/test:([^\\/])+$)/;
    return regex.test(c.node.path);
  }

  public readonly stateful = false;

  constructor(scope: Construct, id: string, props: TestRunnerProps = {}) {
    super(scope, id);

    this.display.title = "TestRunner";
    this.display.description =
      "A suite of APIs for running tests and collecting results.";

    props;
  }
}

/**
 * Inflight interface for `TestRunner`.
 */
export interface ITestRunnerClient {
  /**
   * List all tests available for this test engine.
   * @inflight
   * @returns A list of test names.
   */
  listTests(): Promise<string[]>;

  /**
   * Run a test with a given name and return the result.
   * @inflight
   */
  runTest(name: string): Promise<TestResult>;
}

// TODO: include test traces? (e.g. for debugging)
// TODO: include test duration?

/**
 * A result of a single test.
 */
export interface TestResult {
  /**
   * The path of the test.
   */
  readonly path: string;

  /**
   * Whether the test passed.
   */
  readonly pass: boolean;

  /**
   * The error message if the test failed.
   */
  readonly error?: string;
}

/**
 * List of inflight operations available for `TestRunner`.
 * @internal
 */
export enum TestRunnerInflightMethods {
  /** `TestRunner.runTest` */
  RUN_TEST = "run_test",
}
