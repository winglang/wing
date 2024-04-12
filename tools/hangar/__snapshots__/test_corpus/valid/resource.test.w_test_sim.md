# [resource.test.w](../../../../../examples/tests/valid/resource.test.w) | test | sim

## stdout.log
```log
[INFO] test | counter is: 201
[ERROR] dependency cycles | InvokeAsync (payload="foo") failure. Error: Process exited with code null, signal SIGTERM
pass ─ resource.test.wsim » root/env0/test:test             
pass ─ resource.test.wsim » root/env1/test:dependency cycles

Tests 2 passed (2)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

