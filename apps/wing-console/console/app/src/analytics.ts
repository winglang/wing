import Segment from "analytics-node";
import { nanoid } from "nanoid";

export interface CreateAnalyticsOptions {
  anonymousId: string;
  segmentWriteKey: string;
}

export interface Analytics {
  track(event: string, properties?: Record<string, any>): void;
}

export const createAnalytics = (options: CreateAnalyticsOptions): Analytics => {
  const segment = new Segment(options.segmentWriteKey);
  const sessionId = nanoid();
  return {
    track(event: string, properties?: Record<string, any>) {
      segment.track({
        anonymousId: options.anonymousId,
        event,
        properties: {
          sessionId,
          ...(properties || {}),
        },
      });
    },
  };
};
