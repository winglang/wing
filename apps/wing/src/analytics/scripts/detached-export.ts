import * as fs from "fs";
import { exit } from "process";
import Analytics from "@segment/analytics-node";
import { AnalyticsStorage } from "../storage";

// When this file is run as a child process, it will be passed the path
// to the analytics report file
const filePath = process.argv[2];

const segmentWriteKey = "sCqPF5xSscOjJdi5Tbkqu73vfF8zkZdw";

// This debug write key is used to send events to a debug source in segment
// the purpose is to make life easier for testing analytics changes without
// sifting through real data. The only time we export metrics to the debug source
// is if the DEBUG env var is set AND the WING_ANALYTICS_FORCE_EXPORT env var is set
// this way when just running with DEBUG flag we can see analytic event files on disk
const segmentDebugWriteKey = "6r9ySJHdUGkDO80X8i4h2pGGHxYRwFe2";

async function reportAnalytic() {
  if (process.env.DEBUG && !process.env.WING_ANALYTICS_FORCE_EXPORT) {
    // In debug mode no need to export the metrics
    exit(0);
  }

  if (!filePath) {
    throw new Error("No file analytic path provided");
  }

  const analytics = new Analytics({
    writeKey: process.env.DEBUG ? segmentDebugWriteKey : segmentWriteKey,
  });
  const storage = new AnalyticsStorage();
  const event = storage.loadEvent(filePath);

  if (!event) {
    throw new Error(`No analytic event found at: ${filePath}`);
  }

  const params = {
    anonymousId: storage.getAnonymousId(),
    timestamp: event.timestamp,
    event: event.event,
    properties: event.properties,
  };

  const awaitTrack = async () => {
    return new Promise((resolve, reject) => {
      analytics.track(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };

  await awaitTrack();

  fs.unlinkSync(filePath);
}

void (async () => {
  try {
    await reportAnalytic();
  } catch (err: any) {
    // TODO: add mechanism to retry maybe
  }
})();
