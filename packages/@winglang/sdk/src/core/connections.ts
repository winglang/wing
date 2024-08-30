import * as fs from "fs";
import * as path from "path";
import { IConstruct } from "constructs";

const CONNECTIONS_SYMBOL = Symbol.for("@winglang/sdk.core.Connections");

export const CONNECTIONS_FILE_PATH = "connections.json";

/**
 * Connections are a way to track relationships between constructs.
 */
export class Connections {
  /**
   * Return the matching Connections of the given construct tree.
   */
  public static of(construct: IConstruct): Connections {
    let connections = (construct.node.root as any)[CONNECTIONS_SYMBOL];

    if (!connections) {
      connections = new Connections();
      (construct.node.root as any)[CONNECTIONS_SYMBOL] = connections;
    }

    return connections;
  }

  private readonly _connections: Connection[] = [];
  private constructor() {}

  /**
   * Adds a connection between two constructs. A connection is a piece of
   * metadata describing how one construct is related to another construct.
   */
  public add(props: AddConnectionProps) {
    const connection = props;

    // avoid duplicate connections
    if (
      this._connections.some(
        (c) =>
          c.source === connection.source &&
          c.sourceOp === connection.sourceOp &&
          c.target === connection.target &&
          c.targetOp === connection.targetOp &&
          c.name === connection.name
      )
    ) {
      return;
    }

    this._connections.push(connection);
  }

  /**
   * Synthesize `connections.json` to the given directory.
   */
  public synth(outdir: string) {
    const connections = this._connections.map((c) => ({
      source: c.source.node.path,
      sourceOp: c.sourceOp,
      target: c.target.node.path,
      targetOp: c.targetOp,
      name: c.name,
    }));

    const tree = {
      version: "connections-0.1",
      connections,
    };

    fs.writeFileSync(
      path.join(outdir, CONNECTIONS_FILE_PATH),
      JSON.stringify(tree, undefined, 2),
      { encoding: "utf8" }
    );
  }
}

/**
 * Props for `Connections.add`.
 */
export interface AddConnectionProps {
  /**
   * The source of the connection.
   */
  readonly source: IConstruct;

  /**
   * An operation that the source object supports.
   * @default - no operation
   */
  readonly sourceOp?: string;

  /**
   * The target of the connection.
   */
  readonly target: IConstruct;

  /**
   * An operation that the target object supports.
   * @default - no operation
   */
  readonly targetOp?: string;

  /**
   * A name for the connection.
   */
  readonly name: string;
}

/**
 * A connection to another construct.
 */
export interface Connection {
  /**
   * The source of the connection.
   */
  readonly source: IConstruct;

  /**
   * An operation that the source object supports.
   * @default - no operation
   */
  readonly sourceOp?: string;

  /**
   * The target of the connection.
   */
  readonly target: IConstruct;

  /**
   * An operation that the target object supports.
   * @default - no operation
   */
  readonly targetOp?: string;

  /**
   * A name for the connection.
   */
  readonly name: string;
}
