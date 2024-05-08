# [minimal.test.w](../../../../../../examples/tests/sdk_tests/service/minimal.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] start and stop » root/env0/Service
Bundled code (913 bytes).

[<TIMESTAMP>] [VERBOSE] start and stop » root/env0/Service
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] start and stop » root/env0/Service
Sent a message to the sandbox: {"fn":"start","args":[]}

[<TIMESTAMP>] [INFO] start and stop » root/env0/Service
hello, service!

[<TIMESTAMP>] [VERBOSE] start and stop » root/env0/Service
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] start and stop » root/env0/Service
root/env0/Service started

[<TIMESTAMP>] [VERBOSE] start and stop » root/env0/test:start and stop/Handler
root/env0/test:start and stop/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] start and stop » root/env0/test:start and stop/Handler
Bundled code (1201 bytes).

[<TIMESTAMP>] [VERBOSE] start and stop » root/env0/test:start and stop/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] start and stop » root/env0/test:start and stop/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] start and stop » root/env0/Service
Sent a message to the sandbox: {"fn":"stop","args":[]}

[<TIMESTAMP>] [INFO] start and stop » root/env0/Service
stopping!

[<TIMESTAMP>] [VERBOSE] start and stop » root/env0/Service
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] start and stop » root/env0/test:start and stop/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] start and stop » root/env0/test:start and stop/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] start and stop » root/env0/Service
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] start and stop » root/env0/test:start and stop/Handler
root/env0/test:start and stop/Handler stopped

[<TIMESTAMP>] [VERBOSE] start and stop » root/env0/Service
root/env0/Service stopped

pass ─ minimal.test.wsim » root/env0/test:start and stop

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] start and stop » root/env0/test:start and stop/Handler
Sandbox child process stopped.

```

