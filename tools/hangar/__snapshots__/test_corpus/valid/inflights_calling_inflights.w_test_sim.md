# [inflights_calling_inflights.w](../../../../../examples/tests/valid/inflights_calling_inflights.w) | test | sim

## stdout.log
```log
fail ┌ inflights_calling_inflights.wsim » root/env0/test:inflights can call other inflights 
     │ ReferenceError: storeInBucket is not defined
     │     at $Closure2.handle (/tmp/wing-bundles-luDQG1/index.js:14:11)
     │     at exports.handler (/tmp/wing-bundles-luDQG1/index.js:34:9)
     │     at async Object.withTrace (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/@winglang/sdk/lib/testing/simulator.js:72:38)
     │     at async $Closure3.handle (/tmp/wing-bundles-emF85u/index.js:14:11)
     │     at async exports.handler (/tmp/wing-bundles-emF85u/index.js:35:10)
     │     at async Object.withTrace (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/@winglang/sdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/@winglang/sdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:199:22)
     │     at async testOne (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:114:20)
     └     at async test (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:55:39)
fail ┌ inflights_calling_inflights.wsim » root/env1/test:variable can be an inflight closure
     │ TypeError: this.closure is not a function
     │     at MyResource.foo (/tmp/wing-bundles-ko3ynM/index.js:41:29)
     │     at $Closure5.handle (/tmp/wing-bundles-ko3ynM/index.js:14:32)
     │     at exports.handler (/tmp/wing-bundles-ko3ynM/index.js:66:9)
     │     at async Object.withTrace (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/@winglang/sdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/@winglang/sdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:199:22)
     │     at async testOne (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:114:20)
     └     at async test (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:55:39)
 
 
Tests 2 failed (2)
Test Files 1 failed (1)
Duration <DURATION>
```

