import { Analytics } from '@segment/analytics-node';
import { AnalyticsStorage } from './storage';


// TODO: How do we manage this writeKey? Right now its just my personal free-tier writeKey
let analytics = new Analytics({ writeKey: 'Rfx0id3AfQCZ5hfSDVy97EoMQB1wDLzF'});
let report = AnalyticsStorage.loadAnalyticsReport();

report.events.forEach(event => {
  analytics.track({
    anonymousId: event.anonymousId ?? 'unknown',
    timestamp: event.timestamp,
    event: event.event,
    properties: event.properties,
  })
});

AnalyticsStorage.clearEvents();
