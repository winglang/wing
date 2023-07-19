import Segment from "analytics-node";

export interface CreateAnalyticsOptions {
  anonymousId: string;
  segmentWriteKey: string;
}

export interface Analytics {
  track(event: string, properties?: Record<string, any>): void;
}

export const createAnalytics = (options: CreateAnalyticsOptions): Analytics => {
  const segment = new Segment(options.segmentWriteKey);
  const sessionId = Date.now();
  return {
    track(event: string, properties?: Record<string, any>) {
      segment.track({
        anonymousId: options.anonymousId,
        event: event.toLowerCase().replaceAll(/\s/g, ""),
        properties,
        integrations: {
          "Actions Amplitude": {
            session_id: sessionId,
          },
        },
      });
    },
  };
};
