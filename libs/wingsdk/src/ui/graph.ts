import { Construct } from "constructs";
import { VisualComponent } from "./base";
import { MetricRecord, Function } from "../cloud";
import { fqnForType } from "../constants";
import { App, UIComponent } from "../core";
import { Duration, IInflight } from "../std";

/**
 * Global identifier for `Graph`.
 */
export const GRAPH_FQN = fqnForType("ui.Graph");

/**
 * Props for `Graph`.
 */
export interface GraphProps {
  /**
   * How often the graph should be refreshed.
   * @default - every 5 seconds
   */
  readonly refreshRate?: Duration;
}

/**
 * A graph can be used to display data.
 * @noinflight
 */
export class Graph extends VisualComponent {
  /**
   * Creates a new ui.Graph instance through the app.
   * @internal
   */
  public static _newGraph(scope: Construct, id: string, title: string): Graph {
    return App.of(scope).newAbstract(GRAPH_FQN, scope, id, title);
  }

  private readonly fn: Function;
  private readonly title: string;
  private readonly refreshRate: Duration;

  constructor(
    scope: Construct,
    id: string,
    title: string,
    handler: IGraphHandler,
    props: GraphProps = {}
  ) {
    super(scope, id);
    this.title = title;
    this.fn = new Function(this, "Handler", handler);
    this.refreshRate = props.refreshRate ?? Duration.fromSeconds(5);
  }

  /** @internal */
  public _toUIComponent(): UIComponent {
    return {
      kind: "graph",
      title: this.title,
      handler: this.fn.node.path,
      refreshRate: this.refreshRate.seconds,
    };
  }

  /** @internal */
  public _toInflight(): string {
    throw new Error("Method not implemented.");
  }
}

/**
 * A resource with an inflight "handle" method that can be passed to
 * Graph.
 *
 * @inflight `@winglang/sdk.ui.IGraphHandlerClient`
 */
export interface IGraphHandler extends IInflight {}

/**
 * Inflight client for `IGraphHandler`.
 */
export interface IGraphHandlerClient {
  /**
   * Function that returns data to display.
   * @inflight
   */
  handle(): Promise<MetricRecord>; // TODO: change to something else
}
