import { Construct } from "constructs";
import { Resource } from "./resource";
import { Test } from "./test";
import { Function, FunctionProps, IFunctionHandler } from "../cloud";
import { fqnForType } from "../constants";
import { App } from "../core";
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
  /**
   * Instantiate one or more copies of a tree inside of an app based
   * on how many isolated environments are needed for testing.
   * @internal
   */
  public static _createTree(app: App, Root: any) {
    if (app.isTestEnvironment) {
      app._testRunner = new TestRunner(app, "cloud.TestRunner");
    }

    if (Root) {
      // mark the root type so that we can find it later through
      // Node.of(root).root
      Node._markRoot(Root);

      if (app.isTestEnvironment) {
        new Root(app, "env0");
        const tests = app._testRunner!.findTests();
        for (let i = 1; i < tests.length; i++) {
          new Root(app, "env" + i);
        }
      } else {
        new Root(app, "Default");
      }
    }
  }

  /**
   * List of isolated environment names where we've already created a cloud.Function
   * for a unit test. We keep track of these so that we don't synthesize
   * multiple test functions into the same isolated environment.
   */
  private _synthedEnvs: Set<string> = new Set();

  /**
   * List of test paths that we have already created a cloud.Function for.
   * We keep track of these so that we don't create identical test functions in multiple
   * isolated environments.
   */
  private _synthedTests: Set<string> = new Set();

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
  public _addTestFunction(
    scope: Construct,
    id: string,
    inflight: IFunctionHandler,
    props: FunctionProps
  ): Function | undefined {
    // searching exactly for `env${number}`
    const testEnv = scope.node.path.match(/env[0-9]+/)?.at(0)!;
    // searching for the rest of the path that appears after `env${number}`- this would be the test path
    const testPath =
      scope.node.path
        .match(/env[\d]+\/.+/)
        ?.at(0)!
        .replace(`${testEnv}/`, "") +
      "/" +
      id;

    if (!this._synthedEnvs.has(testEnv) && !this._synthedTests.has(testPath)) {
      this._synthedEnvs.add(testEnv);
      this._synthedTests.add(testPath);
      return new Function(scope, id, inflight, props);
    }

    return undefined;
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
   * Unsupported resource tested
   */
  readonly unsupportedResource?: string;

  /**
   * Unsupported method used in test
   */
  readonly unsupportedOperation?: string;

  /**
   * Place for extra test runner arguments that can be added through platforms
   */
  readonly args?: Record<string, unknown>;

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
