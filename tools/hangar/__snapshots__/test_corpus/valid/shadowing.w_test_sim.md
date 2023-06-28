# [shadowing.w](../../../../../examples/tests/valid/shadowing.w) | test | sim

## stdout.log
```log
fail ┌ shadowing.wsim » root/env0/test:capture shadow interaction
     │ ReferenceError: fn is not defined
     │     at $Closure2.handle (/tmp/wing-bundles-ZlGks3/index.js:14:26)
     │     at exports.handler (/tmp/wing-bundles-ZlGks3/index.js:62:9)
     │     at async Object.withTrace (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/@winglang/sdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/@winglang/sdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:199:22)
     │     at async testOne (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:114:20)
     └     at async test (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:55:39)
 
 
Tests 1 failed (1)
Test Files 1 failed (1)
Duration <DURATION>
```

