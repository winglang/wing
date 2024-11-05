---
title: Duration
id: duration
slug: /duration
sidebar_label: Duration
description: Get duration of time in Wing
keywords: [Wing language, Type reflection]
image: /img/wing-by-example.png
custom_edit_url: https://github.com/winglang/wing/blob/main/docs/by-example/37-duration.md
---

The [duration](/docs/api/standard-library/std/duration) represents a length of time in Wing.

You can use this to get durations representing the amount of milliseconds, seconds, minutes, hours, days, and years.

```js playground example title="main.w"
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
```

```bash title="Wing console output"
# Run locally with wing console
{"msInHour":3600000,"msInSeconds":30000,"secondsInDay":86400,"hoursInDay":24,"hoursInMonth":730,"daysInYear":365}
```


