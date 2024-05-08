# [redis.test.w](../../../../../examples/tests/valid/redis.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Queue
root/env0/Queue started

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Redis/Container
$ docker inspect redis@sha256:e50c7e23f79ae81351beacb20e004720d4bed657415e68c2b1a2b5557c075ce0

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Redis/Container
Pulling redis@sha256:e50c7e23f79ae81351beacb20e004720d4bed657415e68c2b1a2b5557c075ce0...

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Redis/Container
$ docker pull redis@sha256:e50c7e23f79ae81351beacb20e004720d4bed657415e68c2b1a2b5557c075ce0

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Redis/Container
Starting container from redis@sha256:e50c7e23f79ae81351beacb20e004720d4bed657415e68c2b1a2b5557c075ce0

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Redis/Container
$ docker run -i --rm --name wing-01hxcctvygn5wxwjg8vgr1afm1 -p 6379 redis@sha256:e50c7e23f79ae81351beacb20e004720d4bed657415e68c2b1a2b5557c075ce0

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Redis/Container
Waiting for container to listen to 6379

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Redis/Container
$ docker inspect wing-01hxcctvygn5wxwjg8vgr1afm1

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Redis/Container
$ docker inspect wing-01hxcctvygn5wxwjg8vgr1afm1

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Redis/Container
Container redis@sha256:e50c7e23f79ae81351beacb20e004720d4bed657415e68c2b1a2b5557c075ce0 started

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Redis/Container
root/env0/Redis/Container started

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Redis
root/env0/Redis started

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/r2/Container
$ docker inspect redis@sha256:e50c7e23f79ae81351beacb20e004720d4bed657415e68c2b1a2b5557c075ce0

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/r2/Container
Image redis@sha256:e50c7e23f79ae81351beacb20e004720d4bed657415e68c2b1a2b5557c075ce0 found, No need to build or pull.

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/r2/Container
Starting container from redis@sha256:e50c7e23f79ae81351beacb20e004720d4bed657415e68c2b1a2b5557c075ce0

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/r2/Container
$ docker run -i --rm --name wing-01hxccv01rhj6vgnmf207c6b0h -p 6379 redis@sha256:e50c7e23f79ae81351beacb20e004720d4bed657415e68c2b1a2b5557c075ce0

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/r2/Container
Waiting for container to listen to 6379

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/r2/Container
$ docker inspect wing-01hxccv01rhj6vgnmf207c6b0h

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/r2/Container
$ docker inspect wing-01hxccv01rhj6vgnmf207c6b0h

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/r2/Container
Container redis@sha256:e50c7e23f79ae81351beacb20e004720d4bed657415e68c2b1a2b5557c075ce0 started

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/r2/Container
root/env0/r2/Container started

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/r2
root/env0/r2 started

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/test:testing Redis/Handler
root/env0/test:testing Redis/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Queue/SetConsumer0
root/env0/Queue/SetConsumer0 started

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Queue/Policy
root/env0/Queue/Policy started

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/test:testing Redis/Handler
Bundled code (2480 bytes).

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Queue/SetConsumer0
Bundled code (2079 bytes).

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Queue/QueueEventMapping0
root/env0/Queue/QueueEventMapping0 started

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/test:testing Redis/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/test:testing Redis/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Queue
Push (messages=world!).

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Queue
Sending messages (messages=["world!"], subscriber=sim-7).

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Queue/SetConsumer0
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Queue/SetConsumer0
Sent a message to the sandbox: {"fn":"handler","args":["{\"messages\":[{\"retentionTimeout\":\"2024-05-08T16:23:34.357Z\",\"payload\":\"world!\",\"remainingDeliveryAttempts\":1}]}"]}

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Queue/SetConsumer0
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Queue/SetConsumer0
Invoke (payload="{\"messages\":[{\"retentionTimeout\":\"2024-05-08T16:23:34.357Z\",\"payload\":\"world!\",\"remainingDeliveryAttempts\":1}]}").

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/test:testing Redis/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/test:testing Redis/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/test:testing Redis/Handler
root/env0/test:testing Redis/Handler stopped

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Queue/QueueEventMapping0
root/env0/Queue/QueueEventMapping0 stopped

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Queue/Policy
root/env0/Queue/Policy stopped

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/test:testing Redis/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Queue
root/env0/Queue stopped

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Queue/SetConsumer0
root/env0/Queue/SetConsumer0 stopped

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Redis
root/env0/Redis stopped

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/r2
root/env0/r2 stopped

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Queue/SetConsumer0
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Redis/Container
Stopping container wing-01hxcctvygn5wxwjg8vgr1afm1

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Redis/Container
Sending SIGTERM to container

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Redis/Container
Container shutdown successfully

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/Redis/Container
root/env0/Redis/Container stopped

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/r2/Container
Stopping container wing-01hxccv01rhj6vgnmf207c6b0h

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/r2/Container
Sending SIGTERM to container

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/r2/Container
Container shutdown successfully

[<TIMESTAMP>] [VERBOSE] testing Redis » root/env0/r2/Container
root/env0/r2/Container stopped

pass ─ redis.test.wsim » root/env0/test:testing Redis

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

