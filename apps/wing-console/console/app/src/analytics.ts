import Segment from "analytics-node";

export interface CreateAnalyticsOptions {
  anonymousId: string;
  segmentWriteKey: string;
}

export interface Analytics {
  track(event: string, properties?: Record<string, any>): void;
}

export const createAnalytics = (options: CreateAnalyticsOptions): Analytics => {
  let segment: Segment;
  const sessionId = Date.now();
  try {
    segment = new Segment(options.segmentWriteKey);
  } catch (error) {
    console.debug("failed to initialize analytics", error);
  }
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
      } catch (error) {
        console.debug("failed to send analytics", error);
      }
    },
  };
};
