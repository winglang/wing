import {
  IConstruct,
  Node as ConstructsNode,
  ConstructOrder,
  IDependable,
  MetadataOptions,
  IValidation,
} from "constructs";
import { Connections } from "../core/connections";
import { ParameterRegistrar } from "../platform";

const NODE_SYMBOL = Symbol.for("@winglang/sdk.std.Node");
export const APP_SYMBOL = Symbol.for("@winglang/sdk.std.Node/app");
const ROOT_SYMBOL = Symbol.for("@winglang/sdk.std.Node/root");

export const CONNECTIONS_FILE_PATH = "connections.json";
export const SDK_SOURCE_MODULE = "@winglang/sdk";

/**
 * The internal node of a construct.
 */
export class Node {
  /**
   * Marks a type as the root of the tree.
   * @param rootConstructor
   * @internal
   */
  public static _markRoot(rootConstructor: any) {
    rootConstructor[ROOT_SYMBOL] = true;
  }

  /**
   * Return the internal construct node.
   */
  public static of(construct: IConstruct): Node {
    let node = (construct as any)[NODE_SYMBOL];

    if (!node) {
      node = new Node(construct);
      (construct as any)[NODE_SYMBOL] = node;
    }

    return node;
  }

  /**
   * Title of the construct for display purposes.
   */
  public title?: string;

  /**
   * Description of the construct for display purposes.
   */
  public description?: string;

  /**
   * The source file or library where the construct was defined.
   */
  public sourceModule?: string;

  /**
   * Whether the construct should be hidden by default in tree visualizations.
   */
  public hidden?: boolean;

  /**
   * The color of the construct for display purposes.
   * Supported colors are:
   * - orange
   * - sky
   * - emerald
   * - lime
   * - pink
   * - amber
   * - cyan
   * - purple
   * - red
   * - violet
   * - slate
   */
  public color?: string;

  /**
   * The icon of the construct for display purposes.
   * Supported icons are from Heroicons:
   * - https://heroicons.com/
   * e.g.
   * - "academic-cap"
   */
  public icon?: string;

  /**
   * Whether the node is expanded or collapsed by default in the UI.
   * By default, nodes are collapsed. Set this to `true` if you want the node to be expanded by default.
   *
   * @default false
   */
  public expanded?: boolean;

  private readonly _constructsNode: ConstructsNode;
  private readonly _connections: Connections;
  private _app: IApp | undefined;
  private _root: IConstruct | undefined;

  private constructor(private readonly construct: IConstruct) {
    this._constructsNode = construct.node;
    this._connections = Connections.of(construct); // tree-unique instance
  }

  /**
   * Adds a connection between two constructs. A connection is a piece of
   * metadata describing how one construct is related to another construct.
   */
  public addConnection(props: AddConnectionProps) {
    this._connections.add({
      source: props.source ?? this.construct,
      ...props,
    });
  }

  // ---- constructs 10.x APIs ----
  // https://github.com/aws/constructs/blob/10.x/src/construct.ts

  /**
   * Returns the scope in which this construct is defined.
   *
   * The value is `undefined` at the root of the construct scope tree.
   */
  public get scope(): IConstruct | undefined {
    return this._constructsNode.scope;
  }

  /**
   * The id of this construct within the current scope.
   *
   * This is a a scope-unique id. To obtain an app-unique id for this construct, use `addr`.
   */
  public get id(): string {
    return this._constructsNode.id;
  }

  /**
   * The full, absolute path of this construct in the tree.
   *
   * Components are separated by '/'.
   */
  public get path(): string {
    return this._constructsNode.path;
  }

  /**
   * Returns an opaque tree-unique address for this construct.
   *
   * Addresses are 42 characters hexadecimal strings. They begin with "c8"
   * followed by 40 lowercase hexadecimal characters (0-9a-f).
   *
   * Addresses are calculated using a SHA-1 of the components of the construct
   * path.
   *
   * To enable refactorings of construct trees, constructs with the ID `Default`
   * will be excluded from the calculation. In those cases constructs in the
   * same tree may have the same addreess.
   *
   * @example c83a2846e506bcc5f10682b564084bca2d275709ee
   */
  public get addr(): string {
    return this._constructsNode.addr;
  }

