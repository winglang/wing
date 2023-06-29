# [events.w](../../../../../../examples/tests/sdk_tests/bucket/events.w) | test | sim

## stdout.log
```log
fail ┌ events.wsim » root/env0/hitCount is incremented according to the bucket event
     │ Error: Missing environment variable: TABLE_HANDLE_97affb47
     │     at /var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-MfA4BM/index.js:189:21
     │     at /var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-MfA4BM/index.js:192:12
     │     at /var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-MfA4BM/index.js:198:9
     │     at exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-MfA4BM/index.js:218:5)
     │     at /var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-MfA4BM/index.js:221:9
     │     at Script.runInContext (node:vm:141:12)
     │     at Object.runInContext (node:vm:297:6)
     │     at /Users/eladb/code/wing2/libs/wingsdk/lib/target-sim/function.inflight.js:143:12
     │     at new Promise (<anonymous>)
     │     at runSandbox (/Users/eladb/code/wing2/libs/wingsdk/lib/target-sim/function.inflight.js:119:12)
     │     at async Object.withTrace (/Users/eladb/code/wing2/libs/wingsdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/Users/eladb/code/wing2/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:199:22)
     │     at async testOne (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:114:20)
     └     at async test (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:55:39)
 
 
Tests 1 failed (1)
Test Files 1 failed (1)
Duration <DURATION>
```

