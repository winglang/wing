# [stateful.test.w](../../../../../../examples/tests/sdk_tests/service/stateful.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] service is ready only after onStart finishes » root/env0/MyService/Bucket
root/env0/MyService/Bucket started

[<TIMESTAMP>] [VERBOSE] service is ready only after onStart finishes » root/env0/test:service is ready only after onStart finishes/Handler
root/env0/test:service is ready only after onStart finishes/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] service is ready only after onStart finishes » root/env0/MyService/Bucket/Policy
root/env0/MyService/Bucket/Policy started

[<TIMESTAMP>] [VERBOSE] service is ready only after onStart finishes » root/env0/test:service is ready only after onStart finishes/Handler
Bundled code (1816 bytes).

[<TIMESTAMP>] [VERBOSE] service is ready only after onStart finishes » root/env0/MyService/Service
Bundled code (1857 bytes).

[<TIMESTAMP>] [VERBOSE] service is ready only after onStart finishes » root/env0/MyService/Service
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] service is ready only after onStart finishes » root/env0/MyService/Service
Sent a message to the sandbox: {"fn":"start","args":[]}

[<TIMESTAMP>] [INFO] service is ready only after onStart finishes » root/env0/MyService/Service
starting service

[<TIMESTAMP>] [VERBOSE] service is ready only after onStart finishes » root/env0/MyService/Bucket
Put (key=ready).

[<TIMESTAMP>] [VERBOSE] service is ready only after onStart finishes » root/env0/MyService/Service
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] service is ready only after onStart finishes » root/env0/MyService/Service
root/env0/MyService/Service started

[<TIMESTAMP>] [VERBOSE] service is ready only after onStart finishes » root/env0/test:service is ready only after onStart finishes/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] service is ready only after onStart finishes » root/env0/test:service is ready only after onStart finishes/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] service is ready only after onStart finishes » root/env0/MyService/Bucket
Get (key=ready).

[<TIMESTAMP>] [VERBOSE] service is ready only after onStart finishes » root/env0/test:service is ready only after onStart finishes/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] service is ready only after onStart finishes » root/env0/test:service is ready only after onStart finishes/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] service is ready only after onStart finishes » root/env0/test:service is ready only after onStart finishes/Handler
root/env0/test:service is ready only after onStart finishes/Handler stopped

[<TIMESTAMP>] [VERBOSE] service is ready only after onStart finishes » root/env0/MyService/Bucket/Policy
root/env0/MyService/Bucket/Policy stopped

[<TIMESTAMP>] [VERBOSE] service is ready only after onStart finishes » root/env0/MyService/Service
Sent a message to the sandbox: {"fn":"stop","args":[]}

[<TIMESTAMP>] [INFO] service is ready only after onStart finishes » root/env0/MyService/Service
stopping service

[<TIMESTAMP>] [INFO] service is ready only after onStart finishes » root/env0/MyService/Service
state is: 456

[<TIMESTAMP>] [VERBOSE] service is ready only after onStart finishes » root/env0/MyService/Service
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] service is ready only after onStart finishes » root/env0/MyService/Service
root/env0/MyService/Service stopped

[<TIMESTAMP>] [VERBOSE] service is ready only after onStart finishes » root/env0/MyService/Bucket
root/env0/MyService/Bucket stopped

pass ─ stateful.test.wsim » root/env0/test:service is ready only after onStart finishes

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] service is ready only after onStart finishes » root/env0/MyService/Service
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] service is ready only after onStart finishes » root/env0/test:service is ready only after onStart finishes/Handler
Sandbox child process stopped.

```

