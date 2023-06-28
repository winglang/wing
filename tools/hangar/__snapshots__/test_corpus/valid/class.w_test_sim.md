# [class.w](../../../../../examples/tests/valid/class.w) | test | sim

## stdout.log
```log
pass ─ class.wsim » root/env0/test:access inflight field                      
pass ─ class.wsim » root/env1/test:check derived class instance variables     
pass ─ class.wsim » root/env2/test:devived class init body happens after super
pass ─ class.wsim » root/env3/test:inflight super constructor                 
fail ┌ class.wsim » root/env4/test:soar                                       
     │ ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
     │     at new Soar (/var/folders/9k/cmjcrgls2ss6lhyjgrggwwgm0000gn/T/wing-bundles-FGxWzl/index.js:31:20)
     │     at $Closure5.handle (/var/folders/9k/cmjcrgls2ss6lhyjgrggwwgm0000gn/T/wing-bundles-FGxWzl/index.js:19:11)
     │     at exports.handler (/var/folders/9k/cmjcrgls2ss6lhyjgrggwwgm0000gn/T/wing-bundles-FGxWzl/index.js:63:9)
     │     at async Object.withTrace (/Users/hasan/repos/monada/wing/libs/wingsdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/Users/hasan/repos/monada/wing/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/Users/hasan/repos/monada/wing/apps/wing/dist/commands/test.js:199:22)
     │     at async testOne (/Users/hasan/repos/monada/wing/apps/wing/dist/commands/test.js:114:20)
     └     at async test (/Users/hasan/repos/monada/wing/apps/wing/dist/commands/test.js:55:39)
 
 
Tests 1 failed | 4 passed (5)
Test Files 1 failed (1)
Duration <DURATION>
```

