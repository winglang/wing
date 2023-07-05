# [debug_env.w](../../../../../examples/tests/valid/debug_env.w) | test | sim

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
[symbol environment at ../../../../examples/tests/valid/debug_env.w:7:5]
level 0: { this => A }
level 1: { A => A [type], assert => (condition: bool): void, cloud => cloud [namespace], log => (message: str): void, panic => (message: str): void, std => std [namespace], throw => (message: str): void }
pass ─ debug_env.wsim (no tests)
 
 
Tests 1 passed (1)
Test Files 1 passed (1)
Duration <DURATION>
```

