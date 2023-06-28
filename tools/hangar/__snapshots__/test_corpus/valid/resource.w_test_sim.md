# [resource.w](../../../../../examples/tests/valid/resource.w) | test | sim

## stdout.log
```log
pass ─ resource.wsim » root/env1/test:dependency cycles
fail ┌ resource.wsim » root/env0/test:test             
     │ Error: assertion failed: res.foo.inflightField == 123
     │     at /tmp/wing-bundles-HHni17/index.js:32:23
     │     at $Closure1.handle (/tmp/wing-bundles-HHni17/index.js:33:15)
     │     at async exports.handler (/tmp/wing-bundles-HHni17/index.js:128:10)
     │     at async Object.withTrace (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/@winglang/sdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/@winglang/sdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:199:22)
     │     at async testOne (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:114:20)
     └     at async test (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:55:39)
 
 
Tests 1 failed | 1 passed (2)
Test Files 1 failed (1)
Duration <DURATION>
```

