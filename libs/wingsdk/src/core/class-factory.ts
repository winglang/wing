import { Construct, IConstruct } from "constructs";
import { App } from "./app";
import { Node } from "../std/node";

const CLASS_FACTORY_SYMBOL = Symbol("@winglang/sdk.core.ClassFactory");

/**
 * A factory for instantiating new classes defined by platform(s).
 */
export class ClassFactory {
  /**
   * Returns the ClassFactory for the given scope.
   * @param scope the scope to get the ClassFactory for
   * @returns the ClassFactory for the given scope
   */
  public static of(scope: IConstruct): ClassFactory {
    const app = Node.of(scope).app;
    const factory = (app as any)[CLASS_FACTORY_SYMBOL];
    if (!factory) {
      throw new Error("ClassFactory not found");
    }
    return factory;
  }

  private readonly newInstanceOverrides: any[];
  private readonly resolveTypeOverrides: any[];

  public constructor(newInstanceOverrides: any[], resolveTypeOverrides: any[]) {
    this.newInstanceOverrides = newInstanceOverrides;
    this.resolveTypeOverrides = resolveTypeOverrides;
  }

  /**
   * Instantiates a new object of the given type.
   * Throws an error if the type is not supported by any of the registered platforms.
   */
  public new(
    fqn: string,
    ctor: any,
    scope: Construct,
    id: string,
    ...args: any[]
  ): any {
    const instance = this.tryNewInstance(fqn, scope, id, ...args);
    if (instance) {
      return instance;
    }

    if (ctor) {
      return new ctor(scope, id, ...args);
    }

    throw new Error(`Unsupported resource type: ${fqn}`);
  }

  /**
   * Provides a new instance of an object if an override exists.
   *
   * @param fqn string fqn of the resource type
   * @param scope construct scope
   * @param id unique string id for resource
   * @param args args to pass to the resource
   */
  public tryNewInstance(
    fqn: string,
    scope: Construct,
    id: string,
    ...args: any[]
  ): any {
    for (const override of this.newInstanceOverrides) {
      const instance = override(fqn, scope, id, ...args);
      if (instance) {
        return instance;
      }
    }

    const ctor = this.resolveType(fqn);
    if (ctor) {
      return new ctor(scope, id, ...args);
    }

    return undefined;
  }

  /**
   * Provides the type for an fqn (fully qualified name) if an override exists.
   *
   * @param fqn string fqn of the resource type
   */
  public resolveType(fqn: string): any {
    for (const override of this.resolveTypeOverrides) {
      const type = override(fqn);
      if (type) {
        return type;
      }
    }

    return undefined;
  }

  /**
   * Registers the ClassFactory to an App, so that given any construct,
   * its ClassFactory can be retrieved.
   *
   * @param app the App to register to
   */
  public register(app: App) {
    const existing = (app as any)[CLASS_FACTORY_SYMBOL];
    if (existing && existing !== this) {
      throw new Error("ClassFactory already registered");
    }
    (app as any)[CLASS_FACTORY_SYMBOL] = this;
  }
}
