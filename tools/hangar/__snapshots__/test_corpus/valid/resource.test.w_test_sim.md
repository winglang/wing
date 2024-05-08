# [resource.test.w](../../../../../examples/tests/valid/resource.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] test » root/env0/Bucket
root/env0/Bucket started

[<TIMESTAMP>] [INFO] test » root/env0/Bar/Foo/Counter/Resource
Bundled code (2405 bytes).

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bar/Foo/Counter/Resource
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bar/Foo/Counter/Resource
Sent a message to the sandbox: {"fn":"start","args":["<ABSOLUTE>/c860011ac1ee15282c05e6f3008351ba840698fda4"]}

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bar/Foo/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":{}}

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bar/Foo/Counter/Resource
root/env0/Bar/Foo/Counter/Resource started

[<TIMESTAMP>] [VERBOSE] test » root/env0/test:test/Handler
root/env0/test:test/Handler started

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/b2/oncreate
root/env1/BigPublisher/b2/oncreate started

[<TIMESTAMP>] [VERBOSE] test » root/env0/test:test/Handler
Bundled code (4917 bytes).

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/b2
root/env1/BigPublisher/b2 started

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Queue
root/env1/BigPublisher/Queue started

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Topic
root/env1/BigPublisher/Topic started

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Bucket
root/env1/BigPublisher/Bucket started

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/test:dependency cycles/Handler
root/env1/test:dependency cycles/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bucket/Policy
root/env0/Bucket/Policy started

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/test:dependency cycles/Handler
Bundled code (3561 bytes).

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/Bucket
root/env0/BigPublisher/Bucket started

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/Bucket/Policy
root/env0/BigPublisher/Bucket/Policy started

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/b2/oncreate
root/env0/BigPublisher/b2/oncreate started

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/b2
root/env0/BigPublisher/b2 started

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/b2/Policy
root/env0/BigPublisher/b2/Policy started

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/Queue
root/env0/BigPublisher/Queue started

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/b2/oncreate/OnMessage0
root/env0/BigPublisher/b2/oncreate/OnMessage0 started

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/b2/oncreate/Policy
root/env0/BigPublisher/b2/oncreate/Policy started

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/b2/oncreate/OnMessage0
Bundled code (1869 bytes).

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/b2/oncreate/TopicEventMapping0
root/env0/BigPublisher/b2/oncreate/TopicEventMapping0 started

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/Queue/SetConsumer0
root/env0/BigPublisher/Queue/SetConsumer0 started

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/Queue/Policy
root/env0/BigPublisher/Queue/Policy started

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/Queue/SetConsumer0
Bundled code (2148 bytes).

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/Queue/QueueEventMapping0
root/env0/BigPublisher/Queue/QueueEventMapping0 started

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/Topic
root/env0/BigPublisher/Topic started

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/Topic/OnMessage0
root/env0/BigPublisher/Topic/OnMessage0 started

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/Topic/Policy
root/env0/BigPublisher/Topic/Policy started

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/Topic/TopicEventMapping0
root/env0/BigPublisher/Topic/TopicEventMapping0 started

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/Topic/OnMessage0
Bundled code (1545 bytes).

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/Bucket
root/env1/Bucket started

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/Bucket/Policy
root/env1/Bucket/Policy started

[<TIMESTAMP>] [INFO] dependency cycles » root/env1/Bar/Foo/Counter/Resource
Bundled code (2405 bytes).

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/Bar/Foo/Counter/Resource
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/Bar/Foo/Counter/Resource
Sent a message to the sandbox: {"fn":"start","args":["<ABSOLUTE>/c8403670ef606e7d0c75c34493e13ab21cce50b84d"]}

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/Bar/Foo/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":{}}

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/Bar/Foo/Counter/Resource
root/env1/Bar/Foo/Counter/Resource started

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Bucket/Policy
root/env1/BigPublisher/Bucket/Policy started

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/b2/Policy
root/env1/BigPublisher/b2/Policy started

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/b2/oncreate/OnMessage0
root/env1/BigPublisher/b2/oncreate/OnMessage0 started

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/b2/oncreate/Policy
root/env1/BigPublisher/b2/oncreate/Policy started

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/b2/oncreate/TopicEventMapping0
root/env1/BigPublisher/b2/oncreate/TopicEventMapping0 started

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Queue/SetConsumer0
root/env1/BigPublisher/Queue/SetConsumer0 started

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/b2/oncreate/OnMessage0
Bundled code (1869 bytes).

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Queue/Policy
root/env1/BigPublisher/Queue/Policy started

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Queue/QueueEventMapping0
root/env1/BigPublisher/Queue/QueueEventMapping0 started

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Topic/OnMessage0
root/env1/BigPublisher/Topic/OnMessage0 started

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Queue/SetConsumer0
Bundled code (2148 bytes).

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Topic/Policy
root/env1/BigPublisher/Topic/Policy started

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Topic/TopicEventMapping0
root/env1/BigPublisher/Topic/TopicEventMapping0 started

