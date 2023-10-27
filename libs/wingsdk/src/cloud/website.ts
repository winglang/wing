import { isAbsolute, resolve } from "path";
import { Construct } from "constructs";
import { cloud } from "..";
import { fqnForType } from "../constants";
import { App } from "../core";
import { Json, Node, Resource } from "../std";

/**
 * Global identifier for `Website`.
 */
export const WEBSITE_FQN = fqnForType("cloud.Website");

/**
 * Options for `Website`.
 */
export interface WebsiteProps extends WebsiteOptions {
  /**
   * Local path to the website's static files, relative to the Wing source file or absolute.
   * @example "./dist"
   */
  readonly path: string;
}

/**
 * Options for `Website`, and `ReactApp`
 */
export interface WebsiteOptions {
  /**
   * The website's custom domain object.
   * @default - undefined
   */
  readonly domain?: cloud.Domain;
}

/**
 * A cloud static website.
 *
 * @inflight `@winglang/sdk.cloud.IWebsiteClient`
 */
export abstract class Website extends Resource implements IWebsite {
  /**
   * Create a new website.
   * @internal
   */
  public static _newWebsite(
    scope: Construct,
    id: string,
    props: WebsiteProps
  ): Website {
    return App.of(scope).newAbstract(WEBSITE_FQN, scope, id, props);
  }
  /** @internal */
  private readonly _path: string;

  /** @internal */
  protected _domain?: cloud.Domain;

  constructor(scope: Construct, id: string, props: WebsiteProps) {
    super(scope, id);

    Node.of(this).title = "Website";
    Node.of(this).description = "A static website";

    this._path = isAbsolute(props.path)
      ? props.path
      : resolve(App.of(scope).entrypointDir, props.path);

    this._domain = props.domain;
  }

  /** @internal */
  public _supportedOps(): string[] {
    return [];
  }

  /**
   * Absolute local path to the website's static files.
   */
  public get path(): string {
    return this._path;
  }

  /**
   * The website's url.
   */
  public abstract get url(): string;

  /**
   * Add a JSON file with custom values during the website's deployment.
   * If the path conflicts with file path from the website's static assets, an error will be thrown.
   * @param path the file path it will be uploaded as
   * @param data the data to write to the file
   */
  public addJson(path: string, data: Json): string {
    if (!path.endsWith(".json")) {
      throw new Error(
        `key must have a .json suffix. (current: "${path.split(".").pop()}")`
      );
    }
    return this.addFile(path, JSON.stringify(data), {
      contentType: "application/json",
    });
  }

  /**
   * Add a file to the website during deployment.
   * If the path conflicts with file path from the website's static assets, an error will be thrown.
   * @param path the file path it will be uploaded as
   * @param data the data to write to the file
   * @param options configure the file's options
   */
  public abstract addFile(
    path: string,
    data: string,
    options?: AddFileOptions
  ): string;
}

/**
 * Inflight methods and members of `cloud.Website`.
 */
export interface IWebsiteClient {}

/**
 * Options for adding a file with custom value during the website's deployment.
 */
export interface AddFileOptions {
  /**
   * File's content type
   */
  readonly contentType?: string;
}

/**
 * Base interface for a website
 */
export interface IWebsite {
  /**
   * The website URL
   */
  readonly url: string;
}
