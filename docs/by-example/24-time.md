---
title: Time
id: time
slug: /time
sidebar_label: Time
description: Create time/date values in Wing
keywords: [Wing language, time, date]
image: /img/wing-by-example.png
custom_edit_url: https://github.com/winglang/wing/blob/main/docs/by-example/24-time.md
---

```js playground example title="main.w"
let now = datetime.utcNow();

log(now.toIso());

let then = datetime.fromIso("2020-09-09");
log(then.toIso());

log(then.year);
log(then.month);
log(then.dayOfWeek);
log(then.dayOfMonth);
log(then.hours);
log(then.min);
log(then.sec);
log(then.ms);

log(then.timestamp);
log(then.timestampMs);
log(then.timezone);
```

```bash title="Wing console output"
# Run locally with wing console
2024-09-09T12:25:01.080Z
2020-09-09T00:00:00.000Z
2020
8
3
9
0
0
0
0
1599609600
1599609600000
0
```




