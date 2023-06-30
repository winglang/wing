import { existsSync, readFileSync, writeFileSync } from "fs";
import { AnalyticEvent, AnalyticsReport } from "./event";
import { randomBytes } from "crypto";

const WING_ANALYTICS_FILE = 'wing-analytics.json';

export class AnalyticsStorage {
  static storeAnalyticEvent(event: AnalyticEvent) {
    let data: AnalyticsReport = existsSync(WING_ANALYTICS_FILE) ? 
    this.loadAnalyticsReport() : 
    { events: [] };
  
    // Probably first run need to generate an annonymousId
    if (!data.anonymousId) {
      data.anonymousId = randomBytes(16).toString('hex');
    }
    
    if (!data.events) {
      data.events = [];
    }

    // attach timestamp and anonymousId to event
    event.timestamp = event.timestamp ?? new Date().toISOString();
    event.anonymousId = data.anonymousId;

    data.events.push(event);

    this.saveAnalyticsReport(data);
  }

  static loadAnalyticsReport(): AnalyticsReport {
    let data: AnalyticsReport = { events: [] };
    
    try {
      const fileContents = readFileSync(WING_ANALYTICS_FILE, 'utf-8');
      data = JSON.parse(fileContents) as AnalyticsReport;
    } catch (error) {
      // ignore
    }

    return data;
  }

  static saveAnalyticsReport(data: AnalyticsReport) {
    writeFileSync(WING_ANALYTICS_FILE, JSON.stringify(data, null, 2))
  }

  static clearEvents() {
    let data = this.loadAnalyticsReport();
    data.events = [];
    this.saveAnalyticsReport(data);
  }
}