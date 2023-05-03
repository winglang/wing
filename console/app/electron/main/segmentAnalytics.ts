import Segment from "analytics-node";
import Store from "electron-store";
import { nanoid } from "nanoid";

export class SegmentAnalytics {
  readonly analytics: Segment;
  readonly anonymousId: string;
  constructor(writeKey: string) {
    this.analytics = new Segment(writeKey);
    const store = new Store({
      name: "wing-console-analytics",
      schema: {
        userId: {
          type: "string",
        },
      },
    });
    let userId = store.get("userId");
    if (!userId) {
      const newUserId = nanoid();
      store.set("userId", newUserId);
      this.analytics.identify({
        anonymousId: newUserId,
        traits: {
          // todo [SA] add more traits
          dev: import.meta.env.DEV,
        },
      });
    }
    this.anonymousId = store.get("userId") as string;
  }
}
