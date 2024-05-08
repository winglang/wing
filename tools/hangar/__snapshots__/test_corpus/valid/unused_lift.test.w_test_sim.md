# [unused_lift.test.w](../../../../../examples/tests/valid/unused_lift.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] Use class but not method that access lifted object » root/env0/Bucket
root/env0/Bucket started

[<TIMESTAMP>] [VERBOSE] Use class but not method that access lifted object » root/env0/test:Use class but not method that access lifted object/Handler
root/env0/test:Use class but not method that access lifted object/Handler started

[<TIMESTAMP>] [VERBOSE] Use class but not static method that access lifted object » root/env1/Bucket
root/env1/Bucket started

[<TIMESTAMP>] [VERBOSE] Use class but not method that access lifted object » root/env0/test:Use class but not method that access lifted object/Handler
Bundled code (1587 bytes).

[<TIMESTAMP>] [VERBOSE] Use class but not static method that access lifted object » root/env1/test:Use class but not static method that access lifted object/Handler
root/env1/test:Use class but not static method that access lifted object/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] Use class but not method that access lifted object » root/env0/Bucket/Policy
root/env0/Bucket/Policy started

[<TIMESTAMP>] [VERBOSE] Use class but not static method that access lifted object » root/env1/test:Use class but not static method that access lifted object/Handler
Bundled code (1589 bytes).

[<TIMESTAMP>] [VERBOSE] Use class but not static method that access lifted object » root/env1/Bucket/Policy
root/env1/Bucket/Policy started

[<TIMESTAMP>] [VERBOSE] Use class but not method that access lifted object » root/env0/test:Use class but not method that access lifted object/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] Use class but not method that access lifted object » root/env0/test:Use class but not method that access lifted object/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] Use class but not method that access lifted object » root/env0/test:Use class but not method that access lifted object/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] Use class but not method that access lifted object » root/env0/test:Use class but not method that access lifted object/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] Use class but not static method that access lifted object » root/env1/test:Use class but not static method that access lifted object/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] Use class but not static method that access lifted object » root/env1/test:Use class but not static method that access lifted object/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] Use class but not static method that access lifted object » root/env1/test:Use class but not static method that access lifted object/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] Use class but not static method that access lifted object » root/env1/test:Use class but not static method that access lifted object/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] Use class but not method that access lifted object » root/env0/test:Use class but not method that access lifted object/Handler
root/env0/test:Use class but not method that access lifted object/Handler stopped

[<TIMESTAMP>] [VERBOSE] Use class but not method that access lifted object » root/env0/Bucket/Policy
root/env0/Bucket/Policy stopped

[<TIMESTAMP>] [VERBOSE] Use class but not method that access lifted object » root/env0/Bucket
root/env0/Bucket stopped

[<TIMESTAMP>] [VERBOSE] Use class but not static method that access lifted object » root/env1/test:Use class but not static method that access lifted object/Handler
root/env1/test:Use class but not static method that access lifted object/Handler stopped

[<TIMESTAMP>] [VERBOSE] Use class but not static method that access lifted object » root/env1/Bucket/Policy
root/env1/Bucket/Policy stopped

[<TIMESTAMP>] [VERBOSE] Use class but not static method that access lifted object » root/env1/Bucket
root/env1/Bucket stopped

pass ─ unused_lift.test.wsim » root/env0/test:Use class but not method that access lifted object       
pass ─ unused_lift.test.wsim » root/env1/test:Use class but not static method that access lifted object

Tests 2 passed (2)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] Use class but not method that access lifted object » root/env0/test:Use class but not method that access lifted object/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] Use class but not static method that access lifted object » root/env1/test:Use class but not static method that access lifted object/Handler
Sandbox child process stopped.

```