[<TIMESTAMP>] [VERBOSE] test » root/env0/test:test/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] test » root/env0/test:test/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Topic/OnMessage0
Bundled code (1545 bytes).

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bar/Foo/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc",110]}

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bar/Foo/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bar/Foo/Counter/Resource
inc(110)

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bar/Foo/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["dec",10]}

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bar/Foo/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":110}

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bar/Foo/Counter/Resource
dec(10)

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bar/Foo/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc",110]}

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bar/Foo/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":100}

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bar/Foo/Counter/Resource
inc(110)

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bar/Foo/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["dec",10]}

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bar/Foo/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":210}

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bar/Foo/Counter/Resource
dec(10)

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bar/Foo/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc"]}

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bar/Foo/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":200}

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bar/Foo/Counter/Resource
inc()

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bar/Foo/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek"]}

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bar/Foo/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":201}

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bar/Foo/Counter/Resource
peek()

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bucket
Put (key=foo).

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bucket
Get (key=foo).

[<TIMESTAMP>] [INFO] test » root/env0/test:test/Handler
counter is: 201

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bucket
List (prefix=null).

[<TIMESTAMP>] [VERBOSE] test » root/env0/test:test/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] test » root/env0/test:test/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/test:dependency cycles/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/test:dependency cycles/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Topic
Sending message (message=foo, subscriber=sim-38).

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Topic/OnMessage0
InvokeAsync (payload="foo").

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Topic/OnMessage0
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Topic/OnMessage0
Sent a message to the sandbox: {"fn":"handler","args":["foo"]}

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Topic
Publish (messages=foo).

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Queue
Push (messages=foo).

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/b2/oncreate
Sending message (message=foo, subscriber=sim-32).

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/b2/oncreate/OnMessage0
InvokeAsync (payload="foo").

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/b2/oncreate/OnMessage0
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/b2/oncreate/OnMessage0
Sent a message to the sandbox: {"fn":"handler","args":["foo"]}

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/b2/oncreate
Publish (messages=foo).

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/b2
Put (key=foo).

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Bucket
List (prefix=null).

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Queue
Sending messages (messages=["foo"], subscriber=sim-35).

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Queue/SetConsumer0
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Queue/SetConsumer0
Sent a message to the sandbox: {"fn":"handler","args":["{\"messages\":[{\"retentionTimeout\":\"2024-05-08T16:23:26.649Z\",\"payload\":\"foo\",\"remainingDeliveryAttempts\":1}]}"]}

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Bucket
Put (key=foo1.txt).

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Topic/OnMessage0
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Bucket
Put (key=foo2.txt).

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Queue
Push (messages=foo).

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Queue/SetConsumer0
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Queue/SetConsumer0
Invoke (payload="{\"messages\":[{\"retentionTimeout\":\"2024-05-08T16:23:26.649Z\",\"payload\":\"foo\",\"remainingDeliveryAttempts\":1}]}").

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/b2/oncreate/OnMessage0
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Bucket
List (prefix=null).

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Queue
Sending messages (messages=["foo"], subscriber=sim-35).

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Bucket
List (prefix=null).

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Queue/SetConsumer0
Sent a message to the sandbox: {"fn":"handler","args":["{\"messages\":[{\"retentionTimeout\":\"2024-05-08T16:23:26.733Z\",\"payload\":\"foo\",\"remainingDeliveryAttempts\":1}]}"]}

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/test:dependency cycles/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/test:dependency cycles/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] test » root/env0/test:test/Handler
root/env0/test:test/Handler stopped

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bucket/Policy
root/env0/Bucket/Policy stopped

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bucket
root/env0/Bucket stopped

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bar/Foo/Counter/Resource
Sent a message to the sandbox: {"fn":"stop","args":[]}

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bar/Foo/Counter/Resource
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bar/Foo/Counter/Resource
root/env0/Bar/Foo/Counter/Resource stopped

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Bucket
Put (key=foo2.txt).

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/test:dependency cycles/Handler
root/env1/test:dependency cycles/Handler stopped

