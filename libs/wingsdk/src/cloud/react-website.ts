import { isAbsolute, join, resolve } from "path";
import { Construct } from "constructs";
import { BaseWebsiteProps, Website } from "./website";
import { fqnForType } from "../constants";
import { App } from "../core";
import { Resource } from "../std";

const DEFAULT_BUILD_FOLDER = "/build";
const DEFAULT_START_COMMAND = "npm run start";
const DEFAULT_BUILD_COMMAND = "npm run build";
const DEFAULT_PORT = 3001;

/**
 * Global identifier for `ReactWebsite`.
 */
export const REACT_WEBSITE_FQN = fqnForType("cloud.ReactWebsite");

/**
 * Options for `ReactWebsite`.
 */
export interface ReactWebsiteProps {
  readonly projectPath: string;
  readonly buildFolder?: string;
  readonly startCommand?: string;
  readonly buildCommand?: string;
  readonly isDevRun?: boolean;
  readonly hostProps?: BaseWebsiteProps;
  readonly localPort?: string | number;
}

/**
 * A cloud dynamic website.
 *
 * @inflight `@winglang/sdk.cloud.IReactWebsiteClient`
 */
export abstract class ReactWebsite extends Resource {
  /**
   * Create a new website.
   * @internal
   */
  public static _newReactWebsite(
    scope: Construct,
    id: string,
    props: ReactWebsiteProps
  ): ReactWebsite {
    return App.of(scope).newAbstract(REACT_WEBSITE_FQN, scope, id, props);
  }

  /**
   * @internal
   */
  protected readonly _buildPath: string;
  /**
   * @internal
   */
  protected readonly _localPort: string | number;
  /**
   * @internal
   */
  protected readonly _startCommand: string;
  /**
   * @internal
   */
  protected readonly _projectPath: string;
  /**
   * @internal
   */
  protected readonly _isDevRun: boolean;
  /**
   * @internal
   */
  protected _websiteHost?: Website;

  /**
   * @internal
   */
  protected readonly _hostProps?: BaseWebsiteProps;
  /**
   * @internal
   */
  protected readonly _environments: Map<string, string> = new Map();

  constructor(scope: Construct, id: string, props: ReactWebsiteProps) {
    const buildFolder = props.buildFolder ?? DEFAULT_BUILD_FOLDER;
    const startCommand = props.startCommand ?? DEFAULT_START_COMMAND;
    const buildCommand = props.buildCommand ?? DEFAULT_BUILD_COMMAND;

    super(scope, id);

    this.display.title = "Dynamic Website";
    this.display.description = "A dynamic website";

    this._projectPath = this._parsePath(scope, props.projectPath);
    this._hostProps = props.hostProps;
    this._buildPath = join(this._projectPath, buildFolder);
    this._isDevRun = props.isDevRun ?? false;
    this._localPort = props.localPort ?? DEFAULT_PORT;

    this._startCommand = this._isDevRun
      ? `PORT=${this._localPort} ${startCommand}`
      : buildCommand;
  }

  public get url(): string {
    return this._websiteHost?.url ?? `http://localhost:${this._localPort}`;
  }

  private _parsePath(scope: Construct, path: string) {
    if (isAbsolute(path)) {
      return path;
    } else if (!App.of(scope).entrypointDir) {
      throw new Error("Missing environment variable: WING_SOURCE_DIR");
    }
    return resolve(App.of(scope).entrypointDir, path);
  }

  public addEnvironment(key: string, value: string) {
    this._environments.set(key, value);
  }
}

/**
 * Inflight methods and members of `cloudReact.Website`.
 */
export interface IReactWebsiteClient {}
