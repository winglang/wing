# [peek.test.w](../../../../../../examples/tests/sdk_tests/counter/peek.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [INFO] peek » root/env0/Counter/Resource
Bundled code (2405 bytes).

[<TIMESTAMP>] [VERBOSE] peek » root/env0/Counter/Resource
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] peek » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"start","args":["<ABSOLUTE>/c811d52b4378afd7a5c09fd79c89f55d0bf9685446"]}

[<TIMESTAMP>] [VERBOSE] peek » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":{}}

[<TIMESTAMP>] [VERBOSE] peek » root/env0/Counter/Resource
root/env0/Counter/Resource started

[<TIMESTAMP>] [VERBOSE] peek » root/env0/test:peek/Handler
root/env0/test:peek/Handler started

[<TIMESTAMP>] [VERBOSE] peek » root/env0/test:peek/Handler
Bundled code (1520 bytes).

[<TIMESTAMP>] [INFO] key peek » root/env1/Counter/Resource
Bundled code (2405 bytes).

[<TIMESTAMP>] [VERBOSE] key peek » root/env1/Counter/Resource
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] key peek » root/env1/Counter/Resource
Sent a message to the sandbox: {"fn":"start","args":["<ABSOLUTE>/c8e3d914d3cc1223e0a6f6afcee7177fc945e060fd"]}

[<TIMESTAMP>] [VERBOSE] key peek » root/env1/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":{}}

[<TIMESTAMP>] [VERBOSE] key peek » root/env1/Counter/Resource
root/env1/Counter/Resource started

[<TIMESTAMP>] [VERBOSE] key peek » root/env1/test:key peek/Handler
root/env1/test:key peek/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] key peek » root/env1/test:key peek/Handler
Bundled code (1520 bytes).

[<TIMESTAMP>] [VERBOSE] peek » root/env0/test:peek/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] peek » root/env0/test:peek/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] peek » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek"]}

[<TIMESTAMP>] [VERBOSE] peek » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] peek » root/env0/Counter/Resource
peek()

[<TIMESTAMP>] [VERBOSE] peek » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek"]}

[<TIMESTAMP>] [VERBOSE] peek » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] peek » root/env0/Counter/Resource
peek()

[<TIMESTAMP>] [VERBOSE] peek » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc"]}

[<TIMESTAMP>] [VERBOSE] peek » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] peek » root/env0/Counter/Resource
inc()

[<TIMESTAMP>] [VERBOSE] peek » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek"]}

[<TIMESTAMP>] [VERBOSE] peek » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":1}

[<TIMESTAMP>] [VERBOSE] peek » root/env0/Counter/Resource
peek()

[<TIMESTAMP>] [VERBOSE] peek » root/env0/test:peek/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] peek » root/env0/test:peek/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] key peek » root/env1/test:key peek/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] key peek » root/env1/test:key peek/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] key peek » root/env1/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek","my-key"]}

[<TIMESTAMP>] [VERBOSE] key peek » root/env1/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] key peek » root/env1/Counter/Resource
peek("my-key")

[<TIMESTAMP>] [VERBOSE] key peek » root/env1/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek","my-key"]}

[<TIMESTAMP>] [VERBOSE] key peek » root/env1/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] key peek » root/env1/Counter/Resource
peek("my-key")

[<TIMESTAMP>] [VERBOSE] key peek » root/env1/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc",null,"my-key"]}

[<TIMESTAMP>] [VERBOSE] key peek » root/env1/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] key peek » root/env1/Counter/Resource
inc(nil, "my-key")

[<TIMESTAMP>] [VERBOSE] key peek » root/env1/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek","my-key"]}

[<TIMESTAMP>] [VERBOSE] key peek » root/env1/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":1}

[<TIMESTAMP>] [VERBOSE] key peek » root/env1/Counter/Resource
peek("my-key")

[<TIMESTAMP>] [VERBOSE] key peek » root/env1/test:key peek/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] key peek » root/env1/test:key peek/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] peek » root/env0/test:peek/Handler
root/env0/test:peek/Handler stopped

[<TIMESTAMP>] [VERBOSE] peek » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"stop","args":[]}

[<TIMESTAMP>] [VERBOSE] peek » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] peek » root/env0/Counter/Resource
root/env0/Counter/Resource stopped

[<TIMESTAMP>] [VERBOSE] key peek » root/env1/test:key peek/Handler
root/env1/test:key peek/Handler stopped

[<TIMESTAMP>] [VERBOSE] key peek » root/env1/Counter/Resource
Sent a message to the sandbox: {"fn":"stop","args":[]}

[<TIMESTAMP>] [VERBOSE] key peek » root/env1/Counter/Resource
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] key peek » root/env1/Counter/Resource
root/env1/Counter/Resource stopped

pass ─ peek.test.wsim » root/env0/test:peek    
pass ─ peek.test.wsim » root/env1/test:key peek

Tests 2 passed (2)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] peek » root/env0/Counter/Resource
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] key peek » root/env1/Counter/Resource
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] peek » root/env0/test:peek/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] key peek » root/env1/test:key peek/Handler
Sandbox child process stopped.

```

