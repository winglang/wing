import { Construct } from "constructs";
import { VisualComponent } from "./base";
import { Function } from "../cloud";
import { fqnForType } from "../constants";
import { UIComponent, lift } from "../core";
import { INFLIGHT_SYMBOL } from "../core/types";
import { IInflight, Json, Resource } from "../std";

/**
 * Global identifier for `Table`.
 */
export const TABLE_FQN = fqnForType("ui.Table");

/**
 * Table handlers.
 */
export interface TableHandlers {
  /**
   * Handler for scanning rows.
   */
  readonly scan: ITableScanHandler;
}

/**
 * A table can be used to browse files.
 * @noinflight
 */
export class Table extends VisualComponent {
  /**
   * Creates a new ui.Table instance through the app.
   * @internal
   */
  public static _newTable(
    scope: Construct,
    id: string,
    handlers: TableHandlers
  ): Table {
    return Resource._newFromFactory(TABLE_FQN, scope, id, handlers);
  }

  private readonly scanFn: Function;

  constructor(scope: Construct, id: string, handlers: TableHandlers) {
    super(scope, id);

    const scanHandler = lift({ handler: handlers.scan }).inflight(
      async (ctx) => {
        try {
          return await ctx.handler();
        } catch (e) {
          throw new Error("Invalid payload for table scan handler client");
        }
      }
    );

    this.scanFn = new Function(this, "scan", scanHandler);
  }

  /** @internal */
  public _toUIComponent(): UIComponent {
    return {
      kind: "table",
      scanHandler: this.scanFn.node.path,
    };
  }

  /** @internal */
  public _toInflight(): string {
    throw new Error("Method not implemented.");
  }
}

/**
 * A resource with an inflight "handle" method that can be passed to
 * `ITable`.
 *
 * @inflight `@winglang/sdk.ui.ITableScanHandlerClient`
 */
export interface ITableScanHandler extends IInflight {
  /** @internal */
  [INFLIGHT_SYMBOL]?: ITableScanHandlerClient["handle"];
}

/**
 * Inflight client for `ITableScanHandler`.
 */
export interface ITableScanHandlerClient {
  /**
   * Function that performs an action.
   * @inflight
   */
  handle(): Promise<Json[]>;
}
