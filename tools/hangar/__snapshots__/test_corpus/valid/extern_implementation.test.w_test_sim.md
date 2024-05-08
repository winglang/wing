# [extern_implementation.test.w](../../../../../examples/tests/valid/extern_implementation.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] call » root/env0/Function
root/env0/Function started

[<TIMESTAMP>] [VERBOSE] call » root/env0/test:call/Handler
root/env0/test:call/Handler started

[<TIMESTAMP>] [VERBOSE] console » root/env1/test:console/Handler
root/env1/test:console/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] call » root/env0/Function
Bundled code (1012 bytes).

[<TIMESTAMP>] [VERBOSE] call » root/env0/test:call/Handler
Bundled code (1184 bytes).

[<TIMESTAMP>] [VERBOSE] console » root/env1/test:console/Handler
Bundled code (765 bytes).

[<TIMESTAMP>] [VERBOSE] call » root/env0/my-bucket
root/env0/my-bucket started

[<TIMESTAMP>] [VERBOSE] call » root/env0/my-bucket/Policy
root/env0/my-bucket/Policy started

[<TIMESTAMP>] [VERBOSE] console » root/env1/my-bucket
root/env1/my-bucket started

[<TIMESTAMP>] [VERBOSE] console » root/env1/my-bucket/Policy
root/env1/my-bucket/Policy started

[<TIMESTAMP>] [VERBOSE] console » root/env1/Function
root/env1/Function started

[<TIMESTAMP>] [VERBOSE] console » root/env1/Function
Bundled code (1012 bytes).

[<TIMESTAMP>] [VERBOSE] call » root/env0/test:call/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] call » root/env0/test:call/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] call » root/env0/Function
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] call » root/env0/Function
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] call » root/env0/Function
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] call » root/env0/Function
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] call » root/env0/test:call/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] call » root/env0/test:call/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] console » root/env1/test:console/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] console » root/env1/test:console/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [INFO] console » root/env1/test:console/Handler
printing hey there

[<TIMESTAMP>] [VERBOSE] console » root/env1/test:console/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] console » root/env1/test:console/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] call » root/env0/test:call/Handler
root/env0/test:call/Handler stopped

[<TIMESTAMP>] [VERBOSE] call » root/env0/Function
root/env0/Function stopped

[<TIMESTAMP>] [VERBOSE] console » root/env1/test:console/Handler
root/env1/test:console/Handler stopped

[<TIMESTAMP>] [VERBOSE] call » root/env0/my-bucket/Policy
root/env0/my-bucket/Policy stopped

[<TIMESTAMP>] [VERBOSE] call » root/env0/my-bucket
root/env0/my-bucket stopped

[<TIMESTAMP>] [VERBOSE] console » root/env1/my-bucket/Policy
root/env1/my-bucket/Policy stopped

[<TIMESTAMP>] [VERBOSE] console » root/env1/my-bucket
root/env1/my-bucket stopped

[<TIMESTAMP>] [VERBOSE] console » root/env1/Function
root/env1/Function stopped

pass ─ extern_implementation.test.wsim » root/env0/test:call   
pass ─ extern_implementation.test.wsim » root/env1/test:console

Tests 2 passed (2)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] call » root/env0/test:call/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] call » root/env0/Function
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] console » root/env1/test:console/Handler
Sandbox child process stopped.

```

