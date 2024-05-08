# [print.test.w](../../../../../examples/tests/valid/print.test.w) | test | sim

## stdout.log
```log
preflight log
preflight log
[<TIMESTAMP>] [VERBOSE] log1 » root/env0/test:log1/Handler
root/env0/test:log1/Handler started

[<TIMESTAMP>] [VERBOSE] log2 » root/env1/test:log2/Handler
root/env1/test:log2/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] log1 » root/env0/test:log1/Handler
Bundled code (566 bytes).

[<TIMESTAMP>] [VERBOSE] log2 » root/env1/test:log2/Handler
Bundled code (566 bytes).

[<TIMESTAMP>] [VERBOSE] log1 » root/env0/test:log1/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] log1 » root/env0/test:log1/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [INFO] log1 » root/env0/test:log1/Handler
inflight log 1.1

[<TIMESTAMP>] [INFO] log1 » root/env0/test:log1/Handler
inflight log 1.2

[<TIMESTAMP>] [VERBOSE] log1 » root/env0/test:log1/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] log1 » root/env0/test:log1/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] log2 » root/env1/test:log2/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] log2 » root/env1/test:log2/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [INFO] log2 » root/env1/test:log2/Handler
inflight log 2.1

[<TIMESTAMP>] [INFO] log2 » root/env1/test:log2/Handler
inflight log 2.2

[<TIMESTAMP>] [VERBOSE] log2 » root/env1/test:log2/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] log2 » root/env1/test:log2/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] log1 » root/env0/test:log1/Handler
root/env0/test:log1/Handler stopped

[<TIMESTAMP>] [VERBOSE] log2 » root/env1/test:log2/Handler
root/env1/test:log2/Handler stopped

pass ─ print.test.wsim » root/env0/test:log1
pass ─ print.test.wsim » root/env1/test:log2

Tests 2 passed (2)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] log1 » root/env0/test:log1/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] log2 » root/env1/test:log2/Handler
Sandbox child process stopped.

```

