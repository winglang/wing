# [inflight_class_as_struct_members.w](../../../../../examples/tests/valid/inflight_class_as_struct_members.w) | test | sim

## stdout.log
```log
fail ┌ inflight_class_as_struct_members.wsim » root/env0/test:test
     │ ReferenceError: getBar is not defined
     │     at $Closure2.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-iu3uFb/index.js:14:23)
     │     at exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-iu3uFb/index.js:41:9)
     │     at async Object.withTrace (/Users/eladb/code/wing2/libs/wingsdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/Users/eladb/code/wing2/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:199:22)
     │     at async testOne (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:114:20)
     └     at async test (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:55:29)
ReferenceError: getBar is not defined
    at $Closure2.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-iu3uFb/index.js:14:23)
    at exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-iu3uFb/index.js:41:9)
    at async Object.withTrace (/Users/eladb/code/wing2/libs/wingsdk/lib/testing/simulator.js:72:38)
    at async TestRunnerClient.runTest (/Users/eladb/code/wing2/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
    at async testSimulator (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:199:22)
    at async testOne (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:114:20)
    at async test (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:55:29)
 




Tests 1 failed (1) 
Duration <DURATION>

```

