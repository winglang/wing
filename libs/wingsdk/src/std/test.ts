import { Construct, IConstruct } from "constructs";
import { Display } from "./display";
import { IInflightHost } from "./resource";
import { Function, FUNCTION_FQN, FunctionProps } from "../cloud/function";
import { fqnForType } from "../constants";
import { App } from "../core";

/**
 * Global identifier for `Test`.
 */
export const TEST_FQN = fqnForType("std.Test");

/**
 * Properties for `Test`.
 *
 * This is the type users see when constructing a std.Test instance.
 * @skipDocs
 */
export interface TestProps extends FunctionProps {}

/**
 * A unit test.
 *
 * @inflight `@winglang/sdk.cloud.ITestClient`
 * @skipDocs
 */
export class Test extends Construct implements IInflightHost {
  /**
   * Creates a new std.Test instance through the app.
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

    Display.of(this).title = "Test";
    Display.of(this).description = "A cloud unit test.";

    this._fn = App.of(scope).newAbstract(
      FUNCTION_FQN,
      this,
      "Handler",
      inflight,
      props
    );
  }

  /** @internal */
  public _getInflightOps(): string[] {
    return [];
  }

  /** @internal */
  public _toInflight(): string {
    throw new Error("unimplemented");
  }
}

/**
 * Interface with an inflight "handle" method that can be used to construct
 * a `std.Test`.
 *
 * @inflight `@winglang/sdk.std.ITestHandlerClient`
 * @skipDocs
 */
export interface ITestHandler extends IConstruct {}

/**
 * Inflight client for `ITestHandler`.
 * @skipDocs
 */
export interface ITestHandlerClient {
  /**
   * Inflight function that will be called when the test is run.
   * @inflight
   */
  handle(): Promise<void>;
}
