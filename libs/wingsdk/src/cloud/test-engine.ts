import { Construct, IConstruct } from "constructs";
import { fqnForType } from "../constants";
import { App, Resource } from "../core";

/**
 * Global identifier for `TestEngine`.
 */
export const TEST_ENGINE_FQN = fqnForType("cloud.TestEngine");

/**
 * Properties for `TestEngine`.
 */
export interface TestEngineProps {}

/**
 * Represents a test engine.
 *
 * @inflight `@winglang/sdk.cloud.ITestEngineClient`
 */
export abstract class TestEngine extends Resource {
  /**
   * Create a new test engine.
   * @internal
   */
  public static _newTestEngine(
    scope: Construct,
    id: string,
    props: TestEngineProps = {}
  ): TestEngine {
    return App.of(scope).newAbstract(TEST_ENGINE_FQN, scope, id, props);
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

  constructor(scope: Construct, id: string, props: TestEngineProps = {}) {
    super(scope, id);

    this.display.title = "TestEngine";
    this.display.description =
      "A suite of APIs for running tests and collecting results.";

    props;
  }
}

/**
 * Inflight interface for `TestEngine`.
 */
export interface ITestEngineClient {
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
 * List of inflight operations available for `TestEngine`.
 * @internal
 */
export enum TestEngineInflightMethods {
  /** `TestEngine.runTest` */
  RUN_TEST = "run_test",
}
