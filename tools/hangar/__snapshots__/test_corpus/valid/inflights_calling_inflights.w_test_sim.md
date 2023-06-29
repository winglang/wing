# [inflights_calling_inflights.w](../../../../../examples/tests/valid/inflights_calling_inflights.w) | test | sim

## stdout.log
```log
fail ┌ inflights_calling_inflights.wsim » root/env0/test:inflights can call other inflights 
     │ Error: Missing environment variable: BUCKET_HANDLE_ed7b9545
     │     at /var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-kn28du/index.js:51:21
     │     at /var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-kn28du/index.js:54:12
     │     at /var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-kn28du/index.js:60:9
     │     at exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-kn28du/index.js:66:5)
     │     at /var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-kn28du/index.js:69:9
     │     at Script.runInContext (node:vm:141:12)
     │     at Object.runInContext (node:vm:297:6)
     │     at /Users/eladb/code/wing2/libs/wingsdk/lib/target-sim/function.inflight.js:143:12
     │     at new Promise (<anonymous>)
     │     at runSandbox (/Users/eladb/code/wing2/libs/wingsdk/lib/target-sim/function.inflight.js:119:12)
     │     at async Object.withTrace (/Users/eladb/code/wing2/libs/wingsdk/lib/testing/simulator.js:72:38)
     │     at async $Closure3.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-Aw3GgM/index.js:12:11)
     │     at async exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-Aw3GgM/index.js:33:10)
     │     at async Object.withTrace (/Users/eladb/code/wing2/libs/wingsdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/Users/eladb/code/wing2/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:199:22)
     │     at async testOne (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:114:20)
     └     at async test (/Users/eladb/code/wing2/apps/wing/dist/commands/test.js:55:39)
fail ┌ inflights_calling_inflights.wsim » root/env1/test:variable can be an inflight closure
     │ Error: Missing environment variable: BUCKET_HANDLE_3760aa76
     │     at /var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-ZqVfqx/index.js:77:25
     │     at /var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-ZqVfqx/index.js:80:16
     │     at /var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-ZqVfqx/index.js:86:13
     │     at /var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-ZqVfqx/index.js:92:9
     │     at exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-ZqVfqx/index.js:98:5)
     │     at /var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-ZqVfqx/index.js:101:9
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
 
 
Tests 2 failed (2)
Test Files 1 failed (1)
Duration <DURATION>
```

