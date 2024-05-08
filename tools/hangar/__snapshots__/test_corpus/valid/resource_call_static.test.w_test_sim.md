# [resource_call_static.test.w](../../../../../examples/tests/valid/resource_call_static.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [INFO] access cloud resource through static methods only » root/env0/Counter/Resource
Bundled code (2405 bytes).

[<TIMESTAMP>] [VERBOSE] access cloud resource through static methods only » root/env0/Counter/Resource
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] access cloud resource through static methods only » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"start","args":["<ABSOLUTE>/c811d52b4378afd7a5c09fd79c89f55d0bf9685446"]}

[<TIMESTAMP>] [VERBOSE] access cloud resource through static methods only » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":{}}

[<TIMESTAMP>] [VERBOSE] access cloud resource through static methods only » root/env0/Counter/Resource
root/env0/Counter/Resource started

[<TIMESTAMP>] [VERBOSE] access cloud resource through static methods only » root/env0/test:access cloud resource through static methods only/Handler
root/env0/test:access cloud resource through static methods only/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] access cloud resource through static methods only » root/env0/test:access cloud resource through static methods only/Handler
Bundled code (1590 bytes).

[<TIMESTAMP>] [VERBOSE] access cloud resource through static methods only » root/env0/test:access cloud resource through static methods only/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] access cloud resource through static methods only » root/env0/test:access cloud resource through static methods only/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] access cloud resource through static methods only » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek"]}

[<TIMESTAMP>] [VERBOSE] access cloud resource through static methods only » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] access cloud resource through static methods only » root/env0/Counter/Resource
peek()

[<TIMESTAMP>] [VERBOSE] access cloud resource through static methods only » root/env0/test:access cloud resource through static methods only/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] access cloud resource through static methods only » root/env0/test:access cloud resource through static methods only/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] access cloud resource through static methods only » root/env0/test:access cloud resource through static methods only/Handler
root/env0/test:access cloud resource through static methods only/Handler stopped

[<TIMESTAMP>] [VERBOSE] access cloud resource through static methods only » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"stop","args":[]}

[<TIMESTAMP>] [VERBOSE] access cloud resource through static methods only » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] access cloud resource through static methods only » root/env0/Counter/Resource
root/env0/Counter/Resource stopped

pass ─ resource_call_static.test.wsim » root/env0/test:access cloud resource through static methods only

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] access cloud resource through static methods only » root/env0/Counter/Resource
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] access cloud resource through static methods only » root/env0/test:access cloud resource through static methods only/Handler
Sandbox child process stopped.

```

