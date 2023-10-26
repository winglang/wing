import { existsSync } from "fs";
import { isAbsolute, join, resolve } from "path";
import { Construct } from "constructs";
import { WebsiteOptions, IWebsite } from "../cloud/website";
import { fqnForType } from "../constants";
import { App } from "../core";
import { Resource, Node } from "../std";

const DEFAULT_BUILD_FOLDER = "/build";
export const DEFAULT_REACT_APP_BUILD_COMMAND = "npm run build";
const DEFAULT_PORT = 3001;
/**
 * The file that contains the wing environment variables. Will be written into the project files.
 */
export const WING_JS = "wing.js";

/**
 * Global identifier for `ReactApp`.
 */
export const REACT_APP_FQN = fqnForType("ex.ReactApp");

/**
 * Options for `ReactApp`.
 */
export interface ReactAppProps extends WebsiteOptions {
  /**
   * The path to the React app root folder- can be absolute or relative to the wing folder
   */
  readonly projectPath: string;
  /**
   * The path to the React app build folder- relative to the `projectPath`
   * @default "/build"
   */
  readonly buildDir?: string;
  /**
   * A command for starting React app locally
   * @default "npm run start"
   */
  readonly startCommand?: string;
  /**
   * A command for building the React app
   * @default "npm run build"
   */
  readonly buildCommand?: string;
  /**
   * In sim, if `true` - will use the start command, and if `false` - the build command
   * @default false
   */
  readonly useBuildCommand?: boolean;
  /**
   * A port to start a local build of the React app on.
   * @default 3001
   */
  readonly localPort?: number;
}

/**
 * A cloud deployable React App.
 *
 * @inflight `@winglang/sdk.ex.IReactAppClient`
 */
export abstract class ReactApp extends Resource {
  /**
   * Create a new React App.
   * @internal
   */
  public static _newReactApp(
    scope: Construct,
    id: string,
    props: ReactAppProps
  ): ReactApp {
    return App.of(scope).newAbstract(REACT_APP_FQN, scope, id, props);
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
  protected readonly _projectPath: string;
  /**
   * @internal
   */
  protected readonly _useBuildCommand: boolean;
  /**
   * @internal
   */
  protected abstract _websiteHost: IWebsite;

  /**
   * @internal
   */
  protected readonly _hostProps?: WebsiteOptions;
  /**
   * @internal
   */
  protected readonly _environmentVariables: Map<string, string> = new Map();

  constructor(scope: Construct, id: string, props: ReactAppProps) {
    const buildDir = props.buildDir ?? DEFAULT_BUILD_FOLDER;

    super(scope, id);

    Node.of(this).title = "React App";
    Node.of(this).description = "A deployable React App";

    this._projectPath = this._parsePath(scope, props.projectPath);
    this._hostProps = { domain: props.domain };
    this._buildPath = join(this._projectPath, buildDir);
    this._useBuildCommand = props.useBuildCommand ?? false;
    this._localPort = props.localPort ?? DEFAULT_PORT;

    if (!existsSync(this._projectPath)) {
      throw new Error(`non existent directory '${this._projectPath}'`);
    }
  }

  /**
   * Website's url
   */
  public get url(): string {
    return this._websiteHost.url;
  }

  /**
   * @internal
   */
  private _parsePath(scope: Construct, path: string) {
    return isAbsolute(path) ? path : resolve(App.of(scope).entrypointDir, path);
  }

  /**
   * Adding a key-value pair that can be accessible later via the `window.wingEnv` object in the react code
   * @param key the key to add
   * @param value the value to add
   */
  public addEnvironment(key: string, value: string) {
    this._environmentVariables.set(key, value);
  }

  /** @internal */
  public _supportedOps(): string[] {
    return [];
  }
}

/**
 * Inflight methods and members of `ex.ReactApp`.
 */
export interface IReactAppClient {}
