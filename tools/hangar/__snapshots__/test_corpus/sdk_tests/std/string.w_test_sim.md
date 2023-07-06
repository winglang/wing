# [string.w](../../../../../../examples/tests/sdk_tests/std/string.w) | test | sim

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
pass ─ string.wsim » root/env0/test:fromJson    
pass ─ string.wsim » root/env1/test:length      
pass ─ string.wsim » root/env10/test:substring()
pass ─ string.wsim » root/env11/test:trim()     
pass ─ string.wsim » root/env12/test:contains() 
pass ─ string.wsim » root/env2/test:at()        
pass ─ string.wsim » root/env3/test:concat()    
pass ─ string.wsim » root/env4/test:endsWith()  
pass ─ string.wsim » root/env5/test:indexOf()   
pass ─ string.wsim » root/env6/test:lowercase() 
pass ─ string.wsim » root/env7/test:uppercase() 
pass ─ string.wsim » root/env8/test:split()     
pass ─ string.wsim » root/env9/test:startsWith()
 
 
Tests 13 passed (13)
Test Files 1 passed (1)
Duration <DURATION>
```

