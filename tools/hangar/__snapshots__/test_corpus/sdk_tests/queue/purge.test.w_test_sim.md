# [purge.test.w](../../../../../../examples/tests/sdk_tests/queue/purge.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] purge » root/env0/Queue
root/env0/Queue started

[<TIMESTAMP>] [VERBOSE] purge » root/env0/test:purge/Handler
root/env0/test:purge/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] purge » root/env0/Queue/Policy
root/env0/Queue/Policy started

[<TIMESTAMP>] [VERBOSE] purge » root/env0/test:purge/Handler
Bundled code (1439 bytes).

[<TIMESTAMP>] [VERBOSE] purge » root/env0/test:purge/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] purge » root/env0/test:purge/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] purge » root/env0/Queue
Push (messages=foo).

[<TIMESTAMP>] [VERBOSE] purge » root/env0/Queue
Push (messages=bar).

[<TIMESTAMP>] [VERBOSE] purge » root/env0/Queue
Push (messages=baz).

[<TIMESTAMP>] [VERBOSE] purge » root/env0/Queue
ApproxSize ().

[<TIMESTAMP>] [VERBOSE] purge » root/env0/Queue
Purge ().

[<TIMESTAMP>] [VERBOSE] purge » root/env0/Queue
ApproxSize ().

[<TIMESTAMP>] [VERBOSE] purge » root/env0/test:purge/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] purge » root/env0/test:purge/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] purge » root/env0/test:purge/Handler
root/env0/test:purge/Handler stopped

[<TIMESTAMP>] [VERBOSE] purge » root/env0/Queue/Policy
root/env0/Queue/Policy stopped

[<TIMESTAMP>] [VERBOSE] purge » root/env0/Queue
root/env0/Queue stopped

pass ─ purge.test.wsim » root/env0/test:purge

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] purge » root/env0/test:purge/Handler
Sandbox child process stopped.

```

