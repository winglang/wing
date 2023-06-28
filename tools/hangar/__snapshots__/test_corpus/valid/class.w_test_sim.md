# [class.w](../../../../../examples/tests/valid/class.w) | test | sim

## stdout.log
```log
pass ─ class.wsim » root/env0/test:access inflight field                      
pass ─ class.wsim » root/env1/test:check derived class instance variables     
pass ─ class.wsim » root/env2/test:devived class init body happens after super
pass ─ class.wsim » root/env3/test:inflight super constructor                 
fail ┌ class.wsim » root/env4/test:soar                                       
     │ ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
     │     at new Soar (/tmp/wing-bundles-AMJISN/index.js:31:20)
     │     at $Closure5.handle (/tmp/wing-bundles-AMJISN/index.js:19:11)
     │     at exports.handler (/tmp/wing-bundles-AMJISN/index.js:63:9)
     │     at async Object.withTrace (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/@winglang/sdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/@winglang/sdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:199:22)
     │     at async testOne (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:114:20)
     └     at async test (/home/runner/work/wing/wing/tools/hangar/tmp/node_modules/winglang/dist/commands/test.js:55:39)
 
 
Tests 1 failed | 4 passed (5)
Test Files 1 failed (1)
Duration <DURATION>
```

