import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { AnalyticEvent } from "./event";
import { randomBytes } from "crypto";
import {v4 as uuidv4 } from "uuid";
import path from "path";
import * as os from "os";

const WING_ANALYTICS_ANONYMOUS_ID_FILE = path.join(os.homedir(), ".wing", 'wing-analytics-anonymous-id.json');

interface AnonymousId {
  anonymousId: string;
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
  let data: AnonymousId = { anonymousId: '' };
  
  try {
    const fileContents = readFileSync(WING_ANALYTICS_ANONYMOUS_ID_FILE, 'utf-8');
    data = JSON.parse(fileContents) as AnonymousId;
  } catch (error) {
    // Issue reading file with anonymousId, generate a new one
    data.anonymousId = randomBytes(16).toString('hex');
    writeFileSync(WING_ANALYTICS_ANONYMOUS_ID_FILE, JSON.stringify(data))
  }

  return data.anonymousId;
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
  // TODO: get rid of the null, 2
  writeFileSync(filePath, JSON.stringify(event, null, 2))
}