[<TIMESTAMP>] [VERBOSE] test » root/env0/test:test/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/b2/Policy
root/env1/BigPublisher/b2/Policy stopped

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Queue/SetConsumer0
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Queue/SetConsumer0
Invoke (payload="{\"messages\":[{\"retentionTimeout\":\"2024-05-08T16:23:26.733Z\",\"payload\":\"foo\",\"remainingDeliveryAttempts\":1}]}").

[<TIMESTAMP>] [VERBOSE] test » root/env0/Bar/Foo/Counter/Resource
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/b2
root/env1/BigPublisher/b2 stopped

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/b2/oncreate/Policy
root/env1/BigPublisher/b2/oncreate/Policy stopped

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/b2/oncreate/TopicEventMapping0
root/env1/BigPublisher/b2/oncreate/TopicEventMapping0 stopped

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/test:dependency cycles/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/b2/oncreate
root/env1/BigPublisher/b2/oncreate stopped

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/b2/oncreate/OnMessage0
root/env1/BigPublisher/b2/oncreate/OnMessage0 stopped

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Queue/QueueEventMapping0
root/env1/BigPublisher/Queue/QueueEventMapping0 stopped

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Queue/Policy
root/env1/BigPublisher/Queue/Policy stopped

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/b2/oncreate/OnMessage0
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Queue
root/env1/BigPublisher/Queue stopped

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Topic/Policy
root/env1/BigPublisher/Topic/Policy stopped

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Topic/TopicEventMapping0
root/env1/BigPublisher/Topic/TopicEventMapping0 stopped

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Topic
root/env1/BigPublisher/Topic stopped

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Bucket/Policy
root/env1/BigPublisher/Bucket/Policy stopped

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Queue/SetConsumer0
root/env1/BigPublisher/Queue/SetConsumer0 stopped

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Topic/OnMessage0
root/env1/BigPublisher/Topic/OnMessage0 stopped

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Bucket
root/env1/BigPublisher/Bucket stopped

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Queue/SetConsumer0
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/Bucket/Policy
root/env0/BigPublisher/Bucket/Policy stopped

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/b2/Policy
root/env0/BigPublisher/b2/Policy stopped

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/BigPublisher/Topic/OnMessage0
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/b2
root/env0/BigPublisher/b2 stopped

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/b2/oncreate/Policy
root/env0/BigPublisher/b2/oncreate/Policy stopped

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/b2/oncreate/TopicEventMapping0
root/env0/BigPublisher/b2/oncreate/TopicEventMapping0 stopped

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/b2/oncreate
root/env0/BigPublisher/b2/oncreate stopped

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/b2/oncreate/OnMessage0
root/env0/BigPublisher/b2/oncreate/OnMessage0 stopped

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/Queue/QueueEventMapping0
root/env0/BigPublisher/Queue/QueueEventMapping0 stopped

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/Queue/Policy
root/env0/BigPublisher/Queue/Policy stopped

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/Queue
root/env0/BigPublisher/Queue stopped

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/Queue/SetConsumer0
root/env0/BigPublisher/Queue/SetConsumer0 stopped

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/Topic/Policy
root/env0/BigPublisher/Topic/Policy stopped

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/Topic/TopicEventMapping0
root/env0/BigPublisher/Topic/TopicEventMapping0 stopped

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/Topic/OnMessage0
root/env0/BigPublisher/Topic/OnMessage0 stopped

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/Bucket
root/env0/BigPublisher/Bucket stopped

[<TIMESTAMP>] [VERBOSE] test » root/env0/BigPublisher/Topic
root/env0/BigPublisher/Topic stopped

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/Bucket/Policy
root/env1/Bucket/Policy stopped

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/Bucket
root/env1/Bucket stopped

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/Bar/Foo/Counter/Resource
Sent a message to the sandbox: {"fn":"stop","args":[]}

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/Bar/Foo/Counter/Resource
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/Bar/Foo/Counter/Resource
root/env1/Bar/Foo/Counter/Resource stopped

pass ─ resource.test.wsim » root/env0/test:test             
pass ─ resource.test.wsim » root/env1/test:dependency cycles

Tests 2 passed (2)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] dependency cycles » root/env1/Bar/Foo/Counter/Resource
Sandbox child process stopped.

```

