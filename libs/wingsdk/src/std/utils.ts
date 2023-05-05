import { Duration } from "./duration";

export class Utils {
  public static async sleep(duration: Duration): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, duration.milliseconds));
  }
}
