# [dead-letter-queue.test.w](../../../../../../examples/tests/sdk_tests/queue/dead-letter-queue.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [INFO] (no test) » root/env0/Counter/Resource
Bundled code (2405 bytes).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"start","args":["<ABSOLUTE>/c811d52b4378afd7a5c09fd79c89f55d0bf9685446"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":{}}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
root/env0/Counter/Resource started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/dlq without retries
root/env0/dlq without retries started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries
root/env0/queue without retries started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/one execution and send fail message to dead-letter queue/Handler
root/env0/one execution and send fail message to dead-letter queue/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/one execution and send fail message to dead-letter queue/Handler
Bundled code (2773 bytes).

[<TIMESTAMP>] [INFO] (no test) » root/env1/Counter/Resource
Bundled code (2405 bytes).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
Sent a message to the sandbox: {"fn":"start","args":["<ABSOLUTE>/c8e3d914d3cc1223e0a6f6afcee7177fc945e060fd"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":{}}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
root/env1/Counter/Resource started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/dlq with retries
root/env1/dlq with retries started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries
root/env1/queue with retries started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/one execution, two retries and send the fail message to dead-letter queue/Handler
root/env1/one execution, two retries and send the fail message to dead-letter queue/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/dlq without retries/Policy
root/env0/dlq without retries/Policy started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries/SetConsumer0
root/env0/queue without retries/SetConsumer0 started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries/Policy
root/env0/queue without retries/Policy started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/one execution, two retries and send the fail message to dead-letter queue/Handler
Bundled code (2767 bytes).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries/SetConsumer0
Bundled code (2339 bytes).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries/QueueEventMapping0
root/env0/queue without retries/QueueEventMapping0 started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/dlq with retries
root/env0/dlq with retries started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/dlq with retries/Policy
root/env0/dlq with retries/Policy started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue with retries/SetConsumer0
root/env0/queue with retries/SetConsumer0 started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue with retries
root/env0/queue with retries started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue with retries/Policy
root/env0/queue with retries/Policy started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue with retries/QueueEventMapping0
root/env0/queue with retries/QueueEventMapping0 started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue with retries/SetConsumer0
Bundled code (2339 bytes).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/dlq without retries
root/env1/dlq without retries started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/dlq without retries/Policy
root/env1/dlq without retries/Policy started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue without retries/SetConsumer0
root/env1/queue without retries/SetConsumer0 started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue without retries
root/env1/queue without retries started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue without retries/Policy
root/env1/queue without retries/Policy started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue without retries/SetConsumer0
Bundled code (2339 bytes).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue without retries/QueueEventMapping0
root/env1/queue without retries/QueueEventMapping0 started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/dlq with retries/Policy
root/env1/dlq with retries/Policy started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries/SetConsumer0
root/env1/queue with retries/SetConsumer0 started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries/Policy
root/env1/queue with retries/Policy started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries/QueueEventMapping0
root/env1/queue with retries/QueueEventMapping0 started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries/SetConsumer0
Bundled code (2339 bytes).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/one execution and send fail message to dead-letter queue/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/one execution and send fail message to dead-letter queue/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries
Push (messages=Hello).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries
Push (messages=fail).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries
Push (messages=World!).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek","Hello"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
peek("Hello")

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries
Sending messages (messages=["Hello"], subscriber=sim-10).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries/SetConsumer0
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries/SetConsumer0
Sent a message to the sandbox: {"fn":"handler","args":["{\"messages\":[{\"retentionTimeout\":\"2024-05-08T16:20:39.924Z\",\"payload\":\"Hello\",\"remainingDeliveryAttempts\":1}]}"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries
Sending messages (messages=["fail"], subscriber=sim-10).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries/SetConsumer0
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries/SetConsumer0
Sent a message to the sandbox: {"fn":"handler","args":["{\"messages\":[{\"retentionTimeout\":\"2024-05-08T16:20:39.928Z\",\"payload\":\"fail\",\"remainingDeliveryAttempts\":1}]}"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries
Sending messages (messages=["World!"], subscriber=sim-10).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries/SetConsumer0
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries/SetConsumer0
Sent a message to the sandbox: {"fn":"handler","args":["{\"messages\":[{\"retentionTimeout\":\"2024-05-08T16:20:39.930Z\",\"payload\":\"World!\",\"remainingDeliveryAttempts\":1}]}"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek","Hello"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
peek("Hello")

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc",1,"World!"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
inc(1, "World!")

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries/SetConsumer0
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries/SetConsumer0
Invoke (payload="{\"messages\":[{\"retentionTimeout\":\"2024-05-08T16:20:39.930Z\",\"payload\":\"World!\",\"remainingDeliveryAttempts\":1}]}").

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc",1,"fail"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
inc(1, "fail")

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc",1,"Hello"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries/SetConsumer0
Received a message from the sandbox: {"type":"ok","value":"[{\"retentionTimeout\":\"2024-05-08T16:20:39.928Z\",\"payload\":\"fail\",\"remainingDeliveryAttempts\":1}]"}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries/SetConsumer0
Invoke (payload="{\"messages\":[{\"retentionTimeout\":\"2024-05-08T16:20:39.928Z\",\"payload\":\"fail\",\"remainingDeliveryAttempts\":1}]}").

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
inc(1, "Hello")

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/dlq without retries
Push (messages=fail).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries/SetConsumer0
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries/SetConsumer0
Invoke (payload="{\"messages\":[{\"retentionTimeout\":\"2024-05-08T16:20:39.924Z\",\"payload\":\"Hello\",\"remainingDeliveryAttempts\":1}]}").

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek","Hello"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":1}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
peek("Hello")

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek","World!"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":1}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
peek("World!")

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek","fail"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":1}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
peek("fail")

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/dlq without retries
Pop ().

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/one execution and send fail message to dead-letter queue/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/one execution and send fail message to dead-letter queue/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/one execution, two retries and send the fail message to dead-letter queue/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/one execution, two retries and send the fail message to dead-letter queue/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries
Push (messages=Hello).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries
Push (messages=fail).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries
Push (messages=World!).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek","Hello"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
peek("Hello")

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries
Sending messages (messages=["World!"], subscriber=sim-26).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries/SetConsumer0
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries/SetConsumer0
Sent a message to the sandbox: {"fn":"handler","args":["{\"messages\":[{\"retentionTimeout\":\"2024-05-08T16:20:40.278Z\",\"payload\":\"World!\",\"remainingDeliveryAttempts\":1}]}"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries
Sending messages (messages=["Hello"], subscriber=sim-26).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries/SetConsumer0
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries/SetConsumer0
Sent a message to the sandbox: {"fn":"handler","args":["{\"messages\":[{\"retentionTimeout\":\"2024-05-08T16:20:40.264Z\",\"payload\":\"Hello\",\"remainingDeliveryAttempts\":1}]}"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries
Sending messages (messages=["fail"], subscriber=sim-26).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries/SetConsumer0
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries/SetConsumer0
Sent a message to the sandbox: {"fn":"handler","args":["{\"messages\":[{\"retentionTimeout\":\"2024-05-08T16:20:40.273Z\",\"payload\":\"fail\",\"remainingDeliveryAttempts\":1}]}"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek","Hello"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
peek("Hello")

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc",1,"World!"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
inc(1, "World!")

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries/SetConsumer0
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries/SetConsumer0
Invoke (payload="{\"messages\":[{\"retentionTimeout\":\"2024-05-08T16:20:40.278Z\",\"payload\":\"World!\",\"remainingDeliveryAttempts\":1}]}").

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc",1,"Hello"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
inc(1, "Hello")

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc",1,"fail"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
inc(1, "fail")

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries/SetConsumer0
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries/SetConsumer0
Invoke (payload="{\"messages\":[{\"retentionTimeout\":\"2024-05-08T16:20:40.264Z\",\"payload\":\"Hello\",\"remainingDeliveryAttempts\":1}]}").

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries/SetConsumer0
Received a message from the sandbox: {"type":"ok","value":"[{\"retentionTimeout\":\"2024-05-08T16:20:40.273Z\",\"payload\":\"fail\",\"remainingDeliveryAttempts\":1}]"}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries/SetConsumer0
Invoke (payload="{\"messages\":[{\"retentionTimeout\":\"2024-05-08T16:20:40.273Z\",\"payload\":\"fail\",\"remainingDeliveryAttempts\":1}]}").

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek","Hello"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":1}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
peek("Hello")

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek","World!"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":1}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
peek("World!")

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek","fail"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":1}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
peek("fail")

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries
Sending messages (messages=["fail"], subscriber=sim-26).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries/SetConsumer0
Sent a message to the sandbox: {"fn":"handler","args":["{\"messages\":[{\"retentionTimeout\":\"2024-05-08T16:20:40.273Z\",\"payload\":\"fail\",\"remainingDeliveryAttempts\":2}]}"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc",1,"fail"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":1}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
inc(1, "fail")

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries/SetConsumer0
Received a message from the sandbox: {"type":"ok","value":"[{\"retentionTimeout\":\"2024-05-08T16:20:40.273Z\",\"payload\":\"fail\",\"remainingDeliveryAttempts\":2}]"}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries/SetConsumer0
Invoke (payload="{\"messages\":[{\"retentionTimeout\":\"2024-05-08T16:20:40.273Z\",\"payload\":\"fail\",\"remainingDeliveryAttempts\":2}]}").

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/dlq with retries
Push (messages=fail).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek","fail"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
Received a message from the sandbox: {"type":"ok","value":2}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
peek("fail")

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/dlq with retries
Pop ().

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/one execution, two retries and send the fail message to dead-letter queue/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/one execution, two retries and send the fail message to dead-letter queue/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/one execution and send fail message to dead-letter queue/Handler
root/env0/one execution and send fail message to dead-letter queue/Handler stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries/QueueEventMapping0
root/env0/queue without retries/QueueEventMapping0 stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries/Policy
root/env0/queue without retries/Policy stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries/SetConsumer0
root/env0/queue without retries/SetConsumer0 stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/one execution and send fail message to dead-letter queue/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries/SetConsumer0
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries/SetConsumer0
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries/SetConsumer0
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue with retries/QueueEventMapping0
root/env0/queue with retries/QueueEventMapping0 stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue with retries/Policy
root/env0/queue with retries/Policy stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue with retries/SetConsumer0
root/env0/queue with retries/SetConsumer0 stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
Sent a message to the sandbox: {"fn":"stop","args":[]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
root/env0/Counter/Resource stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Counter/Resource
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue without retries
root/env0/queue without retries stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/dlq without retries/Policy
root/env0/dlq without retries/Policy stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/dlq without retries
root/env0/dlq without retries stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/one execution, two retries and send the fail message to dead-letter queue/Handler
root/env1/one execution, two retries and send the fail message to dead-letter queue/Handler stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue without retries/QueueEventMapping0
root/env1/queue without retries/QueueEventMapping0 stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue without retries/Policy
root/env1/queue without retries/Policy stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue without retries/SetConsumer0
root/env1/queue without retries/SetConsumer0 stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/one execution, two retries and send the fail message to dead-letter queue/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries/QueueEventMapping0
root/env1/queue with retries/QueueEventMapping0 stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries/Policy
root/env1/queue with retries/Policy stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries/SetConsumer0
root/env1/queue with retries/SetConsumer0 stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
Sent a message to the sandbox: {"fn":"stop","args":[]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries/SetConsumer0
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries/SetConsumer0
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries/SetConsumer0
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
root/env1/Counter/Resource stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/Counter/Resource
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue with retries
root/env1/queue with retries stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/dlq with retries/Policy
root/env1/dlq with retries/Policy stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/dlq with retries
root/env1/dlq with retries stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/dlq with retries/Policy
root/env0/dlq with retries/Policy stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/queue with retries
root/env0/queue with retries stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/dlq with retries
root/env0/dlq with retries stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/dlq without retries/Policy
root/env1/dlq without retries/Policy stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/queue without retries
root/env1/queue without retries stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env1/dlq without retries
root/env1/dlq without retries stopped

pass ─ dead-letter-queue.test.wsim » root/env0/one execution and send fail message to dead-letter queue                 
pass ─ dead-letter-queue.test.wsim » root/env1/one execution, two retries and send the fail message to dead-letter queue

Tests 2 passed (2)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

