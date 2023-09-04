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
export interface WebsiteProps {
  /**
   * Local path to the website's static files, relative to the Wing source file or absolute.
   * @example "./dist"
   */
  readonly path: string;

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
export abstract class Website extends Resource {
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

    if (isAbsolute(props.path)) {
      this._path = props.path;
    } else {
      if (!App.of(scope).entrypointDir) {
        throw new Error("Missing environment variable: WING_SOURCE_DIR");
      }
      this._path = resolve(App.of(scope).entrypointDir, props.path);
    }

    this._domain = props.domain;
  }

  /** @internal */
  public _getInflightOps(): string[] {
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
  public abstract addJson(path: string, data: Json): string;
}

/**
 * Inflight methods and members of `cloud.Website`.
 */
export interface IWebsiteClient {}
