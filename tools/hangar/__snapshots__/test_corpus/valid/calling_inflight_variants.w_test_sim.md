# [calling_inflight_variants.w](../../../../../examples/tests/valid/calling_inflight_variants.w) | test | sim

## stdout.log
```log
fail ┌ calling_inflight_variants.wsim » root/env0/test:calling different types of inflights
     │ TypeError: this.inflight1 is not a function
     │     at Foo.callFn2 (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-8PH7Ak/index.js:70:34)
     │     at $Closure2.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-8PH7Ak/index.js:28:22)
     │     at async exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-8PH7Ak/index.js:117:10)
     │     at async Object.withTrace (/Users/eladb/code/wing2/libs/wingsdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/Users/eladb/code/wing2/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:199:22)
     │     at async testOne (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:114:20)
     └     at async test (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:55:29)
TypeError: this.inflight1 is not a function
    at Foo.callFn2 (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-8PH7Ak/index.js:70:34)
    at $Closure2.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-8PH7Ak/index.js:28:22)
    at async exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-8PH7Ak/index.js:117:10)
    at async Object.withTrace (/Users/eladb/code/wing2/libs/wingsdk/lib/testing/simulator.js:72:38)
    at async TestRunnerClient.runTest (/Users/eladb/code/wing2/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
    at async testSimulator (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:199:22)
    at async testOne (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:114:20)
    at async test (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:55:29)
 




Tests 1 failed (1) 
Duration <DURATION>

```

