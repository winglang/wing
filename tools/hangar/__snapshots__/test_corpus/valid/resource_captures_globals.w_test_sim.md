# [resource_captures_globals.w](../../../../../examples/tests/valid/resource_captures_globals.w) | test | sim

## stdout.log
```log
pass ─ resource_captures_globals.wsim » root/env1/test:access cloud resource through static methods only
fail ┌ resource_captures_globals.wsim » root/env0/test:test                                             
     │ Error: assertion failed: '((globalMapOfNum)["a"] === (-5))'
     │     at /var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-E7YGGv/index.js:73:23
     │     at MyResource.myPut (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-E7YGGv/index.js:74:15)
     │     at async $Closure1.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-E7YGGv/index.js:19:11)
     │     at async exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-E7YGGv/index.js:162:10)
     │     at async Object.withTrace (/Users/eladb/code/wing/libs/wingsdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/Users/eladb/code/wing/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:199:22)
     │     at async testOne (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:114:20)
     └     at async test (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:55:29)

Error: assertion failed: '((globalMapOfNum)["a"] === (-5))'
    at /var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-E7YGGv/index.js:73:23
    at MyResource.myPut (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-E7YGGv/index.js:74:15)
    at async $Closure1.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-E7YGGv/index.js:19:11)
    at async exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-E7YGGv/index.js:162:10)
    at async Object.withTrace (/Users/eladb/code/wing/libs/wingsdk/lib/testing/simulator.js:72:38)
    at async TestRunnerClient.runTest (/Users/eladb/code/wing/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
    at async testSimulator (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:199:22)
    at async testOne (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:114:20)
    at async test (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:55:29)
 




Tests 1 failed (1) 
Duration <DURATION>

```

