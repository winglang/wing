# [bucket_events.w](../../../../../examples/tests/valid/bucket_events.w) | test | sim

## stdout.log
```log
Error: ENOENT: no such file or directory, open '/home/runner/.wing/wing-analytics-anonymous-id.json'
    at Object.openSync (node:fs:601:3)
    at writeFileSync (node:fs:2249:35)
    at getAnonymousId (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/analytics/storage.js:66:32)
    at storeAnalyticEvent (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/analytics/storage.js:49:25)
    at collectCommandAnalytics (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/analytics/collect.js:37:45)
    at async Object.collectAnalyticsHook [as callback] (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/cli.js:60:37) {
  errno: -2,
  syscall: 'open',
  code: 'ENOENT',
  path: '/home/runner/.wing/wing-analytics-anonymous-id.json'
}
pass ┌ bucket_events.wsim » root/env0/test:putting and deleting from a bucket to trigger bucket events
     │ created a
     │ other bucket event called!
     │ created b
     │ other bucket event called!
     │ updated b
     │ other bucket event called!
     │ created c
     │ other bucket event called!
     │ deleted c
     └ other bucket event called!
 
 
Tests 1 passed (1)
Test Files 1 passed (1)
Duration <DURATION>
```

