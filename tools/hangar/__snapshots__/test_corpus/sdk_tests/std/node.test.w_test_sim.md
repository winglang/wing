# [node.test.w](../../../../../../examples/tests/sdk_tests/std/node.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] singleton » root/env0/SingletonBucket
root/env0/SingletonBucket started

[<TIMESTAMP>] [VERBOSE] singleton » root/env0/test:singleton/Handler
root/env0/test:singleton/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] singleton » root/env0/test:singleton/Handler
Bundled code (1909 bytes).

[<TIMESTAMP>] [VERBOSE] singleton » root/env0/Bucket
root/env0/Bucket started

[<TIMESTAMP>] [VERBOSE] singleton » root/env0/Bucket/Policy
root/env0/Bucket/Policy started

[<TIMESTAMP>] [VERBOSE] singleton » root/env0/q1
root/env0/q1 started

[<TIMESTAMP>] [VERBOSE] singleton » root/env0/q1/Policy
root/env0/q1/Policy started

[<TIMESTAMP>] [VERBOSE] singleton » root/env0/q2
root/env0/q2 started

[<TIMESTAMP>] [VERBOSE] singleton » root/env0/q2/Policy
root/env0/q2/Policy started

[<TIMESTAMP>] [VERBOSE] singleton » root/env0/SingletonBucket/Policy
root/env0/SingletonBucket/Policy started

[<TIMESTAMP>] [VERBOSE] singleton » root/env0/test:singleton/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] singleton » root/env0/test:singleton/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] singleton » root/env0/SingletonBucket
Put (key=hello).

[<TIMESTAMP>] [VERBOSE] singleton » root/env0/SingletonBucket
Get (key=hello).

[<TIMESTAMP>] [VERBOSE] singleton » root/env0/test:singleton/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] singleton » root/env0/test:singleton/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] singleton » root/env0/test:singleton/Handler
root/env0/test:singleton/Handler stopped

[<TIMESTAMP>] [VERBOSE] singleton » root/env0/SingletonBucket/Policy
root/env0/SingletonBucket/Policy stopped

[<TIMESTAMP>] [VERBOSE] singleton » root/env0/SingletonBucket
root/env0/SingletonBucket stopped

[<TIMESTAMP>] [VERBOSE] singleton » root/env0/Bucket/Policy
root/env0/Bucket/Policy stopped

[<TIMESTAMP>] [VERBOSE] singleton » root/env0/Bucket
root/env0/Bucket stopped

[<TIMESTAMP>] [VERBOSE] singleton » root/env0/q1/Policy
root/env0/q1/Policy stopped

[<TIMESTAMP>] [VERBOSE] singleton » root/env0/test:singleton/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] singleton » root/env0/q1
root/env0/q1 stopped

[<TIMESTAMP>] [VERBOSE] singleton » root/env0/q2/Policy
root/env0/q2/Policy stopped

[<TIMESTAMP>] [VERBOSE] singleton » root/env0/q2
root/env0/q2 stopped

pass ─ node.test.wsim » root/env0/test:singleton

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

