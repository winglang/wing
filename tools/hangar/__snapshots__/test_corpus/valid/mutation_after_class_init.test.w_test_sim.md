# [mutation_after_class_init.test.w](../../../../../examples/tests/valid/mutation_after_class_init.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [INFO] hi » root/env0/Counter/Resource
Bundled code (2405 bytes).

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Counter/Resource
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"start","args":["<ABSOLUTE>/c811d52b4378afd7a5c09fd79c89f55d0bf9685446"]}

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":{}}

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Counter/Resource
root/env0/Counter/Resource started

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Queue/Bucket/oncreate
root/env0/Queue/Bucket/oncreate started

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Queue/Bucket
root/env0/Queue/Bucket started

[<TIMESTAMP>] [VERBOSE] hi » root/env0/test:hi/Handler
root/env0/test:hi/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Queue/Bucket/Policy
root/env0/Queue/Bucket/Policy started

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Queue/Bucket/oncreate/OnMessage0
root/env0/Queue/Bucket/oncreate/OnMessage0 started

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Queue/Bucket/oncreate/Policy
root/env0/Queue/Bucket/oncreate/Policy started

[<TIMESTAMP>] [VERBOSE] hi » root/env0/test:hi/Handler
Bundled code (2568 bytes).

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Queue/Bucket/oncreate/TopicEventMapping0
root/env0/Queue/Bucket/oncreate/TopicEventMapping0 started

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Queue/Bucket/oncreate/OnMessage0
Bundled code (2559 bytes).

[<TIMESTAMP>] [VERBOSE] hi » root/env0/test:hi/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] hi » root/env0/test:hi/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Queue/Bucket/oncreate
Sending message (message=message1, subscriber=sim-6).

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Queue/Bucket/oncreate/OnMessage0
InvokeAsync (payload="message1").

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Queue/Bucket/oncreate/OnMessage0
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Queue/Bucket/oncreate/OnMessage0
Sent a message to the sandbox: {"fn":"handler","args":["message1"]}

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Queue/Bucket/oncreate
Publish (messages=message1).

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Queue/Bucket
Put (key=message1).

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek"]}

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Counter/Resource
peek()

[<TIMESTAMP>] [INFO] hi » root/env0/Queue/Bucket/oncreate/OnMessage0
received message1

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc"]}

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Counter/Resource
inc()

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Queue/Bucket/oncreate/OnMessage0
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek"]}

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":1}

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Counter/Resource
peek()

[<TIMESTAMP>] [VERBOSE] hi » root/env0/test:hi/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] hi » root/env0/test:hi/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] hi » root/env0/test:hi/Handler
root/env0/test:hi/Handler stopped

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Queue/Bucket/oncreate/Policy
root/env0/Queue/Bucket/oncreate/Policy stopped

[<TIMESTAMP>] [VERBOSE] hi » root/env0/test:hi/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Queue/Bucket/oncreate/TopicEventMapping0
root/env0/Queue/Bucket/oncreate/TopicEventMapping0 stopped

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Queue/Bucket/oncreate/OnMessage0
root/env0/Queue/Bucket/oncreate/OnMessage0 stopped

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"stop","args":[]}

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Counter/Resource
root/env0/Counter/Resource stopped

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Queue/Bucket/Policy
root/env0/Queue/Bucket/Policy stopped

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Counter/Resource
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Queue/Bucket/oncreate/OnMessage0
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Queue/Bucket
root/env0/Queue/Bucket stopped

[<TIMESTAMP>] [VERBOSE] hi » root/env0/Queue/Bucket/oncreate
root/env0/Queue/Bucket/oncreate stopped

pass ─ mutation_after_class_init.test.wsim » root/env0/test:hi

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

