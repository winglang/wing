---
title: Schedule
id: schedule
description: A built-in resource for defining scheduled tasks.
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    Schedule,
    Cron job,
  ]
sidebar_position: 1
---

The `cloud.Schedule` resource is used to trigger events at a regular interval.
Schedules are useful for periodic tasks, such as running backups or sending daily reports.


## Usage

### From cron
```ts playground
bring cloud;

let schedule = new cloud.Schedule(cron: "* * * * ?");

schedule.onTick(inflight () => {
  log("schedule: triggered");
});
```

### From rate 

```ts playground
bring cloud;

let schedule = new cloud.Schedule(rate: 1m);

schedule.onTick(inflight () => {
  log("schedule: triggered");
});
```
### Simulator (`sim`)

Sim implementations of `cloud.Schedule` uses standard JavaScript `setTimeout` function.

### AWS (`tf-aws` and `awscdk`)

AWS implementations of `cloud.Schedule` use [Amazon CloudWatch](https://aws.amazon.com/cloudwatch/).

### Azure (`tf-azure`)

🚧 Not supported yet (tracking issue: [#1291](https://github.com/winglang/wing/issues/1291)).

### GCP (`tf-gcp`)

🚧 Not supported yet (tracking issue: [#1292](https://github.com/winglang/wing/issues/1292)).

## API Reference

The full list of APIs for `cloud.Schedule` is available in the [API Reference](../api-reference).
