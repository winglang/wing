# [assert.test.w](../../../../../examples/tests/valid/assert.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] assert works inflight » root/env0/test:assert works inflight/Handler
root/env0/test:assert works inflight/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] assert works inflight » root/env0/test:assert works inflight/Handler
Bundled code (615 bytes).

[<TIMESTAMP>] [VERBOSE] assert works inflight » root/env0/test:assert works inflight/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] assert works inflight » root/env0/test:assert works inflight/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] assert works inflight » root/env0/test:assert works inflight/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] assert works inflight » root/env0/test:assert works inflight/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] assert works inflight » root/env0/test:assert works inflight/Handler
root/env0/test:assert works inflight/Handler stopped

pass ─ assert.test.wsim » root/env0/test:assert works inflight

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] assert works inflight » root/env0/test:assert works inflight/Handler
Sandbox child process stopped.

```

