import * as fs from "fs";
import * as path from "path";
import { IConstruct } from "constructs";
import { App } from "./app";
import { Inflight } from "./inflight";
import { IResource, Resource } from "../std/resource";

const TREE_FILE_PATH = "tree.json";

/**
 * A node in the construct tree.
 */
export interface ConstructTreeNode {
  /**
   * The ID of the node. Is part of the `path`.
   */
  readonly id: string;

  /**
   * The path of the node.
   */
  readonly path: string;

  /**
   * The child nodes.
   */
  readonly children?: { [key: string]: ConstructTreeNode };

  /**
   * The node attributes.
   */
  readonly attributes?: { [key: string]: any };

  /**
   * Information on the construct class that led to this node, if available.
   */
  readonly constructInfo?: ConstructInfo;

  /**
   * Information on how to display this node in the UI.
   */
  readonly display?: DisplayInfo;
}

/**
 * Information on how to display a construct in the UI.
 */
export interface DisplayInfo {
  /**
   * Title of the resource.
   * @default - The type and/or identifier of the resource
   */
  readonly title?: string;

  /**
   * Description of the resource.
   * @default - No description
   */
  readonly description?: string;

  /**
   * Whether the resource should be hidden from the UI.
   * @default false (visible)
   */
  readonly hidden?: boolean;
}

/**
 * The construct tree.
 */
export interface ConstructTree {
  /**
   * The construct tree version.
   */
  readonly version: string;

  /**
   * The root node.
   */
  readonly tree: ConstructTreeNode;
}

/**
 * Symbol for accessing jsii runtime information.
 */
const JSII_RUNTIME_SYMBOL = Symbol.for("jsii.rtti");

/**
 * Source information on a construct (class fqn and version).
 */
export interface ConstructInfo {
  /**
   * Fully qualified class name.
   */
  readonly fqn: string;

  /**
   * Version of the module.
   */
  readonly version: string;
}

function constructInfoFromConstruct(
  construct: IConstruct
): ConstructInfo | undefined {
  const jsiiRuntimeInfo =
    Object.getPrototypeOf(construct).constructor[JSII_RUNTIME_SYMBOL];
  if (
    typeof jsiiRuntimeInfo === "object" &&
    jsiiRuntimeInfo !== null &&
    typeof jsiiRuntimeInfo.fqn === "string" &&
    typeof jsiiRuntimeInfo.version === "string"
  ) {
    return { fqn: jsiiRuntimeInfo.fqn, version: jsiiRuntimeInfo.version };
  }
  return undefined;
}

export function synthesizeTree(app: App, outdir: string) {
  const visit = (construct: IConstruct): ConstructTreeNode => {
    const children = construct.node.children.map((c) => visit(c));
    const childrenMap = children
      .filter((child) => child !== undefined)
      .reduce((map, child) => Object.assign(map, { [child!.id]: child }), {});

    const node: ConstructTreeNode = {
      id: construct.node.id || "App",
      path: construct.node.path,
      children: Object.keys(childrenMap).length === 0 ? undefined : childrenMap,
      attributes: synthAttributes(construct),
      constructInfo: constructInfoFromConstruct(construct),
      display: synthDisplay(construct),
    };

    return node;
  };

  const tree: ConstructTree = {
    version: "tree-0.1",
    tree: visit(app.node.root),
  };

  fs.writeFileSync(
    path.join(outdir, TREE_FILE_PATH),
    JSON.stringify(tree, undefined, 2),
    { encoding: "utf8" }
  );
}

function synthAttributes(
  construct: IConstruct
): { [key: string]: any } | undefined {
  // check if a construct implements IInspectable
  function canInspect(inspectable: any): inspectable is IInspectable {
    return inspectable._inspect !== undefined;
  }

  const inspector = new TreeInspector();

  // get attributes from the inspector
  if (canInspect(construct)) {
    construct._inspect(inspector);
    return inspector.attributes;
  }
  return undefined;
}

function isIResource(construct: IConstruct): construct is IResource {
  return construct instanceof Resource || construct instanceof Inflight;
}

function synthDisplay(construct: IConstruct): DisplayInfo | undefined {
  if (!isIResource(construct)) {
    return;
  }
  const { display } = construct;
  if (display.description || display.title || display.hidden) {
    return display;
  }
  return;
}

/**
 * Inspector that maintains an attribute bag
 */
export class TreeInspector {
  /**
   * Represents the bag of attributes as key-value pairs.
   */
  public readonly attributes: { [key: string]: any } = {};

  /**
   * Adds attribute to bag.
   *
   * @param key - key for metadata
   * @param value - value of metadata.
   */
  public addAttribute(key: string, value: any) {
    this.attributes[key] = value;
  }
}

/**
 * Interface for examining a construct and exposing metadata.
 */
export interface IInspectable {
  /**
   * Examines construct
   *
   * @param inspector - tree inspector to collect and process attributes
   *
   * @internal
   */
  _inspect(inspector: TreeInspector): void;
}
