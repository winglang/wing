import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { AnalyticEvent } from "./event";
import { randomBytes } from "crypto";
import {v4 as uuidv4 } from "uuid";
import path from "path";
import * as os from "os";

const WING_HOME_DIR = path.join(os.homedir(), ".wing")
const DEFAULT_WING_ANALYTICS_CONFIG_FILE = path.join(WING_HOME_DIR, 'wing-analytics-config.json');

export interface AnalyticsConfig {
  anonymousId: string;
  disclaimerDisplayed?: boolean;
  optOut?: boolean;
}

interface AnalyticsStorageProps {
  configFile?: string;
  debug?: boolean;
}

export class AnalyticsStorage {
  analyticsConfigFile: string;
  analyticsConfig: AnalyticsConfig;
  debug?: boolean;

  constructor(props?: AnalyticsStorageProps) {
    this.analyticsConfigFile = props?.configFile ?? DEFAULT_WING_ANALYTICS_CONFIG_FILE;
    this.debug = props?.debug;
    this.analyticsConfig = this.loadConfig();
  }

  public storeAnalyticEvent(event: AnalyticEvent): string | undefined {
    try {
      if (this.analyticsConfig.optOut == true) {
        return undefined;
      }
      const eventId = uuidv4();
      const tmpdir = path.join(os.tmpdir(), "wing-analytics");
      
      if (!existsSync(tmpdir)) {
        mkdirSync(tmpdir);
      }
  
      const analyticReportFile = path.join(tmpdir, `${eventId}.json`);
      
      const anonymousId = this.getAnonymousId();
    
      // attach timestamp and anonymousId to event
      event.timestamp = event.timestamp ?? new Date().toISOString();
      event.anonymousId = anonymousId;
    
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

  private saveEvent(filePath: string, event: AnalyticEvent) {
    writeFileSync(filePath, JSON.stringify(event))
    if (this.debug) {
      console.log(`Analytics event stored at ${filePath}`);
    }
  }
}