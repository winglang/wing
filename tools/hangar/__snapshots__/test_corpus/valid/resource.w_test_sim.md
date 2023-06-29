# [resource.w](../../../../../examples/tests/valid/resource.w) | test | sim

## stdout.log
```log
pass ─ resource.wsim » root/env1/test:dependency cycles
fail ┌ resource.wsim » root/env0/test:test             
     │ Error: assertion failed: s == "counter is: 101"
     │     at /var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-2keFCZ/index.js:16:23
     │     at $Closure1.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-2keFCZ/index.js:17:15)
     │     at async exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-2keFCZ/index.js:124:10)
     │     at async Object.withTrace (/Users/eladb/code/wing2/libs/wingsdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/Users/eladb/code/wing2/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:199:22)
     │     at async testOne (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:114:20)
     └     at async test (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:55:39)
 
 
Tests 1 failed | 1 passed (2)
Test Files 1 failed (1)
Duration <DURATION>
```

