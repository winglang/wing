# [events.w](../../../../../../examples/tests/sdk_tests/bucket/events.w) | test | sim

## stdout.log
```log
fail ┌ events.wsim » root/env0/hitCount is incremented according to the bucket event
     │ ReferenceError: wait is not defined
     │     at $Closure8.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-iNOEI0/index.js:23:16)
     │     at async exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-iNOEI0/index.js:102:10)
     │     at async Object.withTrace (/Users/eladb/code/wing2/libs/wingsdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/Users/eladb/code/wing2/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:199:22)
     │     at async testOne (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:114:20)
     └     at async test (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:55:29)
ReferenceError: wait is not defined
    at $Closure8.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-iNOEI0/index.js:23:16)
    at async exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-iNOEI0/index.js:102:10)
    at async Object.withTrace (/Users/eladb/code/wing2/libs/wingsdk/lib/testing/simulator.js:72:38)
    at async TestRunnerClient.runTest (/Users/eladb/code/wing2/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
    at async testSimulator (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:199:22)
    at async testOne (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:114:20)
    at async test (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:55:29)
 
 
Tests 1 passed (1)
Test Files 1 passed (1)
Duration <DURATION>
```

