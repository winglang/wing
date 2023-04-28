import { Duration } from "./duration";

export const sleep = async (duration: Duration): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, duration.milliseconds));
