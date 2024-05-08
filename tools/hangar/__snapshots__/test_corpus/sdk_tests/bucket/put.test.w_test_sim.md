# [put.test.w](../../../../../../examples/tests/sdk_tests/bucket/put.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] put » root/env0/Bucket
root/env0/Bucket started

[<TIMESTAMP>] [VERBOSE] put » root/env0/test:put/Handler
root/env0/test:put/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] put » root/env0/Bucket/Policy
root/env0/Bucket/Policy started

[<TIMESTAMP>] [VERBOSE] put » root/env0/test:put/Handler
Bundled code (1170 bytes).

[<TIMESTAMP>] [VERBOSE] put » root/env0/test:put/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] put » root/env0/test:put/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] put » root/env0/Bucket
Put (key=test1.txt).

[<TIMESTAMP>] [VERBOSE] put » root/env0/Bucket
Put (key=test2.txt).

[<TIMESTAMP>] [VERBOSE] put » root/env0/Bucket
Get (key=test1.txt).

[<TIMESTAMP>] [VERBOSE] put » root/env0/Bucket
Get (key=test2.txt).

[<TIMESTAMP>] [VERBOSE] put » root/env0/Bucket
Delete (key=test1.txt).

[<TIMESTAMP>] [VERBOSE] put » root/env0/Bucket
List (prefix=null).

[<TIMESTAMP>] [VERBOSE] put » root/env0/Bucket
Put (key=test2.txt).

[<TIMESTAMP>] [VERBOSE] put » root/env0/Bucket
Get (key=test2.txt).

[<TIMESTAMP>] [VERBOSE] put » root/env0/test:put/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] put » root/env0/test:put/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] put » root/env0/test:put/Handler
root/env0/test:put/Handler stopped

[<TIMESTAMP>] [VERBOSE] put » root/env0/Bucket/Policy
root/env0/Bucket/Policy stopped

[<TIMESTAMP>] [VERBOSE] put » root/env0/test:put/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] put » root/env0/Bucket
root/env0/Bucket stopped

pass ─ put.test.wsim » root/env0/test:put

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

