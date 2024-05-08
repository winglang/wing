# [no_blocking.test.w](../../../../../../examples/tests/sdk_tests/topic/no_blocking.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [INFO] topic subscribers are invoked without blocking » root/env0/Counter/Resource
Bundled code (2405 bytes).

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"start","args":["<ABSOLUTE>/c811d52b4378afd7a5c09fd79c89f55d0bf9685446"]}

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":{}}

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
root/env0/Counter/Resource started

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Topic
root/env0/Topic started

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/test:topic subscribers are invoked without blocking/Handler
root/env0/test:topic subscribers are invoked without blocking/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Topic/OnMessage0
root/env0/Topic/OnMessage0 started

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Topic/Policy
root/env0/Topic/Policy started

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/test:topic subscribers are invoked without blocking/Handler
Bundled code (2262 bytes).

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Topic/OnMessage0
Bundled code (1982 bytes).

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Topic/TopicEventMapping0
root/env0/Topic/TopicEventMapping0 started

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/test:topic subscribers are invoked without blocking/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/test:topic subscribers are invoked without blocking/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek"]}

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
peek()

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Topic
Sending message (message=hello, subscriber=sim-4).

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Topic/OnMessage0
InvokeAsync (payload="hello").

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Topic/OnMessage0
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Topic/OnMessage0
Sent a message to the sandbox: {"fn":"handler","args":["hello"]}

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Topic
Publish (messages=hello).

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek"]}

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
peek()

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek"]}

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
peek()

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek"]}

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
peek()

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek"]}

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
peek()

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek"]}

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
peek()

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc"]}

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
inc()

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Topic/OnMessage0
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek"]}

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":1}

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
peek()

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/test:topic subscribers are invoked without blocking/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/test:topic subscribers are invoked without blocking/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/test:topic subscribers are invoked without blocking/Handler
root/env0/test:topic subscribers are invoked without blocking/Handler stopped

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Topic/Policy
root/env0/Topic/Policy stopped

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Topic/TopicEventMapping0
root/env0/Topic/TopicEventMapping0 stopped

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Topic/OnMessage0
root/env0/Topic/OnMessage0 stopped

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"stop","args":[]}

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
root/env0/Counter/Resource stopped

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Topic
root/env0/Topic stopped

pass ─ no_blocking.test.wsim » root/env0/test:topic subscribers are invoked without blocking

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Counter/Resource
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/test:topic subscribers are invoked without blocking/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] topic subscribers are invoked without blocking » root/env0/Topic/OnMessage0
Sandbox child process stopped.

```

