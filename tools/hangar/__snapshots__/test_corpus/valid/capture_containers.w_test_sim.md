# [capture_containers.w](../../../../../examples/tests/valid/capture_containers.w) | test | sim

## stdout.log
```log
fail ┌ capture_containers.wsim » root/env0/test:capture_containers
     │ Error: assertion failed: '("world" in (myMap))'
     │     at /var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-PTdnf0/index.js:57:23
     │     at $Closure1.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-PTdnf0/index.js:58:15)
     │     at async exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-PTdnf0/index.js:90:10)
     │     at async Object.withTrace (/Users/eladb/code/wing/libs/wingsdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/Users/eladb/code/wing/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:199:22)
     │     at async testOne (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:114:20)
     └     at async test (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:55:29)
Error: assertion failed: '("world" in (myMap))'
    at /var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-PTdnf0/index.js:57:23
    at $Closure1.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-PTdnf0/index.js:58:15)
    at async exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-PTdnf0/index.js:90:10)
    at async Object.withTrace (/Users/eladb/code/wing/libs/wingsdk/lib/testing/simulator.js:72:38)
    at async TestRunnerClient.runTest (/Users/eladb/code/wing/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
    at async testSimulator (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:199:22)
    at async testOne (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:114:20)
    at async test (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:55:29)
 




Tests 1 failed (1) 
Duration <DURATION>

```

