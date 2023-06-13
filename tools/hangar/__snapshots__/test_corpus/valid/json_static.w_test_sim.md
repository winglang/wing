# [json_static.w](../../../../../examples/tests/valid/json_static.w) | test | sim

## stdout.log
```log
pass ─ json_static.wsim » root/env1/test:has key or not             
fail ┌ json_static.wsim » root/env0/test:Access Json static inflight
     │ Error: assertion failed: '(ss === "{"a":123,"b":{"c":456,"d":789}}")'
     │     at /var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-l4BJJR/index.js:25:23
     │     at $Closure1.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-l4BJJR/index.js:26:15)
     │     at exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-l4BJJR/index.js:1769:9)
     │     at async Object.withTrace (/Users/eladb/code/wing/libs/wingsdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/Users/eladb/code/wing/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:199:22)
     │     at async testOne (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:114:20)
     └     at async test (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:55:29)

Error: assertion failed: '(ss === "{"a":123,"b":{"c":456,"d":789}}")'
    at /var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-l4BJJR/index.js:25:23
    at $Closure1.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-l4BJJR/index.js:26:15)
    at exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-l4BJJR/index.js:1769:9)
    at async Object.withTrace (/Users/eladb/code/wing/libs/wingsdk/lib/testing/simulator.js:72:38)
    at async TestRunnerClient.runTest (/Users/eladb/code/wing/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
    at async testSimulator (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:199:22)
    at async testOne (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:114:20)
    at async test (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:55:29)
 




Tests 1 failed (1) 
Duration <DURATION>

```

