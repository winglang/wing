# [resource_captures_globals.w](../../../../../examples/tests/valid/resource_captures_globals.w) | test | sim

## stdout.log
```log
pass ─ resource_captures_globals.wsim » root/env0/test:test                                             
fail ┌ resource_captures_globals.wsim » root/env1/test:access cloud resource through static methods only
     │ Error: Missing environment variable: COUNTER_HANDLE_c7ceac93
     │     at /tmp/wing-bundles-lW593O/index.js:68:19
     │     at /tmp/wing-bundles-lW593O/index.js:71:10
     │     at exports.handler (/tmp/wing-bundles-lW593O/index.js:78:5)
     │     at /tmp/wing-bundles-lW593O/index.js:81:9
     │     at Script.runInContext (node:vm:141:12)
     │     at Object.runInContext (node:vm:291:6)
     │     at /home/runner/work/wing/wing/tools/hangar/tmp/node_modules/@winglang/sdk/lib/target-sim/function.inflight.js:143:12
     │     at new Promise (<anonymous>)
     │     at runSandbox (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/@winglang/sdk/lib/target-sim/function.inflight.js:119:12)
     │     at async Object.withTrace (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/@winglang/sdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/@winglang/sdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:199:22)
     │     at async testOne (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:114:20)
     └     at async test (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:55:39)
 
 
Tests 1 failed | 1 passed (2)
Test Files 1 failed (1)
Duration <DURATION>
```

