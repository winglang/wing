# [capture_mutables.test.w](../../../../../examples/tests/valid/capture_mutables.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] main » root/env0/test:main/Handler
root/env0/test:main/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] main » root/env0/test:main/Handler
Bundled code (1151 bytes).

[<TIMESTAMP>] [VERBOSE] main » root/env0/test:main/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] main » root/env0/test:main/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] main » root/env0/test:main/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] main » root/env0/test:main/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] main » root/env0/test:main/Handler
root/env0/test:main/Handler stopped

pass ─ capture_mutables.test.wsim » root/env0/test:main

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] main » root/env0/test:main/Handler
Sandbox child process stopped.

```

