# [inflight_class_definitions.w](../../../../../examples/tests/valid/inflight_class_definitions.w) | test | sim

## stdout.log
```log
fail ┌ inflight_class_definitions.wsim » root/env0/test:test
     │ ReferenceError: fn is not defined
     │     at $Closure3.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-c9GRAd/index.js:29:11)
     │     at async exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-c9GRAd/index.js:106:10)
     │     at async Object.withTrace (/Users/eladb/code/wing2/libs/wingsdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/Users/eladb/code/wing2/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:199:22)
     │     at async testOne (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:114:20)
     └     at async test (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:55:29)
ReferenceError: fn is not defined
    at $Closure3.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-c9GRAd/index.js:29:11)
    at async exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-c9GRAd/index.js:106:10)
    at async Object.withTrace (/Users/eladb/code/wing2/libs/wingsdk/lib/testing/simulator.js:72:38)
    at async TestRunnerClient.runTest (/Users/eladb/code/wing2/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
    at async testSimulator (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:199:22)
    at async testOne (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:114:20)
    at async test (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:55:29)
 
 
Tests 1 passed (1)
Test Files 1 passed (1)
Duration <DURATION>
```

