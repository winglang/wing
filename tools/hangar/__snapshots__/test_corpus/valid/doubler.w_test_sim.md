# [doubler.w](../../../../../examples/tests/valid/doubler.w) | test | sim

## stdout.log
```log
fail ┌ doubler.wsim » root/env0/test:f(2) == 8
     │ ReferenceError: handler is not defined
     │     at $Closure2.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-jO9ulJ/index.js:25:21)
     │     at exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-jO9ulJ/index.js:1854:9)
     │     at async Object.withTrace (/Users/eladb/code/wing2/libs/wingsdk/lib/testing/simulator.js:72:38)
     │     at async $Closure4.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-tn10IG/index.js:14:26)
     │     at async exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-tn10IG/index.js:35:10)
     │     at async Object.withTrace (/Users/eladb/code/wing2/libs/wingsdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/Users/eladb/code/wing2/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:199:22)
     │     at async testOne (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:114:20)
     └     at async test (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:55:29)
ReferenceError: handler is not defined
    at $Closure2.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-jO9ulJ/index.js:25:21)
    at exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-jO9ulJ/index.js:1854:9)
    at async Object.withTrace (/Users/eladb/code/wing2/libs/wingsdk/lib/testing/simulator.js:72:38)
    at async $Closure4.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-tn10IG/index.js:14:26)
    at async exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-tn10IG/index.js:35:10)
    at async Object.withTrace (/Users/eladb/code/wing2/libs/wingsdk/lib/testing/simulator.js:72:38)
    at async TestRunnerClient.runTest (/Users/eladb/code/wing2/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
    at async testSimulator (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:199:22)
    at async testOne (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:114:20)
    at async test (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:55:29)
 
 
Tests 1 passed (1)
Test Files 1 passed (1)
Duration <DURATION>
```

