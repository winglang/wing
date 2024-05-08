# [public_url.test.w](../../../../../../examples/tests/sdk_tests/bucket/public_url.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] publicUrl » root/env0/privateBucket
root/env0/privateBucket started

[<TIMESTAMP>] [VERBOSE] publicUrl » root/env0/publicBucket
root/env0/publicBucket started

[<TIMESTAMP>] [VERBOSE] publicUrl » root/env0/test:publicUrl/Handler
root/env0/test:publicUrl/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] publicUrl » root/env0/publicBucket/Policy
root/env0/publicBucket/Policy started

[<TIMESTAMP>] [VERBOSE] publicUrl » root/env0/privateBucket/Policy
root/env0/privateBucket/Policy started

[<TIMESTAMP>] [VERBOSE] publicUrl » root/env0/test:publicUrl/Handler
Bundled code (2191 bytes).

[<TIMESTAMP>] [VERBOSE] publicUrl » root/env0/test:publicUrl/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] publicUrl » root/env0/test:publicUrl/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] publicUrl » root/env0/publicBucket
Put (key=file1.txt).

[<TIMESTAMP>] [VERBOSE] publicUrl » root/env0/privateBucket
Put (key=file2.txt).

[<TIMESTAMP>] [VERBOSE] publicUrl » root/env0/publicBucket
Public URL (key=file1.txt).

[<TIMESTAMP>] [VERBOSE] publicUrl » root/env0/test:publicUrl/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] publicUrl » root/env0/test:publicUrl/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] publicUrl » root/env0/test:publicUrl/Handler
root/env0/test:publicUrl/Handler stopped

[<TIMESTAMP>] [VERBOSE] publicUrl » root/env0/privateBucket/Policy
root/env0/privateBucket/Policy stopped

[<TIMESTAMP>] [VERBOSE] publicUrl » root/env0/privateBucket
root/env0/privateBucket stopped

[<TIMESTAMP>] [VERBOSE] publicUrl » root/env0/publicBucket/Policy
root/env0/publicBucket/Policy stopped

[<TIMESTAMP>] [VERBOSE] publicUrl » root/env0/publicBucket
root/env0/publicBucket stopped

pass ─ public_url.test.wsim » root/env0/test:publicUrl

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] publicUrl » root/env0/test:publicUrl/Handler
Sandbox child process stopped.

```

