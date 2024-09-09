// TODO: more robust serialization scheme

import { Datetime } from "../std/datetime";

export function serialize(input: any): string {
  return JSON.stringify(input, (_key, value) => {
    if (value instanceof Datetime) {
      return {
        $kind: "datetime",
        day: value.dayOfMonth,
        hour: value.hours,
        min: value.min,
        month: value.month,
        sec: value.sec,
        year: value.year,
        ms: value.ms,
        tz: value.timezone,
      };
    }
    return value;
  });
}

export function deserialize(input: string): any {
  return JSON.parse(input, (_key, value) => {
    // assumption: Wing APIs don't distinguish between null and undefined, so we can swap them
    if (value === null) {
      return undefined;
    }
    if (value.$kind === "datetime") {
      return Datetime.fromComponents({
        day: value.day,
        hour: value.hour,
        min: value.min,
        month: value.month,
        sec: value.sec,
        year: value.year,
        ms: value.ms,
        tz: value.tz,
      });
    }
    return value;
  });
}
