# [resource_captures_globals.w](../../../../../examples/tests/valid/resource_captures_globals.w) | test | sim

## stdout.log
```log
pass ─ resource_captures_globals.wsim » root/env0/test:test                                             
fail ┌ resource_captures_globals.wsim » root/env1/test:access cloud resource through static methods only
     │ Error: Missing environment variable: COUNTER_HANDLE_c7ceac93
     │     at /var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-XQBbF9/index.js:66:19
     │     at /var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-XQBbF9/index.js:69:10
     │     at exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-XQBbF9/index.js:76:5)
     │     at /var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-XQBbF9/index.js:79:9
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
 
 
Tests 1 failed | 1 passed (2)
Test Files 1 failed (1)
Duration <DURATION>
```

