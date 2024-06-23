import { Construct } from "constructs";
import { VisualComponent } from "./base";
import { Function } from "../cloud";
import { fqnForType } from "../constants";
import { App, UIComponent, lift } from "../core";
import { INFLIGHT_SYMBOL } from "../core/types";
import { IInflight } from "../std";

/**
 * Global identifier for `FileBrowser`.
 */
export const FILE_BROWSER_FQN = fqnForType("ui.FileBrowser");

/**
 * File browser handlers.
 */
export interface FileBrowserHandlers {
  /**
   * Handler for putting a file.
   */
  readonly put: IFileBrowserPutHandler;
  /**
   * Handler for deleting a file.
   */
  readonly delete: IFileBrowserDeleteHandler;
  /**
   * Handler for getting a file.
   */
  readonly get: IFileBrowserGetHandler;
  /**
   * Handler for listing files.
   */
  readonly list: IFileBrowserListHandler;
}

/**
 * A file browser can be used to browse files.
 * @noinflight
 */
export class FileBrowser extends VisualComponent {
  /**
   * Creates a new ui.FileBrowser instance through the app.
   * @internal
   */
  public static _newFileBrowser(
    scope: Construct,
    id: string,
    label: string,
    handlers: FileBrowserHandlers
  ): FileBrowser {
    return App.of(scope).platform.newAbstract(
      FILE_BROWSER_FQN,
      scope,
      id,
      label,
      handlers
    );
  }

  private readonly getFn: Function;
  private readonly putFn: Function;
  private readonly deleteFn: Function;
  private readonly listFn: Function;
  private readonly label: string;

  constructor(
    scope: Construct,
    id: string,
    label: string,
    handlers: FileBrowserHandlers
  ) {
    super(scope, id);
    this.label = label;

    const getHandler = lift({ handler: handlers.get }).inflight(
      async (ctx, payload) => {
        try {
          const fileName = JSON.parse(payload).fileName;
          return await ctx.handler(fileName);
        } catch (e) {
          throw new Error(
            "Invalid payload for file browser get handler client"
          );
        }
      }
    );

    const putHandler = lift({ handler: handlers.put }).inflight(
      async (ctx, payload) => {
        try {
          const { fileName, fileContent } = JSON.parse(payload);
          return await ctx.handler(fileName, fileContent);
        } catch (e) {
          throw new Error(
            "Invalid payload for file browser put handler client"
          );
        }
      }
    );

    const deleteHandler = lift({ handler: handlers.delete }).inflight(
      async (ctx, payload) => {
        try {
          const fileName = JSON.parse(payload).fileName;
          return await ctx.handler(fileName);
        } catch (e) {
          throw new Error(
            "Invalid payload for file browser delete handler client"
          );
        }
      }
    );

    const listHandler = lift({ handler: handlers.list }).inflight(
      async (ctx) => {
        try {
          return await ctx.handler();
        } catch (e) {
          throw new Error(
            "Invalid payload for file browser list handler client"
          );
        }
      }
    );

    this.getFn = new Function(this, "get", getHandler);
    this.putFn = new Function(this, "put", putHandler);
    this.deleteFn = new Function(this, "delete", deleteHandler);
    this.listFn = new Function(this, "list", listHandler);
  }

  /** @internal */
  public _toUIComponent(): UIComponent {
    return {
      kind: "file-browser",
      label: this.label,
      putHandler: this.putFn.node.path,
      deleteHandler: this.deleteFn.node.path,
      getHandler: this.getFn.node.path,
      listHandler: this.listFn.node.path,
    };
  }

  /** @internal */
  public _toInflight(): string {
    throw new Error("Method not implemented.");
  }
}

/**
 * A resource with an inflight "handle" method that can be passed to
 * `IFileBrowser`.
 *
 * @inflight `@winglang/sdk.ui.IFileBrowserPutHandlerClient`
 */
export interface IFileBrowserPutHandler extends IInflight {
  /** @internal */
  [INFLIGHT_SYMBOL]?: IFileBrowserPutHandlerClient["handle"];
}

/**
 * A resource with an inflight "handle" method that can be passed to
 * `IFileBrowser`.
 *
 * @inflight `@winglang/sdk.ui.IFileBrowserGetHandlerClient`
 */
export interface IFileBrowserGetHandler extends IInflight {
  /** @internal */
  [INFLIGHT_SYMBOL]?: IFileBrowserGetHandlerClient["handle"];
}

/**
 * A resource with an inflight "handle" method that can be passed to
 * `IFileBrowser`.
 *
 * @inflight `@winglang/sdk.ui.IFileBrowserListHandlerClient`
 */
export interface IFileBrowserListHandler extends IInflight {
  /** @internal */
  [INFLIGHT_SYMBOL]?: IFileBrowserListHandlerClient["handle"];
}

/**
 * A resource with an inflight "handle" method that can be passed to
 * `IFileBrowser`.
 *
 * @inflight `@winglang/sdk.ui.IFileBrowserDeleteHandlerClient`
 */
export interface IFileBrowserDeleteHandler extends IInflight {
  /** @internal */
  [INFLIGHT_SYMBOL]?: IFileBrowserDeleteHandlerClient["handle"];
}

/**
 * Inflight client for `IFileBrowserVoidHandler`.
 */
export interface IFileBrowserPutHandlerClient {
  /**
   * Function that performs an action.
   * @inflight
   */
  handle(fileName: string, fileContent: string): Promise<void>;
}

/**
 * Inflight client for `IFileBrowserGetHandler`.
 */
export interface IFileBrowserGetHandlerClient {
  /**
   * Function that performs an action.
   * @inflight
   */
  handle(fileName: string): Promise<string>;
}

/**
 * Inflight client for `IFileBrowserDeleteHandler`.
 */
export interface IFileBrowserDeleteHandlerClient {
  /**
   * Function that performs an action.
   * @inflight
   */
  handle(fileName: string): Promise<void>;
}

/**
 * Inflight client for `IFileBrowserListHandler`.
 */
export interface IFileBrowserListHandlerClient {
  /**
   * Function that performs an action.
   * @inflight
   */
  handle(): Promise<string[]>;
}
