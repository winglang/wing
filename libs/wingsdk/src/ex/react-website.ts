import { isAbsolute, join, resolve } from "path";
import { Construct } from "constructs";
import { BaseWebsiteProps, Website } from "../cloud/website";
import { fqnForType } from "../constants";
import { App } from "../core";
import { Resource, Node } from "../std";

const DEFAULT_BUILD_FOLDER = "/build";
const DEFAULT_START_COMMAND = "npm run start";
const DEFAULT_BUILD_COMMAND = "npm run build";
const DEFAULT_PORT = 3001;

/**
 * Global identifier for `ReactWebsite`.
 */
export const REACT_WEBSITE_FQN = fqnForType("ex.ReactWebsite");

/**
 * Options for `ReactWebsite`.
 */
export interface ReactWebsiteProps {
  /**
   * The path to the React app root folder- can be absolute or relative to the wing folder
   */
  readonly projectPath: string;
  /**
   * The path to the React app build folder- relative to the `projectPath`
   * @default "/build"
   */
  readonly buildFolder?: string;
  /**
   * a command for starting React app locally
   * @default "npm run start"
   */
  readonly startCommand?: string;
  /**
   * a command for building the React app
   * @default "npm run build"
   */
  readonly buildCommand?: string;
  /**
   * in sim, if `true` - will use the start command, and if `false` - the build command
   */
  readonly isDevRun?: boolean;
  /**
   * additional properties to run the website host with
   */
  readonly hostProps?: BaseWebsiteProps;
  /**
   * a port to start a local build of the React app on.
   */
  readonly localPort?: string | number;
}

/**
 * A cloud deployable React website.
 *
 * @inflight `@winglang/sdk.ex.IReactWebsiteClient`
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

    Node.of(this).title = "React Website";
    Node.of(this).description = "A deployable React website";

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
    return isAbsolute(path) ? path : resolve(App.of(scope).entrypointDir, path);
  }

  public addEnvironment(key: string, value: string) {
    this._environments.set(key, value);
  }
}

/**
 * Inflight methods and members of `ex.ReactWebsite`.
 */
export interface IReactWebsiteClient {}
