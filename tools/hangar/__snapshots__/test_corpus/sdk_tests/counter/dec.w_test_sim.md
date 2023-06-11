# [dec.w](../../../../../../examples/tests/sdk_tests/counter/dec.w) | test | sim

## stdout.log
```log
pass ─ dec.wsim » root/env0/test:dec    
fail ┌ dec.wsim » root/env1/test:key dec
     │ Error: assertion failed: '((await counter.peek(key)) === 1)'
     │     at /tmp/wing-bundles-ZC7cEz/index.js:23:23
     │     at $Closure2.handle (/tmp/wing-bundles-ZC7cEz/index.js:24:15)
     │     at async exports.handler (/tmp/wing-bundles-ZC7cEz/index.js:65:10)
     │     at async Object.withTrace (/home/marcio/code/wing/libs/wingsdk/lib/testing/simulator.js:71:38)
     │     at async TestRunnerClient.runTest (/home/marcio/code/wing/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
     │     at async testSimulator (/home/marcio/code/wing/apps/wing/dist/commands/test.js:199:22)
     │     at async testOne (/home/marcio/code/wing/apps/wing/dist/commands/test.js:114:20)
     └     at async test (/home/marcio/code/wing/apps/wing/dist/commands/test.js:55:29)

Error: assertion failed: '((await counter.peek(key)) === 1)'
    at /tmp/wing-bundles-ZC7cEz/index.js:23:23
    at $Closure2.handle (/tmp/wing-bundles-ZC7cEz/index.js:24:15)
    at async exports.handler (/tmp/wing-bundles-ZC7cEz/index.js:65:10)
    at async Object.withTrace (/home/marcio/code/wing/libs/wingsdk/lib/testing/simulator.js:71:38)
    at async TestRunnerClient.runTest (/home/marcio/code/wing/libs/wingsdk/lib/target-sim/test-runner.inflight.js:31:13)
    at async testSimulator (/home/marcio/code/wing/apps/wing/dist/commands/test.js:199:22)
    at async testOne (/home/marcio/code/wing/apps/wing/dist/commands/test.js:114:20)
    at async test (/home/marcio/code/wing/apps/wing/dist/commands/test.js:55:29)
 




Tests 1 failed (1) 
Duration <DURATION>

```

