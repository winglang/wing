// This file was auto generated from an example found in: schedule.md_example_1
// Example metadata: {"valid":true}
bring cloud;

let schedule = new cloud.Schedule(cron: "* * * * *");

schedule.onTick(inflight () => {
  log("schedule: triggered");
});
