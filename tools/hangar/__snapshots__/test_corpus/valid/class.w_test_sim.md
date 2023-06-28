# [class.w](../../../../../examples/tests/valid/class.w) | test | sim

## stdout.log
```log
pass ─ class.wsim » root/env1/test:check derived class instance variables     
pass ─ class.wsim » root/env2/test:devived class init body happens after super
pass ─ class.wsim » root/env3/test:inflight super constructor                 
fail ┌ class.wsim » root/env0/test:access inflight field                      
     │ Error: assertion failed: c5.x == 123
     │     at /tmp/wing-bundles-8gLksM/index.js:17:23
     │     at $Closure1.handle (/tmp/wing-bundles-8gLksM/index.js:18:15)
     │     at exports.handler (/tmp/wing-bundles-8gLksM/index.js:84:9)
     │     at async Object.withTrace (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/@winglang/sdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/@winglang/sdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:199:22)
     │     at async testOne (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:114:20)
     └     at async test (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:55:39)
 
 
Tests 1 failed | 3 passed (4)
Test Files 1 failed (1)
Duration <DURATION>
```

