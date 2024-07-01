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
The timezone used in cron expressions is always UTC.

## Usage

### From cron

```ts playground example
bring cloud;

let schedule = new cloud.Schedule(cron: "* * * * *");

schedule.onTick(inflight () => {
  log("schedule: triggered");
});
```

### From rate

```ts playground example
bring cloud;

let schedule = new cloud.Schedule(rate: 1m);

schedule.onTick(inflight () => {
  log("schedule: triggered");
});
```

### Simulator (`sim`)

A standard JavaScript `setTimeout` function triggers ticks as callbacks.

### AWS (`tf-aws` and `awscdk`)

See [Amazon CloudWatch](https://aws.amazon.com/cloudwatch/).

### Azure (`tf-azure`)

🚧 Not supported yet (tracking issue: [#1291](https://github.com/winglang/wing/issues/1291)).

### GCP (`tf-gcp`)

🚧 Not supported yet (tracking issue: [#1292](https://github.com/winglang/wing/issues/1292)).
