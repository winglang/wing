# [resource.test.w](../../../../../examples/tests/valid/resource.test.w) | test | sim

## stdout.log
```log
[INFO] test | counter is: 201
[ERROR] dependency cycles | Error: Subscriber error - returning 1 messages to queue: Resource "root/env1/BigPublisher/Queue" does not have permission to perform operation "invoke" on resource "root/env1/BigPublisher/Queue/Consumer0".
pass ─ resource.test.wsim » root/env0/test:test             
pass ─ resource.test.wsim » root/env1/test:dependency cycles

Tests 2 passed (2)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[WARNING] dependency cycles | 1 messages pushed back to queue after visibility timeout.
```

