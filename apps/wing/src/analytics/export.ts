import { Analytics } from '@segment/analytics-node';
import { AnalyticsStorage } from './storage';

let analytics = new Analytics({ writeKey: 'sCqPF5xSscOjJdi5Tbkqu73vfF8zkZdw'});
let report = AnalyticsStorage.loadAnalyticsReport();

analytics;
report;

report.events.forEach(event => {
  analytics.track({
    anonymousId: event.anonymousId ?? 'unknown',
    timestamp: event.timestamp,
    event: event.event,
    properties: event.properties,
  })
});

AnalyticsStorage.clearEvents();
