# [resource.test.w](../../../../../../examples/tests/sdk_tests/resource/resource.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [INFO] Counter » root/env0/Counter/Resource
Bundled code (2491 bytes).

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/Counter/Resource
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"start","args":["<ABSOLUTE>/c811d52b4378afd7a5c09fd79c89f55d0bf9685446"]}

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":{"startTime":"2023-10-16T20:47:39.511Z"}}

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/Counter/Resource
root/env0/Counter/Resource started

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/test:Counter/Handler
root/env0/test:Counter/Handler started

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/test:Counter/Handler
Bundled code (1977 bytes).

[<TIMESTAMP>] [INFO] DoubleCounter » root/env1/DoubleCounter/Resource
Bundled code (2491 bytes).

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/DoubleCounter/Resource
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/DoubleCounter/Resource
Sent a message to the sandbox: {"fn":"start","args":["<ABSOLUTE>/c86af29a5ea295c7dc86a04b5d8bad4032fa17b188"]}

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/DoubleCounter/Resource
Received a message from the sandbox: {"type":"ok","value":{"startTime":"2023-10-16T20:47:39.511Z"}}

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/DoubleCounter/Resource
root/env1/DoubleCounter/Resource started

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/test:DoubleCounter/Handler
root/env1/test:DoubleCounter/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/test:DoubleCounter/Handler
Bundled code (2092 bytes).

[<TIMESTAMP>] [INFO] Counter » root/env0/DoubleCounter/Resource
Bundled code (2491 bytes).

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/DoubleCounter/Resource
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/DoubleCounter/Resource
Sent a message to the sandbox: {"fn":"start","args":["<ABSOLUTE>/c815c54c5446d39cd19c5c59f4b62f216053aa8abb"]}

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/DoubleCounter/Resource
Received a message from the sandbox: {"type":"ok","value":{"startTime":"2023-10-16T20:47:39.511Z"}}

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/DoubleCounter/Resource
root/env0/DoubleCounter/Resource started

[<TIMESTAMP>] [INFO] DoubleCounter » root/env1/Counter/Resource
Bundled code (2491 bytes).

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/Counter/Resource
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/Counter/Resource
Sent a message to the sandbox: {"fn":"start","args":["<ABSOLUTE>/c8e3d914d3cc1223e0a6f6afcee7177fc945e060fd"]}

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":{"startTime":"2023-10-16T20:47:39.511Z"}}

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/Counter/Resource
root/env1/Counter/Resource started

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/test:Counter/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/test:Counter/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc",1]}

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/Counter/Resource
inc(1)

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc",1]}

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":1}

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/Counter/Resource
inc(1)

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc",5]}

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":2}

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/Counter/Resource
inc(5)

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek"]}

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":7}

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/Counter/Resource
peek()

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/test:Counter/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/test:Counter/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/test:DoubleCounter/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/test:DoubleCounter/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/DoubleCounter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc",2]}

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/DoubleCounter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/DoubleCounter/Resource
inc(2)

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/DoubleCounter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc",2]}

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/DoubleCounter/Resource
Received a message from the sandbox: {"type":"ok","value":2}

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/DoubleCounter/Resource
inc(2)

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/DoubleCounter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc",10]}

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/DoubleCounter/Resource
Received a message from the sandbox: {"type":"ok","value":4}

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/DoubleCounter/Resource
inc(10)

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/DoubleCounter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek"]}

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/DoubleCounter/Resource
Received a message from the sandbox: {"type":"ok","value":14}

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/DoubleCounter/Resource
peek()

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/test:DoubleCounter/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/test:DoubleCounter/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/test:Counter/Handler
root/env0/test:Counter/Handler stopped

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"stop","args":[]}

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/Counter/Resource
root/env0/Counter/Resource stopped

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/test:DoubleCounter/Handler
root/env1/test:DoubleCounter/Handler stopped

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/DoubleCounter/Resource
Sent a message to the sandbox: {"fn":"stop","args":[]}

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/DoubleCounter/Resource
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/DoubleCounter/Resource
root/env1/DoubleCounter/Resource stopped

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/Counter/Resource
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/test:Counter/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/DoubleCounter/Resource
Sent a message to the sandbox: {"fn":"stop","args":[]}

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/DoubleCounter/Resource
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/DoubleCounter/Resource
root/env0/DoubleCounter/Resource stopped

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/Counter/Resource
Sent a message to the sandbox: {"fn":"stop","args":[]}

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/Counter/Resource
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/Counter/Resource
root/env1/Counter/Resource stopped

pass ─ resource.test.wsim » root/env0/test:Counter      
pass ─ resource.test.wsim » root/env1/test:DoubleCounter

Tests 2 passed (2)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/DoubleCounter/Resource
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] Counter » root/env0/DoubleCounter/Resource
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/Counter/Resource
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] DoubleCounter » root/env1/test:DoubleCounter/Handler
Sandbox child process stopped.

```

