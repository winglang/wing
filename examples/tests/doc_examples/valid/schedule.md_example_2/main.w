// This file was auto generated from an example found in: schedule.md_example_2
// Example metadata: {"valid":true}
bring cloud;

let schedule = new cloud.Schedule(rate: 1m);

schedule.onTick(inflight () => {
  log("schedule: triggered");
});
