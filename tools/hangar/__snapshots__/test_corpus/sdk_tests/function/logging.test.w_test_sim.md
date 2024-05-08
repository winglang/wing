# [logging.test.w](../../../../../../examples/tests/sdk_tests/function/logging.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] logging » root/env0/f1
root/env0/f1 started

[<TIMESTAMP>] [VERBOSE] logging » root/env0/f2
root/env0/f2 started

[<TIMESTAMP>] [VERBOSE] logging » root/env0/test:logging/Handler
root/env0/test:logging/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] logging » root/env0/f1
Bundled code (581 bytes).

[<TIMESTAMP>] [VERBOSE] logging » root/env0/f2
Bundled code (1181 bytes).

[<TIMESTAMP>] [VERBOSE] logging » root/env0/test:logging/Handler
Bundled code (1365 bytes).

[<TIMESTAMP>] [VERBOSE] logging » root/env0/test:logging/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] logging » root/env0/test:logging/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [INFO] logging » root/env0/test:logging/Handler
hello world

[<TIMESTAMP>] [VERBOSE] logging » root/env0/f2
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] logging » root/env0/f2
Sent a message to the sandbox: {"fn":"handler","args":[""]}

[<TIMESTAMP>] [VERBOSE] logging » root/env0/f1
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] logging » root/env0/f1
Sent a message to the sandbox: {"fn":"handler","args":[""]}

[<TIMESTAMP>] [INFO] logging » root/env0/f1
log inside f1

[<TIMESTAMP>] [VERBOSE] logging » root/env0/f1
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] logging » root/env0/f1
Invoke (payload="").

[<TIMESTAMP>] [INFO] logging » root/env0/f2
log inside f2

[<TIMESTAMP>] [VERBOSE] logging » root/env0/f1
Sent a message to the sandbox: {"fn":"handler","args":[""]}

[<TIMESTAMP>] [INFO] logging » root/env0/f1
log inside f1

[<TIMESTAMP>] [VERBOSE] logging » root/env0/f1
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] logging » root/env0/f1
Invoke (payload="").

[<TIMESTAMP>] [VERBOSE] logging » root/env0/f2
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] logging » root/env0/f2
Invoke (payload="").

[<TIMESTAMP>] [INFO] logging » root/env0/test:logging/Handler
hello world

[<TIMESTAMP>] [VERBOSE] logging » root/env0/f2
Sent a message to the sandbox: {"fn":"handler","args":[""]}

[<TIMESTAMP>] [VERBOSE] logging » root/env0/f1
Sent a message to the sandbox: {"fn":"handler","args":[""]}

[<TIMESTAMP>] [INFO] logging » root/env0/f1
log inside f1

[<TIMESTAMP>] [VERBOSE] logging » root/env0/f1
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] logging » root/env0/f1
Invoke (payload="").

[<TIMESTAMP>] [INFO] logging » root/env0/f2
log inside f2

[<TIMESTAMP>] [VERBOSE] logging » root/env0/f1
Sent a message to the sandbox: {"fn":"handler","args":[""]}

[<TIMESTAMP>] [INFO] logging » root/env0/f1
log inside f1

[<TIMESTAMP>] [VERBOSE] logging » root/env0/f1
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] logging » root/env0/f1
Invoke (payload="").

[<TIMESTAMP>] [VERBOSE] logging » root/env0/f2
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] logging » root/env0/f2
Invoke (payload="").

[<TIMESTAMP>] [VERBOSE] logging » root/env0/test:logging/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] logging » root/env0/test:logging/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] logging » root/env0/test:logging/Handler
root/env0/test:logging/Handler stopped

[<TIMESTAMP>] [VERBOSE] logging » root/env0/f2
root/env0/f2 stopped

[<TIMESTAMP>] [VERBOSE] logging » root/env0/f1
root/env0/f1 stopped

pass ─ logging.test.wsim » root/env0/test:logging

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] logging » root/env0/test:logging/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] logging » root/env0/f2
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] logging » root/env0/f1
Sandbox child process stopped.

```

