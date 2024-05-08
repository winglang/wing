# [try_get.test.w](../../../../../../examples/tests/sdk_tests/bucket/try_get.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] tryGet » root/env0/Bucket
root/env0/Bucket started

[<TIMESTAMP>] [VERBOSE] tryGet » root/env0/test:tryGet/Handler
root/env0/test:tryGet/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] tryGet » root/env0/Bucket/Policy
root/env0/Bucket/Policy started

[<TIMESTAMP>] [VERBOSE] tryGet » root/env0/test:tryGet/Handler
Bundled code (1174 bytes).

[<TIMESTAMP>] [VERBOSE] tryGet » root/env0/test:tryGet/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] tryGet » root/env0/test:tryGet/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] tryGet » root/env0/Bucket
Put (key=test1.txt).

[<TIMESTAMP>] [VERBOSE] tryGet » root/env0/Bucket
Exists (key=test1.txt).

[<TIMESTAMP>] [VERBOSE] tryGet » root/env0/Bucket
Get (key=test1.txt).

[<TIMESTAMP>] [VERBOSE] tryGet » root/env0/Bucket
Exists (key=test2.txt).

[<TIMESTAMP>] [VERBOSE] tryGet » root/env0/Bucket
Put (key=test2.txt).

[<TIMESTAMP>] [VERBOSE] tryGet » root/env0/Bucket
Exists (key=test2.txt).

[<TIMESTAMP>] [VERBOSE] tryGet » root/env0/Bucket
Get (key=test2.txt).

[<TIMESTAMP>] [VERBOSE] tryGet » root/env0/Bucket
Delete (key=test1.txt).

[<TIMESTAMP>] [VERBOSE] tryGet » root/env0/Bucket
Exists (key=test1.txt).

[<TIMESTAMP>] [VERBOSE] tryGet » root/env0/test:tryGet/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] tryGet » root/env0/test:tryGet/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] tryGet » root/env0/test:tryGet/Handler
root/env0/test:tryGet/Handler stopped

[<TIMESTAMP>] [VERBOSE] tryGet » root/env0/Bucket/Policy
root/env0/Bucket/Policy stopped

[<TIMESTAMP>] [VERBOSE] tryGet » root/env0/Bucket
root/env0/Bucket stopped

pass ─ try_get.test.wsim » root/env0/test:tryGet

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] tryGet » root/env0/test:tryGet/Handler
Sandbox child process stopped.

```

