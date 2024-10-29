---
title: Sleep
id: sleep
slug: /sleep
sidebar_label: Sleep
description: Suspends execution for a given duration.
keywords: [Wing language, sleep]
image: /img/wing-by-example.png
custom_edit_url: https://github.com/winglang/wing/blob/main/docs/by-example/20-sleep.md
---

`util.sleep` is an [inflight](/docs/concepts/inflights) api.

You cannot sleep in preflight code.

```js playground example title="main.w"
bring util;
bring cloud;

// util.sleep has inflight api for sleep
inflight () => {
  util.sleep(40s);
};

// example showing cloud function that sleeps
let longTask = new cloud.Function(inflight () => {

  let timer1 = () => {
    log("Time 1 fired");
    util.sleep(5s);
  };

  let timer2 = () => {
    log("Time 2 fired");
    util.sleep(2s);
  };

  timer1();
  timer2();
});

```

```bash title="Wing console output"
# Run locally with wing console
wing it

# Run the cloud function using the console (to trigger the inflight function)
Time 1 fired
Time 2 fired
```