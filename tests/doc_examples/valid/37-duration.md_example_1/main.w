// This file was auto generated from an example found in: 37-duration.md_example_1
// Example metadata: {"valid":true}
let msInHour = duration.fromHours(1).milliseconds;
let msInSeconds = duration.fromSeconds(30).milliseconds;
let secondsInDay = duration.fromDays(1).seconds;
let hoursInDay = duration.fromDays(1).hours;
let hoursInMonth = duration.fromMonths(1).hours;
let daysInYear = duration.fromYears(1).days;

let durations = {
  msInHour,
  msInSeconds,
  secondsInDay,
  hoursInDay,
  hoursInMonth,
  daysInYear
};

log(Json.stringify(durations));
