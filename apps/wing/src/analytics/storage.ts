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
export function storeAnalyticEvent(event: AnalyticEvent): string {
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
}

export function getAnonymousId(): string {
  let config = loadAnalyticsConfig();
  return config.anonymousId;
}

export function loadAnalyticsConfig(): AnalyticsConfig {
  try {
    const fileContents = readFileSync(WING_ANALYTICS_CONFIG_FILE, 'utf-8');
    return JSON.parse(fileContents) as AnalyticsConfig;
  } catch (error) {
    // Possible issue reading analytics config file, first determine if file exists yet
    if (existsSync(WING_ANALYTICS_CONFIG_FILE)) {
      // File exists but could not be read. In this case we should not attempt to
      // make any assumptions about the contents of the file
      // This exception will only be visible in DEBUG mode
      throw new Error("Could not read analytics config file")
    }

    // Since file does NOT exist we can generate a new config and store it
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