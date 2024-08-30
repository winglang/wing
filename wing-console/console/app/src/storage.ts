/**
 * This is a duplication of only the relevant code from apps/wing/src/analytics/storage.ts
 * Waiting for a shared package to be created
 * See https://github.com/winglang/wing/issues/3336
 */

import { randomBytes } from "node:crypto";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import * as os from "node:os";
import path from "node:path";

const WING_HOME_DIR = path.join(os.homedir(), ".wing");

/**
 * AnalyticsConfig is the configuration for the analytics collection
 */
export interface AnalyticsConfig {
  /** user's anonymous id */
  anonymousId: string;
  /** boolean flag to determine if user has already been given a disclaimer message */
  disclaimerDisplayed?: boolean;
  /** optional opt out value */
  optOut?: boolean;
  /** whether sign in is required */
  requireSignIn?: boolean;
  /** whether the user has accepted the exposing endpoints risk warning */
  endpointWarningAccepted?: boolean;
}

/**
 * Props for AnalyticsStorage, mostly used for testing and debugging
 */
interface AnalyticsStorageProps {
  /**
   * directory to store
   * @default path.join(os.tmpdir(), "wing-analytics")
   */
  analyticsStorageDir?: string;
  /**
   * path to analytics config file
   * @default path.join(path.join(WING_HOME_DIR, 'wing-analytics-config.json'))
   */
  configFile?: string;
  /**
   * debug flag for verbose logging when storing and retrieving analytics events
   * @default false
   */
  debug?: boolean;
}

/**
 * Storage class used to encapsulate the storage and retrieval of analytics events
 * and configuration. Errors are ignored for the most part unless in debug mode.
 */
export class AnalyticsStorage {
  analyticsStorageDir: string;
  analyticsConfigFile: string;
  analyticsConfig: AnalyticsConfig;
  debug?: boolean;

  constructor(props?: AnalyticsStorageProps) {
    this.analyticsConfigFile =
      props?.configFile ??
      path.join(path.join(WING_HOME_DIR, "wing-analytics-config.json"));
    this.analyticsStorageDir =
      props?.analyticsStorageDir ?? path.join(os.tmpdir(), "wing-analytics");
    this.debug = props?.debug;
    this.analyticsConfig = this.loadConfig();
  }

  /**
   * Reads the analytics config for the user's anonymous id,
   * if an id does not exist, one is generated and saved to disk
   *
   * @returns the anonymous id for the user
   */
  public getAnonymousId(): string {
    let config = this.loadConfig();
    if (!config.anonymousId) {
      config.anonymousId = this.generateAnonymousId();
      this.saveConfig(config);
    }
    return config.anonymousId;
  }

  public getRequireSignIn(): boolean {
    let config = this.loadConfig();
    if (config.requireSignIn == undefined) {
      config.requireSignIn = true;
      this.saveConfig(config);
    }
    return config.requireSignIn;
  }

  public notifySignedIn() {
    let config = this.loadConfig();
    config.requireSignIn = false;
    this.saveConfig(config);
  }

  public getEndpointWarningAccepted(): boolean {
    let config = this.loadConfig();
    if (config.endpointWarningAccepted == undefined) {
      config.endpointWarningAccepted = false;
      this.saveConfig(config);
    }
    return config.endpointWarningAccepted;
  }

  public notifyEndpointWarningAccepted() {
    let config = this.loadConfig();
    config.endpointWarningAccepted = true;
    this.saveConfig(config);
  }

  private generateAnonymousId(): string {
    return randomBytes(16).toString("hex");
  }

  /**
   * Retrieves the analytics config from disk, if one does not exist
   * a new one is created and saved to disk
   *
   * @returns the analytics config for the user
   */
  public loadConfig(): AnalyticsConfig {
    try {
      const fileContents = readFileSync(this.analyticsConfigFile, "utf8");
      return JSON.parse(fileContents) as AnalyticsConfig;
    } catch (error: any) {
      if (this.debug) {
        console.log(`Error loading analytics config: ${error}`);
      }

      const analyticsConfig: AnalyticsConfig = {
        anonymousId: this.generateAnonymousId(),
        optOut: false,
      };

      this.saveConfig(analyticsConfig);

      return analyticsConfig;
    }
  }

  /**
   * Saves the analytics config to disk
   *
   * @param config the analytics config to save to disk
   */
  public saveConfig(config: AnalyticsConfig) {
    try {
      if (!existsSync(WING_HOME_DIR)) {
        mkdirSync(WING_HOME_DIR);
      }
      writeFileSync(this.analyticsConfigFile, JSON.stringify(config));
    } catch (error) {
      if (this.debug) {
        console.log(`Error saving config file ${error}`);
      }
    }
  }
}
