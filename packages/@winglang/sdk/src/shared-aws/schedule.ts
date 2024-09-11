import * as cloud from "../cloud";
import { lift } from "../core";

/**
 * Convert Unix cron to AWS cron
 */
export const convertUnixCronToAWSCron = (cron: string) => {
  const minute = cron.split(" ")[0];
  const hour = cron.split(" ")[1];
  let dayOfMonth = cron.split(" ")[2];
  const month = cron.split(" ")[3];
  let dayOfWeek = cron.split(" ")[4];

  /*
   * The implementation of cron on AWS does not allow [day of month] and [day of week]
   * to have the character '*' at the same time.
   * Therefore, [day of week] will be replaced by '?'.
   */
  if (cron && dayOfMonth == "*" && dayOfWeek == "*") {
    dayOfWeek = "?";
  }

  if (cron && dayOfMonth !== "*" && dayOfWeek !== "*") {
    throw new Error(
      "Cannot restrict both 'day-of-month' and 'day-of-week' in a cron expression, at least one must be '*'"
    );
  }

  if (dayOfWeek !== "*" && dayOfWeek !== "?") {
    dayOfMonth = "?";
    if (/\d/.test(dayOfWeek)) {
      dayOfWeek = convertDayOfWeekFromUnixToAWS(dayOfWeek);
    }
  }

  /*
   * The schedule cron string is Unix cron format: [minute] [hour] [day of month] [month] [day of week]
   * AWS EventBridge Schedule uses a 6 field format which includes year: [minute] [hour] [day of month] [month] [day of week] [year]
   * https://docs.aws.amazon.com/scheduler/latest/UserGuide/schedule-types.html#cron-based
   *
   * We append * to the cron string for year field.
   */
  return (
    minute +
    " " +
    hour +
    " " +
    dayOfMonth +
    " " +
    month +
    " " +
    dayOfWeek +
    " *"
  );
};

const convertDayOfWeekFromUnixToAWS = (dayOfWeek: string): string => {
  const numbers = dayOfWeek.match(/\d+/g);

  if (numbers) {
    for (const number of numbers) {
      dayOfWeek = dayOfWeek.replace(number, (parseInt(number) + 1).toString());
    }
  }

  return dayOfWeek;
};

/**
 * Utility class for working with the schedule tick handler.
 */
export class ScheduleOnTickHandler {
  /**
   * Converts a schedule tick handler to a function handler.
   * @param handler The schedule tick handler.
   * @returns The function handler.
   */
  public static toFunctionHandler(
    handler: cloud.IScheduleOnTickHandler
  ): cloud.IFunctionHandler {
    return lift({ handler }).inflight(async (ctx) => {
      await ctx.handler();
      return undefined;
    });
  }
}
