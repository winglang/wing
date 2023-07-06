import { getAnonymousId, loadAnalyticsEvent } from '../storage';
import * as fs from 'fs';
import Analytics from '@segment/analytics-node';
import { getWingAnalyticsCollectionConfig } from '../collect';

// When this file is run as a child process, it will be passed the path 
// to the analytics report file
const filePath = process.argv[2];

try {
  const analytics = new Analytics({ writeKey: 'sCqPF5xSscOjJdi5Tbkqu73vfF8zkZdw'});
  const event = loadAnalyticsEvent(filePath);
  const analyticsConfig = getWingAnalyticsCollectionConfig();

  if (analyticsConfig.export) {
    analytics.track({
      anonymousId: getAnonymousId(),
      timestamp: event.timestamp,
      event: event.event,
      properties: event.properties,
    });
  }

  // Keeps the file around for debugging purposes
  if (!analyticsConfig.debug) {
    fs.unlinkSync(filePath);
  }
} catch(err) {
  // TODO: add mechanism to retry
}