# [bucket_list.test.w](../../../../../../examples/tests/sdk_tests/bucket/bucket_list.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] list » root/env0/Bucket
Adding object from preflight (key=file3.txt).

[<TIMESTAMP>] [VERBOSE] list » root/env0/Bucket
root/env0/Bucket started

[<TIMESTAMP>] [VERBOSE] list » root/env0/test:list/Handler
root/env0/test:list/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] list » root/env0/Bucket/Policy
root/env0/Bucket/Policy started

[<TIMESTAMP>] [VERBOSE] list » root/env0/test:list/Handler
Bundled code (1178 bytes).

[<TIMESTAMP>] [VERBOSE] list » root/env0/test:list/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] list » root/env0/test:list/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] list » root/env0/Bucket
List (prefix=null).

[<TIMESTAMP>] [VERBOSE] list » root/env0/Bucket
Put Json (key=file1.json).

[<TIMESTAMP>] [VERBOSE] list » root/env0/Bucket
Put (key=file2.txt).

[<TIMESTAMP>] [VERBOSE] list » root/env0/Bucket
Put (key=random).

[<TIMESTAMP>] [VERBOSE] list » root/env0/Bucket
List (prefix=null).

[<TIMESTAMP>] [VERBOSE] list » root/env0/Bucket
List (prefix=file).

[<TIMESTAMP>] [VERBOSE] list » root/env0/test:list/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] list » root/env0/test:list/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] list » root/env0/test:list/Handler
root/env0/test:list/Handler stopped

[<TIMESTAMP>] [VERBOSE] list » root/env0/test:list/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] list » root/env0/Bucket/Policy
root/env0/Bucket/Policy stopped

[<TIMESTAMP>] [VERBOSE] list » root/env0/Bucket
root/env0/Bucket stopped

pass ─ bucket_list.test.wsim » root/env0/test:list

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

