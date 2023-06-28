# [calling_inflight_variants.w](../../../../../examples/tests/valid/calling_inflight_variants.w) | test | sim

## stdout.log
```log
fail ┌ calling_inflight_variants.wsim » root/env0/test:calling different types of inflights
     │ TypeError: this.inflight1 is not a function
     │     at Foo.callFn2 (/tmp/wing-bundles-ePimNJ/index.js:70:34)
     │     at $Closure2.handle (/tmp/wing-bundles-ePimNJ/index.js:28:22)
     │     at async exports.handler (/tmp/wing-bundles-ePimNJ/index.js:117:10)
     │     at async Object.withTrace (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/@winglang/sdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/@winglang/sdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:199:22)
     │     at async testOne (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:114:20)
     └     at async test (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:55:39)
 
 
Tests 1 failed (1)
Test Files 1 failed (1)
Duration <DURATION>
```

