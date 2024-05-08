# [delete.test.w](../../../../../../examples/tests/sdk_tests/bucket/delete.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] delete » root/env0/Bucket
Adding object from preflight (key=file2.txt).

[<TIMESTAMP>] [VERBOSE] delete » root/env0/Bucket
root/env0/Bucket started

[<TIMESTAMP>] [VERBOSE] delete » root/env0/test:delete/Handler
root/env0/test:delete/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] delete » root/env0/Bucket/Policy
root/env0/Bucket/Policy started

[<TIMESTAMP>] [VERBOSE] delete » root/env0/test:delete/Handler
Bundled code (1173 bytes).

[<TIMESTAMP>] [VERBOSE] delete » root/env0/test:delete/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] delete » root/env0/test:delete/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] delete » root/env0/Bucket
Put Json (key=file1.json).

[<TIMESTAMP>] [VERBOSE] delete » root/env0/Bucket
Delete (key=file1.txt).

[<TIMESTAMP>] [VERBOSE] delete » root/env0/Bucket
Exists (key=file1.json).

[<TIMESTAMP>] [VERBOSE] delete » root/env0/Bucket
Exists (key=file2.txt).

[<TIMESTAMP>] [VERBOSE] delete » root/env0/Bucket
Delete (key=file1.json).

[<TIMESTAMP>] [VERBOSE] delete » root/env0/Bucket
Error: Object does not exist (key=file1.json). (Delete (key=file1.json).)

[<TIMESTAMP>] [VERBOSE] delete » root/env0/Bucket
Exists (key=file2.txt).

[<TIMESTAMP>] [VERBOSE] delete » root/env0/Bucket
Delete (key=file2.txt).

[<TIMESTAMP>] [VERBOSE] delete » root/env0/Bucket
Exists (key=file2.txt).

[<TIMESTAMP>] [VERBOSE] delete » root/env0/test:delete/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] delete » root/env0/test:delete/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] delete » root/env0/test:delete/Handler
root/env0/test:delete/Handler stopped

[<TIMESTAMP>] [VERBOSE] delete » root/env0/Bucket/Policy
root/env0/Bucket/Policy stopped

[<TIMESTAMP>] [VERBOSE] delete » root/env0/Bucket
root/env0/Bucket stopped

pass ─ delete.test.wsim » root/env0/test:delete

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] delete » root/env0/test:delete/Handler
Sandbox child process stopped.

```

