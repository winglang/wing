# [execute_after.test.w](../../../../../../examples/tests/sdk_tests/on_deploy/execute_after.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [INFO] counter » root/env0/Counter/Resource
Bundled code (2405 bytes).

[<TIMESTAMP>] [VERBOSE] counter » root/env0/Counter/Resource
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] counter » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"start","args":["<ABSOLUTE>/c811d52b4378afd7a5c09fd79c89f55d0bf9685446"]}

[<TIMESTAMP>] [VERBOSE] counter » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":{}}

[<TIMESTAMP>] [VERBOSE] counter » root/env0/Counter/Resource
root/env0/Counter/Resource started

[<TIMESTAMP>] [VERBOSE] counter » root/env0/test:counter/Handler
root/env0/test:counter/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] counter » root/env0/init2/Function
root/env0/init2/Function started

[<TIMESTAMP>] [VERBOSE] counter » root/env0/init1/Function
root/env0/init1/Function started

[<TIMESTAMP>] [VERBOSE] counter » root/env0/test:counter/Handler
Bundled code (1401 bytes).

[<TIMESTAMP>] [VERBOSE] counter » root/env0/init2/Function
Bundled code (1401 bytes).

[<TIMESTAMP>] [VERBOSE] counter » root/env0/init1/Function
Bundled code (1401 bytes).

[<TIMESTAMP>] [VERBOSE] counter » root/env0/init1/Function
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] counter » root/env0/init1/Function
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] counter » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["set",10]}

[<TIMESTAMP>] [VERBOSE] counter » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] counter » root/env0/Counter/Resource
set(10)

[<TIMESTAMP>] [VERBOSE] counter » root/env0/init1/Function
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] counter » root/env0/init1/Function
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] counter » root/env0/init1
OnDeploy invoked.

[<TIMESTAMP>] [VERBOSE] counter » root/env0/init1
root/env0/init1 started

[<TIMESTAMP>] [VERBOSE] counter » root/env0/init2/Function
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] counter » root/env0/init2/Function
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] counter » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc"]}

[<TIMESTAMP>] [VERBOSE] counter » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":10}

[<TIMESTAMP>] [VERBOSE] counter » root/env0/Counter/Resource
inc()

[<TIMESTAMP>] [VERBOSE] counter » root/env0/init2/Function
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] counter » root/env0/init2/Function
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] counter » root/env0/init2
OnDeploy invoked.

[<TIMESTAMP>] [VERBOSE] counter » root/env0/init2
root/env0/init2 started

[<TIMESTAMP>] [VERBOSE] counter » root/env0/test:counter/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] counter » root/env0/test:counter/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] counter » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek"]}

[<TIMESTAMP>] [VERBOSE] counter » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":11}

[<TIMESTAMP>] [VERBOSE] counter » root/env0/Counter/Resource
peek()

[<TIMESTAMP>] [VERBOSE] counter » root/env0/test:counter/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] counter » root/env0/test:counter/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] counter » root/env0/test:counter/Handler
root/env0/test:counter/Handler stopped

[<TIMESTAMP>] [VERBOSE] counter » root/env0/init2
root/env0/init2 stopped

[<TIMESTAMP>] [VERBOSE] counter » root/env0/init2/Function
root/env0/init2/Function stopped

[<TIMESTAMP>] [VERBOSE] counter » root/env0/init1
root/env0/init1 stopped

[<TIMESTAMP>] [VERBOSE] counter » root/env0/init2/Function
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] counter » root/env0/test:counter/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] counter » root/env0/init1/Function
root/env0/init1/Function stopped

[<TIMESTAMP>] [VERBOSE] counter » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"stop","args":[]}

[<TIMESTAMP>] [VERBOSE] counter » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] counter » root/env0/Counter/Resource
root/env0/Counter/Resource stopped

pass ─ execute_after.test.wsim » root/env0/test:counter

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] counter » root/env0/Counter/Resource
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] counter » root/env0/init1/Function
Sandbox child process stopped.

```