  /**
   * Return a direct child by id, or undefined
   *
   * @param id Identifier of direct child
   * @returns the child if found, or undefined
   */
  public tryFindChild(id: string): IConstruct | undefined {
    return this._constructsNode.tryFindChild(id);
  }

  /**
   * Return a direct child by id
   *
   * Throws an error if the child is not found.
   *
   * @param id Identifier of direct child
   * @returns Child with the given id.
   */
  public findChild(id: string): IConstruct {
    return this._constructsNode.findChild(id);
  }

  /**
   * Returns the child construct that has the id `Default` or `Resource"`.
   * This is usually the construct that provides the bulk of the underlying functionality.
   * Useful for modifications of the underlying construct that are not available at the higher levels.
   *
   * @throws if there is more than one child
   * @returns a construct or undefined if there is no default child
   */
  public get defaultChild(): IConstruct | undefined {
    return this._constructsNode.defaultChild;
  }

  /**
   * Override the defaultChild property.
   *
   * This should only be used in the cases where the correct
   * default child is not named 'Resource' or 'Default' as it
   * should be.
   *
   * If you set this to undefined, the default behavior of finding
   * the child named 'Resource' or 'Default' will be used.
   */
  public set defaultChild(value: IConstruct | undefined) {
    this._constructsNode.defaultChild = value;
  }

  /**
   * All direct children of this construct.
   */
  public get children() {
    return this._constructsNode.children;
  }

  /**
   * Return this construct and all of its children in the given order
   */
  public findAll(
    order: ConstructOrder = ConstructOrder.PREORDER
  ): IConstruct[] {
    return this._constructsNode.findAll(order);
  }

  /**
   * This can be used to set contextual values.
   * Context must be set before any children are added, since children may consult context info during construction.
   * If the key already exists, it will be overridden.
   * @param key The context key
   * @param value The context value
   */
  public setContext(key: string, value: any) {
    this._constructsNode.setContext(key, value);
  }

  /**
   * Retrieves a value from tree context if present. Otherwise, would throw an error.
   *
   * Context is usually initialized at the root, but can be overridden at any point in the tree.
   *
   * @param key The context key
   * @returns The context value or throws error if there is no context value for this key
   */
  public getContext(key: string): any {
    return this._constructsNode.getContext(key);
  }

  /**
   * Retrieves a value from tree context.
   *
   * Context is usually initialized at the root, but can be overridden at any point in the tree.
   *
   * @param key The context key
   * @returns The context value or `undefined` if there is no context value for this key.
   */
  public tryGetContext(key: string): any {
    return this._constructsNode.tryGetContext(key);
  }

  /**
   * An immutable array of metadata objects associated with this construct.
   * This can be used, for example, to implement support for deprecation notices, source mapping, etc.
   */
  public get metadata() {
    return this._constructsNode.metadata;
  }

  /**
   * Adds a metadata entry to this construct.
   * Entries are arbitrary values and will also include a stack trace to allow tracing back to
   * the code location for when the entry was added. It can be used, for example, to include source
   * mapping in CloudFormation templates to improve diagnostics.
   *
   * @param type a string denoting the type of metadata
   * @param data the value of the metadata (can be a Token). If null/undefined, metadata will not be added.
   * @param options options
   */
  public addMetadata(
    type: string,
    data: any,
    options: MetadataOptions = {}
  ): void {
    this._constructsNode.addMetadata(type, data, options);
  }

  /**
   * All parent scopes of this construct.
   *
   * @returns a list of parent scopes. The last element in the list will always
   * be the current construct and the first element will be the root of the
   * tree.
   */
  public get scopes(): IConstruct[] {
    return this._constructsNode.scopes;
  }

  /**
   * Returns the root of the construct tree (the `cloud.App` object).
   *
   * Similar to `app`.
   *
   * @returns The root of the construct tree.
   */
  public get root(): IConstruct {
    if (!this._root) {
      this._root = this.findRoot(this.construct);
    }

    return this._root;
  }

