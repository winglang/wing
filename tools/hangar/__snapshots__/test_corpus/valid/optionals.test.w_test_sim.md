# [optionals.test.w](../../../../../examples/tests/valid/optionals.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] t » root/env0/orange bucket
root/env0/orange bucket started

[<TIMESTAMP>] [VERBOSE] t » root/env0/test:t/Handler
root/env0/test:t/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] t » root/env0/orange bucket/Policy
root/env0/orange bucket/Policy started

[<TIMESTAMP>] [VERBOSE] t » root/env0/test:t/Handler
Bundled code (1292 bytes).

[<TIMESTAMP>] [VERBOSE] t » root/env0/test:t/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] t » root/env0/test:t/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] t » root/env0/orange bucket
Put (key=x.txt).

[<TIMESTAMP>] [VERBOSE] t » root/env0/test:t/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] t » root/env0/test:t/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] t » root/env0/test:t/Handler
root/env0/test:t/Handler stopped

[<TIMESTAMP>] [VERBOSE] t » root/env0/orange bucket/Policy
root/env0/orange bucket/Policy stopped

[<TIMESTAMP>] [VERBOSE] t » root/env0/orange bucket
root/env0/orange bucket stopped

pass ─ optionals.test.wsim » root/env0/test:t

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] t » root/env0/test:t/Handler
Sandbox child process stopped.

```

