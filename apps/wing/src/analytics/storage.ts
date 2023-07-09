import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { AnalyticEvent } from "./event";
import { randomBytes } from "crypto";
import {v4 as uuidv4 } from "uuid";
import path from "path";
import * as os from "os";

const WING_HOME_DIR = path.join(os.homedir(), ".wing")
const WING_ANALYTICS_CONFIG_FILE = path.join(WING_HOME_DIR, 'wing-analytics-config.json');

interface AnalyticsConfig {
  anonymousId: string;
  disclaimerDisplayed?: boolean;
  optOut?: boolean;
}

/**
 * Stores an analytic event to disk for later export
 * 
 * @param event the event to store
 * @returns string the file path of the stored analytic
 */
export function storeAnalyticEvent(event: AnalyticEvent): string | undefined {
  try {
    const eventId = uuidv4();
    const tmpdir = path.join(os.tmpdir(), "wing-analytics");
    
    if (!existsSync(tmpdir)) {
      mkdirSync(tmpdir);
    }

    const analyticReportFile = path.join(tmpdir, `${eventId}.json`);
    
    const anonymousId = getAnonymousId();
  
    // attach timestamp and anonymousId to event
    event.timestamp = event.timestamp ?? new Date().toISOString();
    event.anonymousId = anonymousId;
  
    saveAnalyticsReport(analyticReportFile, event);
  
    return analyticReportFile;

  } catch (error) {
    return undefined;
  }

}

export function getAnonymousId(): string {
  let config = loadAnalyticsConfig();
  return config.anonymousId;
}

export function loadAnalyticsConfig(): AnalyticsConfig {
  try {
    const fileContents = readFileSync(WING_ANALYTICS_CONFIG_FILE, 'utf-8');
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

    saveAnalyticsConfig(analyticsConfig);

    return analyticsConfig;
  }
}

export function saveAnalyticsConfig(config: AnalyticsConfig) {
  if (!existsSync(WING_HOME_DIR)) {
    mkdirSync(WING_HOME_DIR);
  }
  writeFileSync(WING_ANALYTICS_CONFIG_FILE, JSON.stringify(config))
}

export function loadAnalyticsEvent(filePath: string): AnalyticEvent {
  try {
    const fileContents = readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContents) as AnalyticEvent;
  } catch (error) {
    // ignore
    return {} as any;
  }
}

function saveAnalyticsReport(filePath: string, event: AnalyticEvent) {
  writeFileSync(filePath, JSON.stringify(event))
}