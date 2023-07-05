# [array.w](../../../../../../examples/tests/sdk_tests/std/array.w) | test | sim

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
pass ─ array.wsim » root/env0/test:length                    
pass ─ array.wsim » root/env1/test:at()                      
pass ─ array.wsim » root/env10/test:copy()                   
pass ─ array.wsim » root/env11/test:copyMut()                
pass ─ array.wsim » root/env12/test:lastIndexOf()            
pass ─ array.wsim » root/env2/test:pushAndPop()              
pass ─ array.wsim » root/env3/test:concatMutArray()          
pass ─ array.wsim » root/env4/test:concatArray()             
pass ─ array.wsim » root/env5/test:contains()                
pass ─ array.wsim » root/env6/test:indexOf()                 
pass ─ array.wsim » root/env7/test:indexOfArray()            
pass ─ array.wsim » root/env8/test:join()                    
pass ─ array.wsim » root/env9/test:joinWithDefaultSeparator()
 
 
Tests 13 passed (13)
Test Files 1 passed (1)
Duration <DURATION>
```

