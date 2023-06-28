# [capture_reassigable_class_field.w](../../../../../examples/tests/valid/capture_reassigable_class_field.w) | test | sim

## stdout.log
```log
fail ┌ capture_reassigable_class_field.wsim » root/env0/test:main
     │ TypeError: this.onUpdateCallback is not a function
     │     at KeyValueStore.get (/tmp/wing-bundles-ZediDq/index.js:63:22)
     │     at $Closure3.handle (/tmp/wing-bundles-ZediDq/index.js:19:21)
     │     at async exports.handler (/tmp/wing-bundles-ZediDq/index.js:3303:10)
     │     at async Object.withTrace (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/@winglang/sdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/@winglang/sdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:199:22)
     │     at async testOne (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:114:20)
     └     at async test (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:55:39)
 
 
Tests 1 failed (1)
Test Files 1 failed (1)
Duration <DURATION>
```

