# [stat.test.w](../../../../../../examples/tests/sdk_tests/fs/stat.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] metadata() » root/env0/test:metadata()/Handler
root/env0/test:metadata()/Handler started

[<TIMESTAMP>] [VERBOSE] symlinkMetadata() » root/env1/test:symlinkMetadata()/Handler
root/env1/test:symlinkMetadata()/Handler started

[<TIMESTAMP>] [VERBOSE] setPermissions() » root/env2/test:setPermissions()/Handler
root/env2/test:setPermissions()/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] metadata() » root/env0/test:metadata()/Handler
Bundled code (1071 bytes).

[<TIMESTAMP>] [VERBOSE] symlinkMetadata() » root/env1/test:symlinkMetadata()/Handler
Bundled code (1071 bytes).

[<TIMESTAMP>] [VERBOSE] setPermissions() » root/env2/test:setPermissions()/Handler
Bundled code (832 bytes).

[<TIMESTAMP>] [VERBOSE] metadata() » root/env0/test:metadata()/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] metadata() » root/env0/test:metadata()/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] metadata() » root/env0/test:metadata()/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] metadata() » root/env0/test:metadata()/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] symlinkMetadata() » root/env1/test:symlinkMetadata()/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] symlinkMetadata() » root/env1/test:symlinkMetadata()/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] symlinkMetadata() » root/env1/test:symlinkMetadata()/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] symlinkMetadata() » root/env1/test:symlinkMetadata()/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] setPermissions() » root/env2/test:setPermissions()/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] setPermissions() » root/env2/test:setPermissions()/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] setPermissions() » root/env2/test:setPermissions()/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] setPermissions() » root/env2/test:setPermissions()/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] metadata() » root/env0/test:metadata()/Handler
root/env0/test:metadata()/Handler stopped

[<TIMESTAMP>] [VERBOSE] symlinkMetadata() » root/env1/test:symlinkMetadata()/Handler
root/env1/test:symlinkMetadata()/Handler stopped

[<TIMESTAMP>] [VERBOSE] setPermissions() » root/env2/test:setPermissions()/Handler
root/env2/test:setPermissions()/Handler stopped

pass ─ stat.test.wsim » root/env0/test:metadata()       
pass ─ stat.test.wsim » root/env1/test:symlinkMetadata()
pass ─ stat.test.wsim » root/env2/test:setPermissions() 

Tests 3 passed (3)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] metadata() » root/env0/test:metadata()/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] symlinkMetadata() » root/env1/test:symlinkMetadata()/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] setPermissions() » root/env2/test:setPermissions()/Handler
Sandbox child process stopped.

```