  /**
   * Returns the root of the construct tree (the `cloud.App` object).
   *
   * Similar to `root`.
   *
   * @returns The root of the construct tree.
   */
  public get app(): IApp {
    if (!this._app) {
      this._app = this.findApp(this.construct);
    }

    return this._app;
  }

  /**
   * Returns true if this construct or the scopes in which it is defined are
   * locked.
   */
  public get locked() {
    return this._constructsNode.locked;
  }

  /**
   * Add an ordering dependency on another construct.
   *
   * An `IDependable`
   */
  public addDependency(...deps: IDependable[]) {
    this._constructsNode.addDependency(...deps);
  }

  /**
   * Return all dependencies registered on this node (non-recursive).
   */
  public get dependencies(): IConstruct[] {
    return this._constructsNode.dependencies;
  }

  /**
   * Remove the child with the given name, if present.
   *
   * @returns Whether a child with the given name was deleted.
   * @experimental
   */
  public tryRemoveChild(childName: string): boolean {
    return this._constructsNode.tryRemoveChild(childName);
  }

  /**
   * Adds a validation to this construct.
   *
   * When `node.validate()` is called, the `validate()` method will be called on
   * all validations and all errors will be returned.
   *
   * @param validation The validation object
   */
  public addValidation(validation: IValidation) {
    this._constructsNode.addValidation(validation);
  }

  /**
   * Validates this construct.
   *
   * Invokes the `validate()` method on all validations added through
   * `addValidation()`.
   *
   * @returns an array of validation error messages associated with this
   * construct.
   */
  public validate(): string[] {
    return this._constructsNode.validate();
  }

  /**
   * Locks this construct from allowing more children to be added. After this
   * call, no more children can be added to this construct or to any children.
   */
  public lock() {
    this._constructsNode.lock();
  }

  /**
   * Returns the root app.
   */
  private findApp(scope: IConstruct): IApp {
    if (isApp(scope)) {
      return scope as IApp;
    }

    if (!scope.node.scope) {
      throw new Error("Cannot find root app");
    }

    return this.findApp(scope.node.scope);
  }

  private findRoot(scope: IConstruct): IConstruct {
    if (isRoot(scope)) {
      return scope;
    }

    if (!scope.node.scope) {
      throw new Error("Cannot find root construct");
    }

    return this.findRoot(scope.node.scope);
  }
}

/**
 * Props for `Node.addConnection`.
 */
export interface AddConnectionProps {
  /**
   * The source of the connection.
   * @default this
   */
  readonly source?: IConstruct;

  /**
   * An operation that the source construct supports.
   * @default - no operation
   */
  readonly sourceOp?: string;

  /**
   * The target of the connection.
   */
  readonly target: IConstruct;

  /**
   * An operation that the target construct supports.
   * @default - no operation
   */
  readonly targetOp?: string;

  /**
   * A name for the connection.
   */
  readonly name: string;
}

/**
 * Represents a Wing application.
 */
export interface IApp extends IConstruct {
  /**
   * Type marker.
   * @internal
   **/
  readonly [APP_SYMBOL]: true;

  /**
   * The `.wing` directory into which you can emit artifacts during preflight.
   */
  readonly workdir: string;

  /**
   * `true` if this is a testing environment
   */
  readonly isTestEnvironment: boolean;

  /**
   * The directory of the entrypoint of the current program.
   */
  readonly entrypointDir: string;

  /**
   * The application's parameter registrar
   */
  readonly parameters: ParameterRegistrar;

  /**
   * Generate a unique ID for the given scope and prefix. The newly generated ID is
   * guaranteed to be unique within the given scope.
   * It will have the form '{prefix}{n}', where '{prefix}' is the given prefix and '{n}' is an
   * ascending sequence of integers starting from '0'.
   *
   * @param scope to guarantee uniqueness in
   * @param prefix prepended to the unique identifier
   */
  makeId(scope: IConstruct, prefix?: string): string;
}

function isApp(x: any): x is IApp {
  return x && x[APP_SYMBOL];
}

function isRoot(x: any): boolean {
  return x && x.constructor && x.constructor[ROOT_SYMBOL];
}
