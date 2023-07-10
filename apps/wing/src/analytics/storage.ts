import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { AnalyticEvent } from "./event";
import { randomBytes } from "crypto";
import {v4 as uuidv4 } from "uuid";
import path from "path";
import * as os from "os";

const WING_HOME_DIR = path.join(os.homedir(), ".wing")

export interface AnalyticsConfig {
  anonymousId: string;
  disclaimerDisplayed?: boolean;
  optOut?: boolean;
}

interface AnalyticsStorageProps {
  analyticsStorageDir?: string;
  configFile?: string;
  debug?: boolean;
}

export class AnalyticsStorage {
  analyticsStorageDir: string;
  analyticsConfigFile: string;
  analyticsConfig: AnalyticsConfig;
  debug?: boolean;

  constructor(props?: AnalyticsStorageProps) {
    this.analyticsConfigFile = props?.configFile ?? path.join(path.join(WING_HOME_DIR, 'wing-analytics-config.json'));
    this.analyticsStorageDir = props?.analyticsStorageDir ?? path.join(os.tmpdir(), "wing-analytics");
    this.debug = props?.debug;
    this.analyticsConfig = this.loadConfig();
  }

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
      if (!event.properties.ci) {
        const anonymousId = this.getAnonymousId();
        event.anonymousId = anonymousId;
      }
    
      this.saveEvent(analyticReportFile, event);
    
      return analyticReportFile;
  
    } catch (error) {
      return undefined;
    }
  }

  public loadEvent(filePath: string): AnalyticEvent | undefined {
    try {
      const fileContents = readFileSync(filePath, 'utf-8');
      return JSON.parse(fileContents) as AnalyticEvent;
    } catch (error) {
      // ignore
      return undefined;
    }
  }

  public getAnonymousId(): string {
    let config = this.loadConfig();
    return config.anonymousId;
  }

  public loadConfig(): AnalyticsConfig {
    try {
      const fileContents = readFileSync(this.analyticsConfigFile, 'utf-8');
      return JSON.parse(fileContents) as AnalyticsConfig;
    } catch (error: any) {
      // Possible issue reading analytics config file, first determine if file exists yet
  
      if (error.code === 'EACCES') {
        throw new Error("Not able to access analytics config file due to permissions");
      }
  
      const analyticsConfig: AnalyticsConfig = {
        anonymousId: randomBytes(16).toString('hex'),
        optOut: false,
      }
  
      this.saveConfig(analyticsConfig);
  
      return analyticsConfig;
    }
  }

  public saveConfig(config: AnalyticsConfig) {
    if (!existsSync(WING_HOME_DIR)) {
      mkdirSync(WING_HOME_DIR);
    }
    writeFileSync(this.analyticsConfigFile, JSON.stringify(config))
  }

  /**
   * Helper method to flatten objects
   * 
   * @param properties The properties to flatten
   * @param parentKey The key of the parent (defaults to "")
   * @returns 
   */
  private flattenProperties(properties: {[key: string]: any}, parentKey: string = ""): {[key: string]: any} {
    return Object.keys(properties).reduce((accumulated: {[key:string]: any}, key) => {
      const newKey = parentKey ? `${parentKey}_${key}` : key;

      if (typeof properties[key] === 'object' && properties[key] !== null && !Array.isArray(properties[key])) {
        Object.assign(accumulated, this.flattenProperties(properties[key], newKey));
      } else {
        accumulated[newKey] = properties[key];
      }
      
      return accumulated;
    }, {});
  }


  private saveEvent(filePath: string, event: AnalyticEvent) {
    event.properties = this.flattenProperties(event.properties) as any;
    writeFileSync(filePath, JSON.stringify(event))
    if (this.debug) {
      console.log(`Analytics event stored at ${filePath}`);
    }
  }
}