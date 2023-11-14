import { Construct } from "constructs";
import { Resource } from "./resource";
import { Test } from "./test";
import { fqnForType } from "../constants";
import { Node } from "../std";

/**
 * Global identifier for `TestRunner`.
 */
export const TEST_RUNNER_FQN = fqnForType("std.TestRunner");

/**
 * Properties for `TestRunner`.
 * @skipDocs
 */
export interface TestRunnerProps {}

/**
 * A test engine.
 *
 * @inflight `@winglang/sdk.std.ITestRunnerClient`
 * @skipDocs
 * @abstract
 */
export class TestRunner extends Resource {
  constructor(scope: Construct, id: string, props: TestRunnerProps = {}) {
    if (new.target === TestRunner) {
      return Resource._newFromFactory(TEST_RUNNER_FQN, scope, id, props);
    }

    super(scope, id);

    Node.of(this).hidden = true;
    Node.of(this).title = "TestRunner";
    Node.of(this).description =
      "A suite of APIs for running tests and collecting results.";

    props;
  }

  /** @internal */
  public _supportedOps(): string[] {
    return [
      TestRunnerInflightMethods.LIST_TESTS,
      TestRunnerInflightMethods.RUN_TEST,
    ];
  }

  /**
   * Find all tests in the construct tree.
   * @returns A list of tests.
   */
  public findTests(): Test[] {
    const isTest = (fn: any): fn is Test => {
      return fn instanceof Test;
    };
    return this.node.root.node.findAll().filter(isTest);
  }
}

/**
 * Inflight interface for `TestRunner`.
 * @skipDocs
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
 * @skipDocs
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
   * Whether the test contains code that is unsupported by the target.
   */
  readonly unsupported?: boolean;

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
 * A trace emitted during simulation.
 * @skipDocs
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
 * @skipDocs
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
