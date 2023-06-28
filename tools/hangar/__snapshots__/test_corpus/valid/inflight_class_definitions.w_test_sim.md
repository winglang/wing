# [inflight_class_definitions.w](../../../../../examples/tests/valid/inflight_class_definitions.w) | test | sim

## stdout.log
```log
fail ┌ inflight_class_definitions.wsim » root/env0/test:test
     │ ReferenceError: fn is not defined
     │     at $Closure3.handle (/tmp/wing-bundles-aiR33v/index.js:29:11)
     │     at async exports.handler (/tmp/wing-bundles-aiR33v/index.js:106:10)
     │     at async Object.withTrace (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/@winglang/sdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/@winglang/sdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:199:22)
     │     at async testOne (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:114:20)
     └     at async test (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:55:39)
 
 
Tests 1 failed (1)
Test Files 1 failed (1)
Duration <DURATION>
```

