# [double_reference.test.w](../../../../../examples/tests/valid/double_reference.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [INFO] hello » root/env0/Counter/Resource
Bundled code (2405 bytes).

[<TIMESTAMP>] [VERBOSE] hello » root/env0/Counter/Resource
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] hello » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"start","args":["<ABSOLUTE>/c811d52b4378afd7a5c09fd79c89f55d0bf9685446"]}

[<TIMESTAMP>] [VERBOSE] hello » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":{}}

[<TIMESTAMP>] [VERBOSE] hello » root/env0/Counter/Resource
root/env0/Counter/Resource started

[<TIMESTAMP>] [VERBOSE] hello » root/env0/test:hello/Handler
root/env0/test:hello/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] hello » root/env0/test:hello/Handler
Bundled code (4314 bytes).

[<TIMESTAMP>] [VERBOSE] hello » root/env0/test:hello/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] hello » root/env0/test:hello/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] hello » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc"]}

[<TIMESTAMP>] [VERBOSE] hello » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] hello » root/env0/Counter/Resource
inc()

[<TIMESTAMP>] [VERBOSE] hello » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc"]}

[<TIMESTAMP>] [VERBOSE] hello » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":1}

[<TIMESTAMP>] [VERBOSE] hello » root/env0/Counter/Resource
inc()

[<TIMESTAMP>] [VERBOSE] hello » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek"]}

[<TIMESTAMP>] [VERBOSE] hello » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":2}

[<TIMESTAMP>] [VERBOSE] hello » root/env0/Counter/Resource
peek()

[<TIMESTAMP>] [VERBOSE] hello » root/env0/test:hello/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] hello » root/env0/test:hello/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] hello » root/env0/test:hello/Handler
root/env0/test:hello/Handler stopped

[<TIMESTAMP>] [VERBOSE] hello » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"stop","args":[]}

[<TIMESTAMP>] [VERBOSE] hello » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] hello » root/env0/Counter/Resource
root/env0/Counter/Resource stopped

pass ─ double_reference.test.wsim » root/env0/test:hello

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] hello » root/env0/Counter/Resource
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] hello » root/env0/test:hello/Handler
Sandbox child process stopped.

```

