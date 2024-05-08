# [call_static_of_myself.test.w](../../../../../examples/tests/valid/call_static_of_myself.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] test » root/env0/test:test/Handler
root/env0/test:test/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] test » root/env0/test:test/Handler
Bundled code (1380 bytes).

[<TIMESTAMP>] [VERBOSE] test » root/env0/test:test/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] test » root/env0/test:test/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] test » root/env0/test:test/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] test » root/env0/test:test/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] test » root/env0/test:test/Handler
root/env0/test:test/Handler stopped

pass ─ call_static_of_myself.test.wsim » root/env0/test:test

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] test » root/env0/test:test/Handler
Sandbox child process stopped.

```

