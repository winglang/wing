import { Analytics } from '@segment/analytics-node';
import { AnalyticsStorage } from './storage';


let analytics = new Analytics({ writeKey: 'Rfx0id3AfQCZ5hfSDVy97EoMQB1wDLzF'});
let events = AnalyticsStorage.loadAnalyticsReport();

events.events.forEach(event => {
  analytics.track({
    anonymousId: event.anonymousId ?? 'unknown',
    timestamp: event.timestamp,
    event: event.event,
    properties: event.properties,
  })
});

AnalyticsStorage.clearEvents();
