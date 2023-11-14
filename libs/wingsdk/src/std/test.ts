import { Construct } from "constructs";
import { IResource, Resource } from "./resource";
import { Function, FunctionProps } from "../cloud/function";
import { fqnForType } from "../constants";
import { App } from "../core";
import { Node } from "../std";

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
export class Test extends Resource {
  /**
   * The function that will be called when the test is run. This will only be created
   * if the app is compiled with `wing test` for a non-simulator target.
   * @internal
   */
  public readonly _fn: Function | undefined;

  constructor(
    scope: Construct,
    id: string,
    inflight: ITestHandler,
    props: TestProps = {}
  ) {
    super(scope, id);

    Node.of(this).title = "Test";
    Node.of(this).description = "A cloud unit test.";

    if (App.of(this).isTestEnvironment || App.of(this)._target === "sim") {
      this._fn = new Function(this, "Handler", inflight, props);
    }
  }

  /** @internal */
  public _supportedOps(): string[] {
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
export interface ITestHandler extends IResource {}

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
