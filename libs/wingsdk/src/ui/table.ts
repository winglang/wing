import { Construct } from "constructs";
import { VisualComponent } from "./base";
import { Function } from "../cloud";
import { fqnForType } from "../constants";
import { UIComponent, lift } from "../core";
import { INFLIGHT_SYMBOL } from "../core/types";
import { IInflight, Resource } from "../std";

/**
 * Global identifier for `Table`.
 */
export const TABLE_FQN = fqnForType("ui.Table");

/**
 * Table handlers.
 */
export interface TableHandlers {
  /**
   * Handler for inserting a row.
   */
  readonly insert: ITableputHandler;
  /**
   * Handler for getting a row.
   */
  readonly get: ITableGetHandler;
  /**
   * Handler for updatete a row.
   */
  readonly update: ITableUpdateHandler;
  /**
   * Handler for deleting a row.
   */
  readonly delete: ITableDeleteHandler;
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

  private readonly insertFn: Function;
  private readonly updateFn: Function;
  private readonly getFn: Function;
  private readonly deleteFn: Function;
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

    const getHandler = lift({ handler: handlers.get }).inflight(
      async (ctx, payload) => {
        try {
          const key = JSON.parse(payload).key;
          return await ctx.handler(key);
        } catch (e) {
          throw new Error("Invalid payload for table get handler client");
        }
      }
    );

    const putHandler = lift({ handler: handlers.insert }).inflight(
      async (ctx, payload) => {
        try {
          const item = JSON.parse(payload);
          return await ctx.handler(item);
        } catch (e) {
          throw new Error("Invalid payload for table insert handler client");
        }
      }
    );

    const updateHandler = lift({ handler: handlers.update }).inflight(
      async (ctx, payload) => {
        try {
          const { key, item } = JSON.parse(payload);
          return await ctx.handler(key, item);
        } catch (e) {
          throw new Error("Invalid payload for table update handler client");
        }
      }
    );

    const deleteHandler = lift({ handler: handlers.delete }).inflight(
      async (ctx, payload) => {
        try {
          const key = JSON.parse(payload).key;
          return await ctx.handler(key);
        } catch (e) {
          throw new Error("Invalid payload for table delete handler client");
        }
      }
    );

    const scanHandler = lift({ handler: handlers.scan }).inflight(
      async (ctx) => {
        try {
          return await ctx.handler();
        } catch (e) {
          throw new Error("Invalid payload for table scan handler client");
        }
      }
    );

    this.getFn = new Function(this, "get", getHandler);
    this.insertFn = new Function(this, "insert", putHandler);
    this.updateFn = new Function(this, "update", updateHandler);
    this.deleteFn = new Function(this, "delete", deleteHandler);
    this.scanFn = new Function(this, "scan", scanHandler);
  }

  /** @internal */
  public _toUIComponent(): UIComponent {
    return {
      kind: "table",
      label: this.label,
      putHandler: this.insertFn.node.path,
      updateHandler: this.updateFn.node.path,
      deleteHandler: this.deleteFn.node.path,
      getHandler: this.getFn.node.path,
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
 * @inflight `@winglang/sdk.ui.ITableputHandlerClient`
 */
export interface ITableputHandler extends IInflight {
  /** @internal */
  [INFLIGHT_SYMBOL]?: ITableputHandlerClient["handle"];
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
export interface ITableputHandlerClient {
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
 * Inflight client for `ITableGetHandler`.
 */
export interface ITableGetHandlerClient {
  /**
   * Function that performs an action.
   * @inflight
   */
  handle(key: string): Promise<string>;
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
  handle(): Promise<string[]>;
}
