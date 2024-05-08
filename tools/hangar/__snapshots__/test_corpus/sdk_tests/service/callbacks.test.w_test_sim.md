# [callbacks.test.w](../../../../../../examples/tests/sdk_tests/service/callbacks.test.w) | test | sim

## stdout.log
```log
[ERROR] start() calls onStart() idempotently | Error: Cannot access context during class construction
[ERROR] stop() calls onStop() | Error: Cannot access context during class construction
[ERROR] does not start automatically if autoStart is false | Error: Cannot access context during class construction
pass ─ callbacks.test.wsim » root/env0/test:does not start automatically if autoStart is false
pass ─ callbacks.test.wsim » root/env1/test:start() calls onStart() idempotently              
pass ─ callbacks.test.wsim » root/env2/test:stop() calls onStop()                             

Tests 3 passed (3)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

