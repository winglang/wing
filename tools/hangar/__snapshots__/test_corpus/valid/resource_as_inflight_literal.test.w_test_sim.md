# [resource_as_inflight_literal.test.w](../../../../../examples/tests/valid/resource_as_inflight_literal.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] test » root/env0/Function
root/env0/Function started

[<TIMESTAMP>] [VERBOSE] test » root/env0/test:test/Handler
root/env0/test:test/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] test » root/env0/Function
Bundled code (571 bytes).

[<TIMESTAMP>] [VERBOSE] test » root/env0/test:test/Handler
Bundled code (1189 bytes).

[<TIMESTAMP>] [VERBOSE] test » root/env0/test:test/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] test » root/env0/test:test/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] test » root/env0/Function
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] test » root/env0/Function
Sent a message to the sandbox: {"fn":"handler","args":["test"]}

[<TIMESTAMP>] [VERBOSE] test » root/env0/Function
Received a message from the sandbox: {"type":"ok","value":"hello world!"}

[<TIMESTAMP>] [VERBOSE] test » root/env0/Function
Invoke (payload="test").

[<TIMESTAMP>] [VERBOSE] test » root/env0/test:test/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] test » root/env0/test:test/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] test » root/env0/test:test/Handler
root/env0/test:test/Handler stopped

[<TIMESTAMP>] [VERBOSE] test » root/env0/Function
root/env0/Function stopped

pass ─ resource_as_inflight_literal.test.wsim » root/env0/test:test

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] test » root/env0/test:test/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] test » root/env0/Function
Sandbox child process stopped.

```

