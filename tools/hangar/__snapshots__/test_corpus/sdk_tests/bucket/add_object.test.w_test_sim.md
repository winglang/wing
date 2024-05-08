# [add_object.test.w](../../../../../../examples/tests/sdk_tests/bucket/add_object.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] addObject » root/env0/Bucket
Adding object from preflight (key=file1.json).

[<TIMESTAMP>] [VERBOSE] addObject » root/env0/Bucket
Adding object from preflight (key=file2.txt).

[<TIMESTAMP>] [VERBOSE] addObject » root/env0/Bucket
root/env0/Bucket started

[<TIMESTAMP>] [VERBOSE] addObject » root/env0/test:addObject/Handler
root/env0/test:addObject/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] addObject » root/env0/Bucket/Policy
root/env0/Bucket/Policy started

[<TIMESTAMP>] [VERBOSE] addObject » root/env0/test:addObject/Handler
Bundled code (1349 bytes).

[<TIMESTAMP>] [VERBOSE] addObject » root/env0/test:addObject/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] addObject » root/env0/test:addObject/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] addObject » root/env0/Bucket
List (prefix=null).

[<TIMESTAMP>] [VERBOSE] addObject » root/env0/Bucket
Get Json (key=file1.json).

[<TIMESTAMP>] [VERBOSE] addObject » root/env0/Bucket
Get (key=file2.txt).

[<TIMESTAMP>] [VERBOSE] addObject » root/env0/test:addObject/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] addObject » root/env0/test:addObject/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] addObject » root/env0/test:addObject/Handler
root/env0/test:addObject/Handler stopped

[<TIMESTAMP>] [VERBOSE] addObject » root/env0/Bucket/Policy
root/env0/Bucket/Policy stopped

[<TIMESTAMP>] [VERBOSE] addObject » root/env0/Bucket
root/env0/Bucket stopped

pass ─ add_object.test.wsim » root/env0/test:addObject

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] addObject » root/env0/test:addObject/Handler
Sandbox child process stopped.

```

