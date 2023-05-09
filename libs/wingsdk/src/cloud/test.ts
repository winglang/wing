import { Construct } from "constructs";
import { Function, FUNCTION_FQN, FunctionProps } from "./function";
import { fqnForType } from "../constants";
import { App, Code } from "../core";
import { IInflightHost, IResource, Resource } from "../std";

/**
 * Global identifier for `Test`.
 */
export const TEST_FQN = fqnForType("cloud.Test");

/**
 * Properties for `Test`.
 *
 * This is the type users see when constructing a cloud.Test instance.
 */
export interface TestProps extends FunctionProps {}

/**
 * Represents a unit test.
 *
 * @inflight `@winglang/sdk.cloud.ITestClient`
 */
export class Test extends Resource implements IInflightHost {
  /**
   * Creates a new cloud.Test instance through the app.
   * @internal
   */
  public static _newTest(
    scope: Construct,
    id: string,
    inflight: ITestHandler,
    props: TestProps = {}
  ): Test {
    return App.of(scope).newAbstract(TEST_FQN, scope, id, inflight, props);
  }

  /** @internal */
  public readonly _fn: Function;

  constructor(
    scope: Construct,
    id: string,
    inflight: ITestHandler,
    props: TestProps = {}
  ) {
    super(scope, id);

    this.display.title = "Test";
    this.display.description = "A cloud unit test.";

    this._fn = App.of(scope).newAbstract(
      FUNCTION_FQN,
      this,
      "Handler",
      inflight,
      props
    );
  }

  /** @internal */
  public _toInflight(): Code {
    throw new Error("unimplemented");
  }
}

/**
 * Interface with an inflight "handle" method that can be used to construct
 * a `cloud.Test`.
 *
 * @inflight `@winglang/sdk.cloud.ITestHandlerClient`
 */
export interface ITestHandler extends IResource {}

/**
 * Inflight client for `ITestHandler`.
 */
export interface ITestHandlerClient {
  /**
   * Entrypoint function that will be called when the test is run.
   * @inflight
   */
  handle(event: string): Promise<void>;
}
