# [file_counter.test.w](../../../../../examples/tests/valid/file_counter.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Bucket
root/env0/Bucket started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Bucket/Policy
root/env0/Bucket/Policy started

[<TIMESTAMP>] [INFO] (no test) » root/env0/Counter/Resource
Bundled code (2407 bytes).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"start","args":["<ABSOLUTE>/c811d52b4378afd7a5c09fd79c89f55d0bf9685446"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":{}}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
root/env0/Counter/Resource started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Queue/SetConsumer0
root/env0/Queue/SetConsumer0 started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Queue
root/env0/Queue started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Queue/Policy
root/env0/Queue/Policy started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Queue/SetConsumer0
Bundled code (2906 bytes).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Queue/QueueEventMapping0
root/env0/Queue/QueueEventMapping0 started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Bucket/Policy
root/env0/Bucket/Policy stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Queue/QueueEventMapping0
root/env0/Queue/QueueEventMapping0 stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Queue/Policy
root/env0/Queue/Policy stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Queue/SetConsumer0
root/env0/Queue/SetConsumer0 stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Bucket
root/env0/Bucket stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"stop","args":[]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
root/env0/Counter/Resource stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Queue
root/env0/Queue stopped

pass ─ file_counter.test.wsim (no tests)

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

