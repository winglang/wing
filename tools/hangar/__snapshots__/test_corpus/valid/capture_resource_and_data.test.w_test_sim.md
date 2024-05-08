# [capture_resource_and_data.test.w](../../../../../examples/tests/valid/capture_resource_and_data.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] resource and data » root/env0/Queue
root/env0/Queue started

[<TIMESTAMP>] [VERBOSE] resource and data » root/env0/Bucket
root/env0/Bucket started

[<TIMESTAMP>] [VERBOSE] resource and data » root/env0/test:resource and data/Handler
root/env0/test:resource and data/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] resource and data » root/env0/Bucket/Policy
root/env0/Bucket/Policy started

[<TIMESTAMP>] [VERBOSE] resource and data » root/env0/Queue/Policy
root/env0/Queue/Policy started

[<TIMESTAMP>] [VERBOSE] resource and data » root/env0/test:resource and data/Handler
Bundled code (1817 bytes).

[<TIMESTAMP>] [VERBOSE] resource and data » root/env0/test:resource and data/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] resource and data » root/env0/test:resource and data/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] resource and data » root/env0/Bucket
Put (key=file.txt).

[<TIMESTAMP>] [VERBOSE] resource and data » root/env0/Bucket
Get (key=file.txt).

[<TIMESTAMP>] [VERBOSE] resource and data » root/env0/Queue
Push (messages=spirulina).

[<TIMESTAMP>] [VERBOSE] resource and data » root/env0/test:resource and data/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] resource and data » root/env0/test:resource and data/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] resource and data » root/env0/test:resource and data/Handler
root/env0/test:resource and data/Handler stopped

[<TIMESTAMP>] [VERBOSE] resource and data » root/env0/Queue/Policy
root/env0/Queue/Policy stopped

[<TIMESTAMP>] [VERBOSE] resource and data » root/env0/test:resource and data/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] resource and data » root/env0/Queue
root/env0/Queue stopped

[<TIMESTAMP>] [VERBOSE] resource and data » root/env0/Bucket/Policy
root/env0/Bucket/Policy stopped

[<TIMESTAMP>] [VERBOSE] resource and data » root/env0/Bucket
root/env0/Bucket stopped

pass ─ capture_resource_and_data.test.wsim » root/env0/test:resource and data

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

