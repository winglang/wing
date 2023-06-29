import Segment from "analytics-node";

export interface CreateAnalyticsOptions {
  anonymousId: string;
  segmentWriteKey: string;
}

export interface Analytics {
  track(event: string): void;
}

export const createAnalytics = (options: CreateAnalyticsOptions): Analytics => {
  const segment = new Segment(options.segmentWriteKey);

  segment.identify({
    anonymousId: options.anonymousId,
  });

  return {
    track(event: string) {
      segment.track({
        anonymousId: options.anonymousId,
        event,
      });
    },
  };
};
