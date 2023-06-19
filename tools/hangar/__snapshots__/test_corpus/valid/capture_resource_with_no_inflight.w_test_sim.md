# [capture_resource_with_no_inflight.w](../../../../../examples/tests/valid/capture_resource_with_no_inflight.w) | test | sim

## stdout.log
```log
=====================================================================
A
---------------------------------------------------------------------

=====================================================================
$Closure1
---------------------------------------------------------------------
Variables:
  handle():
    a => [field]

fail ┌ capture_resource_with_no_inflight.wsim » root/env0/test:test
     │ Error: assertion failed: '("hey" === a.field)'
     │     at /var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-PpFUm9/index.js:20:23
     │     at $Closure1.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-PpFUm9/index.js:21:15)
     │     at exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-PpFUm9/index.js:65:9)
     │     at async Object.withTrace (/Users/eladb/code/wing/libs/wingsdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/Users/eladb/code/wing/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:199:22)
     │     at async testOne (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:114:20)
     └     at async test (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:55:29)
Error: assertion failed: '("hey" === a.field)'
    at /var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-PpFUm9/index.js:20:23
    at $Closure1.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-PpFUm9/index.js:21:15)
    at exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-PpFUm9/index.js:65:9)
    at async Object.withTrace (/Users/eladb/code/wing/libs/wingsdk/lib/testing/simulator.js:72:38)
    at async TestRunnerClient.runTest (/Users/eladb/code/wing/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
    at async testSimulator (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:199:22)
    at async testOne (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:114:20)
    at async test (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:55:29)
 




Tests 1 failed (1) 
Duration <DURATION>

```

