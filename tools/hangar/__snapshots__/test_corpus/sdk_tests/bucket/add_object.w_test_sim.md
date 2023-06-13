# [add_object.w](../../../../../../examples/tests/sdk_tests/bucket/add_object.w) | test | sim

## stdout.log
```log
fail ┌ add_object.wsim » root/env0/test:addObject
     │ Error: assertion failed: '(((args) => { return JSON.stringify(args[0], null, args[1]) })([(await b.getJson("file1.json"))]) === ((args) => { return JSON.stringify(args[0], null, args[1]) })([jsonObj1]))'
     │     at /var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-NkSDb3/index.js:29:23
     │     at $Closure1.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-NkSDb3/index.js:30:15)
     │     at async exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-NkSDb3/index.js:1774:10)
     │     at async Object.withTrace (/Users/eladb/code/wing/libs/wingsdk/lib/testing/simulator.js:72:38)
     │     at async TestRunnerClient.runTest (/Users/eladb/code/wing/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:199:22)
     │     at async testOne (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:114:20)
     └     at async test (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:55:29)
Error: assertion failed: '(((args) => { return JSON.stringify(args[0], null, args[1]) })([(await b.getJson("file1.json"))]) === ((args) => { return JSON.stringify(args[0], null, args[1]) })([jsonObj1]))'
    at /var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-NkSDb3/index.js:29:23
    at $Closure1.handle (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-NkSDb3/index.js:30:15)
    at async exports.handler (/var/folders/vm/cm444l3124j_vh_8rkhz6kqm0000gn/T/wing-bundles-NkSDb3/index.js:1774:10)
    at async Object.withTrace (/Users/eladb/code/wing/libs/wingsdk/lib/testing/simulator.js:72:38)
    at async TestRunnerClient.runTest (/Users/eladb/code/wing/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
    at async testSimulator (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:199:22)
    at async testOne (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:114:20)
    at async test (/Users/eladb/code/wing/apps/wing/dist/commands/test.js:55:29)
 




Tests 1 failed (1) 
Duration <DURATION>

```

