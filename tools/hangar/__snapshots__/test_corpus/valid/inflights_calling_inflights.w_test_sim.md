# [inflights_calling_inflights.w](../../../../../examples/tests/valid/inflights_calling_inflights.w) | test | sim

## stdout.log
```log
fail ┌ inflights_calling_inflights.wsim » root/env0/test:inflights can call other inflights 
     │ ReferenceError: storeInBucket is not defined
     │     at $Closure2.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-CiyyYm/index.js:14:11)
     │     at exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-CiyyYm/index.js:34:9)
     │     at async Object.withTrace (/Users/eladb/code/wing2/libs/wingsdk/lib/testing/simulator.js:72:38)
     │     at async $Closure3.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-leH7CJ/index.js:14:11)
     │     at async exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-leH7CJ/index.js:35:10)
     │     at async Object.withTrace (/Users/eladb/code/wing2/libs/wingsdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/Users/eladb/code/wing2/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:199:22)
     │     at async testOne (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:114:20)
     └     at async test (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:55:29)
fail ┌ inflights_calling_inflights.wsim » root/env1/test:variable can be an inflight closure
     │ TypeError: this.closure is not a function
     │     at MyResource.foo (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-VBOxM1/index.js:41:29)
     │     at $Closure5.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-VBOxM1/index.js:14:32)
     │     at exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-VBOxM1/index.js:66:9)
     │     at async Object.withTrace (/Users/eladb/code/wing2/libs/wingsdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/Users/eladb/code/wing2/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:199:22)
     │     at async testOne (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:114:20)
     └     at async test (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:55:29)
ReferenceError: storeInBucket is not defined
    at $Closure2.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-CiyyYm/index.js:14:11)
    at exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-CiyyYm/index.js:34:9)
    at async Object.withTrace (/Users/eladb/code/wing2/libs/wingsdk/lib/testing/simulator.js:72:38)
    at async $Closure3.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-leH7CJ/index.js:14:11)
    at async exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-leH7CJ/index.js:35:10)
    at async Object.withTrace (/Users/eladb/code/wing2/libs/wingsdk/lib/testing/simulator.js:72:38)
    at async TestRunnerClient.runTest (/Users/eladb/code/wing2/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
    at async testSimulator (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:199:22)
    at async testOne (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:114:20)
    at async test (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:55:29)
TypeError: this.closure is not a function
    at MyResource.foo (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-VBOxM1/index.js:41:29)
    at $Closure5.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-VBOxM1/index.js:14:32)
    at exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-VBOxM1/index.js:66:9)
    at async Object.withTrace (/Users/eladb/code/wing2/libs/wingsdk/lib/testing/simulator.js:72:38)
    at async TestRunnerClient.runTest (/Users/eladb/code/wing2/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
    at async testSimulator (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:199:22)
    at async testOne (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:114:20)
    at async test (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:55:29)
 




Tests 1 failed (1) 
Duration <DURATION>

```

