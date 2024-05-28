import { Construct } from "constructs";
import { VisualComponent } from "./base";
import { fqnForType } from "../constants";
import { App, UIComponent } from "../core";

/**
 * Global identifier for `Graph`.
 */
export const GRAPH_FQN = fqnForType("ui.Graph");

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

  private readonly title: string;

  constructor(scope: Construct, id: string, title: string) {
    super(scope, id);
    this.title = title;
  }

  /** @internal */
  public _toUIComponent(): UIComponent {
    return {
      kind: "graph",
      title: this.title,
    };
  }

  /** @internal */
  public _toInflight(): string {
    throw new Error("Method not implemented.");
  }
}
