# [metadata.test.w](../../../../../../examples/tests/sdk_tests/bucket/metadata.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] metadata() » root/env0/Bucket
root/env0/Bucket started

[<TIMESTAMP>] [VERBOSE] metadata() » root/env0/test:metadata()/Handler
root/env0/test:metadata()/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] metadata() » root/env0/Bucket/Policy
root/env0/Bucket/Policy started

[<TIMESTAMP>] [VERBOSE] metadata() » root/env0/test:metadata()/Handler
Bundled code (1311 bytes).

[<TIMESTAMP>] [VERBOSE] metadata() » root/env0/test:metadata()/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] metadata() » root/env0/test:metadata()/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] metadata() » root/env0/Bucket
Put (key=file1.main.w).

[<TIMESTAMP>] [VERBOSE] metadata() » root/env0/Bucket
Put (key=file2.txt).

[<TIMESTAMP>] [VERBOSE] metadata() » root/env0/Bucket
Put (key=file3.txt).

[<TIMESTAMP>] [VERBOSE] metadata() » root/env0/Bucket
Put Json (key=file4.txt).

[<TIMESTAMP>] [VERBOSE] metadata() » root/env0/Bucket
Metadata (key=file1.main.w).

[<TIMESTAMP>] [VERBOSE] metadata() » root/env0/Bucket
Metadata (key=file2.txt).

[<TIMESTAMP>] [VERBOSE] metadata() » root/env0/Bucket
Metadata (key=file3.txt).

[<TIMESTAMP>] [VERBOSE] metadata() » root/env0/Bucket
Metadata (key=file4.txt).

[<TIMESTAMP>] [VERBOSE] metadata() » root/env0/Bucket
Error: Object does not exist (key=no-such-file.txt). (Metadata (key=no-such-file.txt).)

[<TIMESTAMP>] [VERBOSE] metadata() » root/env0/test:metadata()/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] metadata() » root/env0/test:metadata()/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] metadata() » root/env0/test:metadata()/Handler
root/env0/test:metadata()/Handler stopped

[<TIMESTAMP>] [VERBOSE] metadata() » root/env0/Bucket/Policy
root/env0/Bucket/Policy stopped

[<TIMESTAMP>] [VERBOSE] metadata() » root/env0/Bucket
root/env0/Bucket stopped

pass ─ metadata.test.wsim » root/env0/test:metadata()

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] metadata() » root/env0/test:metadata()/Handler
Sandbox child process stopped.

```

