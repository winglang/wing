import Analytics from "@segment/analytics-node";

export interface CreateAnalyticsOptions {
  anonymousId: string;
  segmentWriteKey: string;
}

export interface IAnalytics {
  track(event: string, properties?: Record<string, any>): void;
}

export const createAnalytics = (
  options: CreateAnalyticsOptions,
): IAnalytics => {
  let segment: Analytics;
  const sessionId = Date.now();
  try {
    segment = new Analytics({ writeKey: options.segmentWriteKey });
  } catch {}
  return {
    track(event: string, properties?: Record<string, any>) {
      if (!segment) {
        return;
      }
      try {
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
      } catch {}
    },
  };
};
