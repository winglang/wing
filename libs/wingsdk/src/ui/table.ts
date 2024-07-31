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
    label: string,
    handlers: TableHandlers
  ): Table {
    return Resource._newFromFactory(TABLE_FQN, scope, id, label, handlers);
  }

  private readonly scanFn: Function;
  private readonly label: string;

  constructor(
    scope: Construct,
    id: string,
    label: string,
    handlers: TableHandlers
  ) {
    super(scope, id);
    this.label = label;

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
      label: this.label,
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
 * @inflight `@winglang/sdk.ui.ITablePutHandlerClient`
 */
export interface ITableputHandler extends IInflight {
  /** @internal */
  [INFLIGHT_SYMBOL]?: ITablePutHandlerClient["handle"];
}

/**
 * A resource with an inflight "handle" method that can be passed to
 * `ITable`.
 *
 * @inflight `@winglang/sdk.ui.ITableUpdateHandlerClient`
 */
export interface ITableUpdateHandler extends IInflight {
  /** @internal */
  [INFLIGHT_SYMBOL]?: ITableUpdateHandlerClient["handle"];
}

/**
 * A resource with an inflight "handle" method that can be passed to
 * `ITable`.
 *
 * @inflight `@winglang/sdk.ui.ITableGetHandlerClient`
 */
export interface ITableGetHandler extends IInflight {
  /** @internal */
  [INFLIGHT_SYMBOL]?: ITableGetHandlerClient["handle"];
}

/**
 * A resource with an inflight "handle" method that can be passed to
 * `ITable`.
 *
 * @inflight `@winglang/sdk.ui.ITablePrimaryKeyHandlerClient`
 */
export interface ITablePrimaryKeyHandler extends IInflight {
  /** @internal */
  [INFLIGHT_SYMBOL]?: ITablePrimaryKeyHandlerClient["handle"];
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
 * A resource with an inflight "handle" method that can be passed to
 * `ITable`.
 *
 * @inflight `@winglang/sdk.ui.ITableDeleteHandlerClient`
 */
export interface ITableDeleteHandler extends IInflight {
  /** @internal */
  [INFLIGHT_SYMBOL]?: ITableDeleteHandlerClient["handle"];
}

/**
 * Inflight client for `ITableVoidHandler`.
 */
export interface ITablePutHandlerClient {
  /**
   * Function that performs an action.
   * @inflight
   */
  handle(item: string): Promise<void>;
}

/**
 * Inflight client for `ITableVoidHandler`.
 */
export interface ITableUpdateHandlerClient {
  /**
   * Function that performs an action.
   * @inflight
   */
  handle(key: string, item: string): Promise<void>;
}

/**
 * Inflight client for `ITablePrimaryKeyHandler`.
 */
export interface ITablePrimaryKeyHandlerClient {
  /**
   * Function that performs an action.
   * @inflight
   */
  handle(): Promise<string>;
}

/**
 * Inflight client for `ITableGetHandler`.
 */
export interface ITableGetHandlerClient {
  /**
   * Function that performs an action.
   * @inflight
   */
  handle(key: string): Promise<Json>;
}

/**
 * Inflight client for `ITableDeleteHandler`.
 */
export interface ITableDeleteHandlerClient {
  /**
   * Function that performs an action.
   * @inflight
   */
  handle(key: string): Promise<void>;
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
