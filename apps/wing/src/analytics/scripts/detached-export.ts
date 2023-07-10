import { AnalyticsStorage } from '../storage';
import * as fs from 'fs';
import Analytics from '@segment/analytics-node';
import { exit } from 'process';

// When this file is run as a child process, it will be passed the path 
// to the analytics report file
const filePath = process.argv[2];

try {
  if (process.env.DEBUG) {
    // In debug mode no need to export the metrics
    exit(0);
  }
  
  if (!filePath) {
    throw new Error('No file analytic path provided');
  }

  const analytics = new Analytics({ writeKey: 'sCqPF5xSscOjJdi5Tbkqu73vfF8zkZdw'});
  const storage = new AnalyticsStorage();
  const event = storage.loadEvent(filePath);

  if (!event) {
    throw new Error(`No analytic event found at: ${filePath}`);
  }

  analytics.track({
    anonymousId: storage.getAnonymousId(),
    timestamp: event.timestamp,
    event: event.event,
    properties: event.properties,
  });
  
  fs.unlinkSync(filePath);
  
} catch(err) {
  // TODO: add mechanism to retry
}