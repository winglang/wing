# [events.w](../../../../../../examples/tests/sdk_tests/bucket/events.w) | test | sim

## stdout.log
```log
fail ┌ events.wsim » root/env0/hitCount is incremented according to the bucket event
     │ ReferenceError: wait is not defined
     │     at $Closure8.handle (/tmp/wing-bundles-UW7mg7/index.js:23:16)
     │     at async exports.handler (/tmp/wing-bundles-UW7mg7/index.js:102:10)
     │     at async Object.withTrace (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/@winglang/sdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/@winglang/sdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:199:22)
     │     at async testOne (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:114:20)
     └     at async test (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:55:39)
 
 
Tests 1 failed (1)
Test Files 1 failed (1)
Duration <DURATION>
```

