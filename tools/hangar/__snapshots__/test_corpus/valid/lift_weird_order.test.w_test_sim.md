# [lift_weird_order.test.w](../../../../../examples/tests/valid/lift_weird_order.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] something » root/env0/test:something/Handler
root/env0/test:something/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] something » root/env0/test:something/Handler
Bundled code (1841 bytes).

[<TIMESTAMP>] [VERBOSE] something » root/env0/test:something/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] something » root/env0/test:something/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] something » root/env0/test:something/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] something » root/env0/test:something/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] something » root/env0/test:something/Handler
root/env0/test:something/Handler stopped

pass ─ lift_weird_order.test.wsim » root/env0/test:something

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] something » root/env0/test:something/Handler
Sandbox child process stopped.

```

