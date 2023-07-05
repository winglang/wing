# [for_loop.w](../../../../../examples/tests/valid/for_loop.w) | test | sim

## stdout.log
```log
Error: ENOENT: no such file or directory, open '/home/runner/.wing/wing-analytics-anonymous-id.json'
    at Object.openSync (node:fs:601:3)
    at writeFileSync (node:fs:2249:35)
    at getAnonymousId (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/analytics/storage.js:66:32)
    at storeAnalyticEvent (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/analytics/storage.js:49:25)
    at collectCommandAnalytics (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/analytics/collect.js:37:45)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async Object.collectAnalyticsHook [as callback] (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/cli.js:60:37) {
  errno: -2,
  syscall: 'open',
  code: 'ENOENT',
  path: '/home/runner/.wing/wing-analytics-anonymous-id.json'
}
wing: 1
wing: 2
wing: 3
lang: 1
lang: 2
lang: 3
dang: 1
dang: 2
dang: 3
wing: 1
wing: 2
lang: 1
lang: 2
dang: 1
dang: 2
wing: 1
wing: 2
wing: 3
lang: 1
lang: 2
lang: 3
dang: 1
dang: 2
dang: 3
---
for x in 0..0 { ... }
there's no value to iterate
---
for x in 0..=0 { ... }
0
---
for x in 0..2 { ... }
0
1
---
for x in 0..=2 { ... }
0
1
2
---
for x in 2..0 { ... }
2
1
---
for x in 2..=0 { ... }
2
1
0
---
for x in 0..-2 { ... }
0
-1
---
for x in 0..=-2 { ... }
0
-1
-2
---
for x in -2..0 { ... }
-2
-1
---
for x in -2..=0 { ... }
-2
-1
0
---
for x in 0..z { ... } <=> x = 2
0
1
---
for x in 0..=z { ... } <=> x = 2
0
1
2
---
for x in z..0 { ... } <=> x = 2
2
1
---
for x in 0..(z*2) { ... } <=> x = 2
0
1
2
3
---
for x in 0..=(z*2) { ... } <=> x = 2
0
1
2
3
4
---
for x in (z*2)..0 { ... } <=> x = 2
4
3
2
1
pass ─ for_loop.wsim (no tests)
 
 
Tests 1 passed (1)
Test Files 1 passed (1)
Duration <DURATION>
```

