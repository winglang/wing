import { Construct, IConstruct } from "constructs";
import { Function } from "./function";
import { fqnForType } from "../constants";
import { App } from "../core/app";
import { Resource } from "../std";

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

  constructor(scope: Construct, id: string, props: TestRunnerProps = {}) {
    super(scope, id);

    this.display.hidden = true;
    this.display.title = "TestRunner";
    this.display.description =
      "A suite of APIs for running tests and collecting results.";

    props;
  }

  /**
   * Find all tests in the construct tree. Currently these are all
   * `cloud.Function` resources with a path that ends in `/test` or
   * `/test:<name>`.
   * @returns A list of tests.
   */
  public findTests(): Function[] {
    const isFunction = (fn: any): fn is Function => {
      return fn instanceof Function;
    };
    return this.node.root.node
      .findAll()
      .filter(TestRunner.isTest)
      .filter(isFunction);
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
   * Run a test with a given path and return the result.
   * @inflight
   */
  runTest(path: string): Promise<TestResult>;
}

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

  /**
   * List of traces emitted during the test.
   */
  readonly traces: Trace[];
}

/**
 * Represents an trace emitted during simulation.
 */
export interface Trace {
  /**
   * A JSON blob with structured data.
   */
  readonly data: any;

  /**
   * The type of the source that emitted the trace.
   */
  readonly sourceType: string;

  /**
   * The path of the resource that emitted the trace.
   */
  readonly sourcePath: string;

  /**
   * The type of a trace.
   */
  readonly type: TraceType;

  /**
   * The timestamp of the event, in ISO 8601 format.
   * @example 2020-01-01T00:00:00.000Z
   */
  readonly timestamp: string;
}

/**
 * The type of a trace.
 */
export enum TraceType {
  /**
   * A trace representing a resource activity.
   */
  RESOURCE = "resource",
  /**
   * A trace representing a message emitted by the logger.
   */
  LOG = "log",
}

/**
 * List of inflight operations available for `TestRunner`.
 * @internal
 */
export enum TestRunnerInflightMethods {
  /** `TestRunner.runTest` */
  RUN_TEST = "runTest",
  /** `TestRunner.listTests` */
  LIST_TESTS = "listTests",
}
