# [on_message.test.w](../../../../../../examples/tests/sdk_tests/topic/on_message.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [INFO] onMessage » root/env0/Counter/Resource
Bundled code (2405 bytes).

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"start","args":["<ABSOLUTE>/c811d52b4378afd7a5c09fd79c89f55d0bf9685446"]}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":{}}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
root/env0/Counter/Resource started

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic
root/env0/Topic started

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/test:onMessage/Handler
root/env0/test:onMessage/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage0
root/env0/Topic/OnMessage0 started

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage1
root/env0/Topic/OnMessage1 started

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/test:onMessage/Handler
Bundled code (2251 bytes).

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/Policy
root/env0/Topic/Policy started

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage0
Bundled code (1705 bytes).

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage1
Bundled code (1705 bytes).

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/TopicEventMapping0
root/env0/Topic/TopicEventMapping0 started

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/TopicEventMapping1
root/env0/Topic/TopicEventMapping1 started

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/test:onMessage/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/test:onMessage/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic
Sending message (message=msg, subscriber=sim-4).

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage0
InvokeAsync (payload="msg").

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage0
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage0
Sent a message to the sandbox: {"fn":"handler","args":["msg"]}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic
Sending message (message=msg, subscriber=sim-5).

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage1
InvokeAsync (payload="msg").

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage1
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage1
Sent a message to the sandbox: {"fn":"handler","args":["msg"]}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic
Publish (messages=msg).

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic
Sending message (message=msg, subscriber=sim-4).

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage0
InvokeAsync (payload="msg").

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage0
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage0
Sent a message to the sandbox: {"fn":"handler","args":["msg"]}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic
Sending message (message=msg, subscriber=sim-5).

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage1
InvokeAsync (payload="msg").

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage1
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage1
Sent a message to the sandbox: {"fn":"handler","args":["msg"]}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic
Publish (messages=msg).

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic
Sending message (message=msg, subscriber=sim-4).

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage0
InvokeAsync (payload="msg").

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage0
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage0
Sent a message to the sandbox: {"fn":"handler","args":["msg"]}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic
Sending message (message=msg, subscriber=sim-5).

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage1
InvokeAsync (payload="msg").

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage1
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage1
Sent a message to the sandbox: {"fn":"handler","args":["msg"]}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic
Publish (messages=msg).

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc"]}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
inc()

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic
Sending message (message=msg, subscriber=sim-4).

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage0
InvokeAsync (payload="msg").

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage0
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage0
Sent a message to the sandbox: {"fn":"handler","args":["msg"]}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic
Sending message (message=msg, subscriber=sim-5).

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage0
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage1
InvokeAsync (payload="msg").

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage1
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage1
Sent a message to the sandbox: {"fn":"handler","args":["msg"]}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc"]}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic
Publish (messages=msg).

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":1}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
inc()

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic
Sending message (message=msg, subscriber=sim-4).

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage1
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage0
InvokeAsync (payload="msg").

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage0
Sent a message to the sandbox: {"fn":"handler","args":["msg"]}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic
Sending message (message=msg, subscriber=sim-5).

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc"]}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage1
InvokeAsync (payload="msg").

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage1
Sent a message to the sandbox: {"fn":"handler","args":["msg"]}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":2}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
inc()

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic
Publish (messages=msg).

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc"]}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage0
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek"]}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":3}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":4}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
peek()

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc"]}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":4}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
inc()

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc"]}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":5}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
inc()

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage1
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage0
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc"]}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":6}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
inc()

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc"]}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":7}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
inc()

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage1
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage0
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc"]}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":8}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
inc()

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc"]}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":9}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
inc()

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage0
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage1
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek"]}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":10}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
peek()

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/test:onMessage/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/test:onMessage/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/test:onMessage/Handler
root/env0/test:onMessage/Handler stopped

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/Policy
root/env0/Topic/Policy stopped

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/TopicEventMapping0
root/env0/Topic/TopicEventMapping0 stopped

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage0
root/env0/Topic/OnMessage0 stopped

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/TopicEventMapping1
root/env0/Topic/TopicEventMapping1 stopped

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage1
root/env0/Topic/OnMessage1 stopped

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/test:onMessage/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage0
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage0
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"stop","args":[]}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage0
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
root/env0/Counter/Resource stopped

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage1
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage1
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic
root/env0/Topic stopped

pass ─ on_message.test.wsim » root/env0/test:onMessage

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Counter/Resource
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage0
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage1
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] onMessage » root/env0/Topic/OnMessage1
Sandbox child process stopped.

```

