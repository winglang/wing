# [resource_captures.w](../../../../../examples/tests/valid/resource_captures.w) | test | sim

## stdout.log
```log
fail ┌ resource_captures.wsim » root/env0/test:test
     │ array.len=3
     │ Error: assertion failed: '((this.mapOfNum)["k1"] === 11)'
     │     at /var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-gQWVOz/index.js:101:23
     │     at MyResource.testCaptureCollectionsOfData (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-gQWVOz/index.js:102:15)
     │     at async $Closure1.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-gQWVOz/index.js:20:11)
     │     at async exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-gQWVOz/index.js:311:10)
     │     at async Object.withTrace (/Users/eladb/code/wing/libs/wingsdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/Users/eladb/code/wing/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:199:22)
     │     at async testOne (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:114:20)
     └     at async test (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:55:29)
Error: assertion failed: '((this.mapOfNum)["k1"] === 11)'
    at /var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-gQWVOz/index.js:101:23
    at MyResource.testCaptureCollectionsOfData (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-gQWVOz/index.js:102:15)
    at async $Closure1.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-gQWVOz/index.js:20:11)
    at async exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-gQWVOz/index.js:311:10)
    at async Object.withTrace (/Users/eladb/code/wing/libs/wingsdk/lib/testing/simulator.js:72:38)
    at async TestRunnerClient.runTest (/Users/eladb/code/wing/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
    at async testSimulator (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:199:22)
    at async testOne (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:114:20)
    at async test (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:55:29)
 




Tests 1 failed (1) 
Duration <DURATION>

```

