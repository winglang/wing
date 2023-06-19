# [inflight_class_inner_capture_mutable.w](../../../../../examples/tests/valid/inflight_class_inner_capture_mutable.w) | test | sim

## stdout.log
```log
=====================================================================
$Closure1
---------------------------------------------------------------------

=====================================================================
Inner
---------------------------------------------------------------------

fail ┌ inflight_class_inner_capture_mutable.wsim » root/env0/test:inner inflight class capture immutable
     │ ReferenceError: y is not defined
     │     at Inner.dang (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-5RvtcN/index.js:12:11)
     │     at $Closure1.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-5RvtcN/index.js:41:34)
     │     at exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-5RvtcN/index.js:75:9)
     │     at async Object.withTrace (/Users/eladb/code/wing/libs/wingsdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/Users/eladb/code/wing/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:199:22)
     │     at async testOne (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:114:20)
     └     at async test (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:55:29)
ReferenceError: y is not defined
    at Inner.dang (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-5RvtcN/index.js:12:11)
    at $Closure1.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-5RvtcN/index.js:41:34)
    at exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-5RvtcN/index.js:75:9)
    at async Object.withTrace (/Users/eladb/code/wing/libs/wingsdk/lib/testing/simulator.js:72:38)
    at async TestRunnerClient.runTest (/Users/eladb/code/wing/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
    at async testSimulator (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:199:22)
    at async testOne (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:114:20)
    at async test (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:55:29)
 




Tests 1 failed (1) 
Duration <DURATION>

```

