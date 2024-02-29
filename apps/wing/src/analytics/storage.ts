import { randomBytes } from "crypto";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import * as os from "os";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { AnalyticEvent } from "./event";

const WING_HOME_DIR = path.join(os.homedir(), ".wing");

/**
 * AnalyticsConfig is the configuration for the analytics collection
 */
export interface AnalyticsConfig {
  /** user's anonymous id */
  anonymousId: string;
  /** boolean flag to determine if user has already been given a disclaimer message */
  disclaimerDisplayed?: boolean;
  /** displayed version of the disclaimer */
  disclaimerVersion?: string;
  /** optional opt out value */
  optOut?: boolean;
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
      props?.configFile ?? path.join(path.join(WING_HOME_DIR, "wing-analytics-config.json"));
    this.analyticsStorageDir =
      props?.analyticsStorageDir ?? path.join(os.tmpdir(), "wing-analytics");
    this.debug = props?.debug;
    this.analyticsConfig = this.loadConfig();
  }

  /**
   * Stores a single analytic event to disk
   *
   * @param event the analytic event to save
   * @returns the path to the saved event or undefined if there was an error
   */
  public storeAnalyticEvent(event: AnalyticEvent): string | undefined {
    try {
      if (this.analyticsConfig.optOut == true) {
        return undefined;
      }
      const eventId = uuidv4();

      if (!existsSync(this.analyticsStorageDir)) {
        mkdirSync(this.analyticsStorageDir);
      }

      const analyticReportFile = path.join(this.analyticsStorageDir, `${eventId}.json`);

      // attach timestamp and anonymousId to event
      event.timestamp = event.timestamp ?? new Date().toISOString();

      // We add the anonymousId only if we are not in a CI environment
      if (event.properties.ci) {
        const anonymousId = this.getAnonymousId();
        event.anonymousId = anonymousId;
      }

      this.saveEvent(analyticReportFile, event);

      return analyticReportFile;
    } catch (error) {
      return undefined;
    }
  }

  /**
   * Retrieves an analytic event from disk
   *
   * @param filePath the path the event was saved to
   * @returns the event or undefined if there was an error
   */
  public loadEvent(filePath: string): AnalyticEvent | undefined {
    try {
      const fileContents = readFileSync(filePath, "utf-8");
      return JSON.parse(fileContents) as AnalyticEvent;
    } catch (error) {
      // ignore
      return undefined;
    }
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
      const fileContents = readFileSync(this.analyticsConfigFile, "utf-8");
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

  /**
   * Helper method to flatten objects
   *
   * @param properties The properties to flatten
   * @param parentKey The key of the parent (defaults to "")
   * @returns
   */
  private flattenProperties(
    properties: { [key: string]: any },
    parentKey: string = "",
  ): { [key: string]: any } {
    return Object.keys(properties).reduce((accumulated: { [key: string]: any }, key) => {
      const newKey = parentKey ? `${parentKey}_${key}` : key;

      if (
        typeof properties[key] === "object" &&
        properties[key] !== null &&
        !Array.isArray(properties[key])
      ) {
        Object.assign(accumulated, this.flattenProperties(properties[key], newKey));
      } else {
        accumulated[newKey] = properties[key];
      }

      return accumulated;
    }, {});
  }

  private saveEvent(filePath: string, event: AnalyticEvent) {
    try {
      event.properties = this.flattenProperties(event.properties) as any;
      writeFileSync(filePath, JSON.stringify(event));
      if (this.debug) {
        console.log(`Analytics event stored at ${filePath}`);
      }
    } catch (error) {
      if (this.debug) {
        console.log(`Error storing analytics event: ${error}`);
      }
    }
  }
}
