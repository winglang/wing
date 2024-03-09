/**
 * Convert Unix cron to AWS cron
 */
export const convertUnixCrontoAWSCron = (cron: string) => {
  let newCron = cron;

  /*
   * The implementation of cron on AWS does not allow [day of month] and [day of week]
   * to have the character '*' at the same time.
   * Therefore, [day of week] will be replaced by '?'.
   */
  if (cron && cron.split(" ")[2] == "*" && cron.split(" ")[4] == "*") {
    const lastIndex = cron.lastIndexOf("*");
    newCron = cron.substring(0, lastIndex) + "?";
  }

  if (cron && cron.split(" ")[2] !== "*" && cron.split(" ")[4] !== "*") {
    console.log(cron);
    throw new Error("Cannot supply both 'day' and 'weekDay', use at most one");
  }

  /*
   * The schedule cron string is Unix cron format: [minute] [hour] [day of month] [month] [day of week]
   * AWS EventBridge Schedule uses a 6 field format which includes year: [minute] [hour] [day of month] [month] [day of week] [year]
   * https://docs.aws.amazon.com/scheduler/latest/UserGuide/schedule-types.html#cron-based
   *
   * We append * to the cron string for year field.
   */
  return newCron + " *";
};
