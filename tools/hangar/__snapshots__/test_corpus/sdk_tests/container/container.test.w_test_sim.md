# [container.test.w](../../../../../../examples/tests/sdk_tests/container/container.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] get echo » root/env0/http-echo
$ docker inspect hashicorp/http-echo

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/http-echo
Pulling hashicorp/http-echo...

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/http-echo
$ docker pull hashicorp/http-echo

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/http-echo
Starting container from hashicorp/http-echo

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/http-echo
$ docker run -i --rm --name wing-01hxccp0vttg94bpps7q1nhts3 -p 5678 hashicorp/http-echo -text=bang

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/http-echo
Waiting for container to listen to 5678

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/http-echo
$ docker inspect wing-01hxccp0vttg94bpps7q1nhts3

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/http-echo
$ docker inspect wing-01hxccp0vttg94bpps7q1nhts3

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/http-echo
Container hashicorp/http-echo started

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/http-echo
root/env0/http-echo started

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/test:get echo/Handler
root/env0/test:get echo/Handler started

[<TIMESTAMP>] [VERBOSE] get app » root/env1/my-app
$ docker inspect my-app:a9ae83b54b1ec21faa1a3255f05c095c

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/test:get echo/Handler
Bundled code (991 bytes).

[<TIMESTAMP>] [VERBOSE] get app » root/env1/my-app
Building my-app:a9ae83b54b1ec21faa1a3255f05c095c from ./my-docker-image...

[<TIMESTAMP>] [VERBOSE] get app » root/env1/my-app
$ docker build -t my-app:a9ae83b54b1ec21faa1a3255f05c095c ./my-docker-image

[<TIMESTAMP>] [VERBOSE] get app » root/env1/my-app
Starting container from my-app:a9ae83b54b1ec21faa1a3255f05c095c

[<TIMESTAMP>] [VERBOSE] get app » root/env1/my-app
$ docker run -i --rm --name wing-01hxccp3xrbjk8vvbkq1f92a3a -p 3000 my-app:a9ae83b54b1ec21faa1a3255f05c095c

[<TIMESTAMP>] [VERBOSE] get app » root/env1/my-app
Waiting for container to listen to 3000

[<TIMESTAMP>] [VERBOSE] get app » root/env1/my-app
$ docker inspect wing-01hxccp3xrbjk8vvbkq1f92a3a

[<TIMESTAMP>] [VERBOSE] get app » root/env1/my-app
$ docker inspect wing-01hxccp3xrbjk8vvbkq1f92a3a

[<TIMESTAMP>] [VERBOSE] get app » root/env1/my-app
Container my-app:a9ae83b54b1ec21faa1a3255f05c095c started

[<TIMESTAMP>] [VERBOSE] get app » root/env1/my-app
root/env1/my-app started

[<TIMESTAMP>] [VERBOSE] get app » root/env1/test:get app/Handler
root/env1/test:get app/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] get app » root/env1/test:get app/Handler
Bundled code (987 bytes).

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/my-app
$ docker inspect my-app:a9ae83b54b1ec21faa1a3255f05c095c

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/my-app
Image my-app:a9ae83b54b1ec21faa1a3255f05c095c found, No need to build or pull.

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/my-app
Starting container from my-app:a9ae83b54b1ec21faa1a3255f05c095c

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/my-app
$ docker run -i --rm --name wing-01hxccpcbesr5vb877f5ejj8gj -p 3000 my-app:a9ae83b54b1ec21faa1a3255f05c095c

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/my-app
Waiting for container to listen to 3000

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/my-app
$ docker inspect wing-01hxccpcbesr5vb877f5ejj8gj

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/my-app
$ docker inspect wing-01hxccpcbesr5vb877f5ejj8gj

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/my-app
Container my-app:a9ae83b54b1ec21faa1a3255f05c095c started

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/my-app
root/env0/my-app started

[<TIMESTAMP>] [VERBOSE] get app » root/env1/http-echo
$ docker inspect hashicorp/http-echo

[<TIMESTAMP>] [VERBOSE] get app » root/env1/http-echo
Image hashicorp/http-echo found, No need to build or pull.

[<TIMESTAMP>] [VERBOSE] get app » root/env1/http-echo
Starting container from hashicorp/http-echo

[<TIMESTAMP>] [VERBOSE] get app » root/env1/http-echo
$ docker run -i --rm --name wing-01hxccpcpmehepahc0myn41mr4 -p 5678 hashicorp/http-echo -text=bang

[<TIMESTAMP>] [VERBOSE] get app » root/env1/http-echo
Waiting for container to listen to 5678

[<TIMESTAMP>] [VERBOSE] get app » root/env1/http-echo
$ docker inspect wing-01hxccpcpmehepahc0myn41mr4

[<TIMESTAMP>] [VERBOSE] get app » root/env1/http-echo
$ docker inspect wing-01hxccpcpmehepahc0myn41mr4

[<TIMESTAMP>] [VERBOSE] get app » root/env1/http-echo
Container hashicorp/http-echo started

[<TIMESTAMP>] [VERBOSE] get app » root/env1/http-echo
root/env1/http-echo started

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/test:get echo/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/test:get echo/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [INFO] get echo » root/env0/test:get echo/Handler
bang

[<TIMESTAMP>] [INFO] get echo » root/env0/test:get echo/Handler


[<TIMESTAMP>] [VERBOSE] get echo » root/env0/test:get echo/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/test:get echo/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] get app » root/env1/test:get app/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] get app » root/env1/test:get app/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [INFO] get app » root/env1/test:get app/Handler
Hello, Wingnuts!

[<TIMESTAMP>] [VERBOSE] get app » root/env1/test:get app/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] get app » root/env1/test:get app/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/test:get echo/Handler
root/env0/test:get echo/Handler stopped

[<TIMESTAMP>] [VERBOSE] get app » root/env1/test:get app/Handler
root/env1/test:get app/Handler stopped

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/test:get echo/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/http-echo
Stopping container wing-01hxccp0vttg94bpps7q1nhts3

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/http-echo
Sending SIGTERM to container

[<TIMESTAMP>] [VERBOSE] get app » root/env1/test:get app/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/http-echo
Container shutdown successfully

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/http-echo
root/env0/http-echo stopped

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/my-app
Stopping container wing-01hxccpcbesr5vb877f5ejj8gj

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/my-app
Sending SIGTERM to container

[<TIMESTAMP>] [WARNING] get echo » root/env0/my-app
Timeout waiting for container root/env0/my-app to shutdown, removing forcefully

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/my-app
$ docker rm -f wing-01hxccpcbesr5vb877f5ejj8gj

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/my-app
Container shutdown successfully

[<TIMESTAMP>] [VERBOSE] get echo » root/env0/my-app
root/env0/my-app stopped

[<TIMESTAMP>] [VERBOSE] get app » root/env1/http-echo
Stopping container wing-01hxccpcpmehepahc0myn41mr4

[<TIMESTAMP>] [VERBOSE] get app » root/env1/http-echo
Sending SIGTERM to container

[<TIMESTAMP>] [VERBOSE] get app » root/env1/http-echo
Container shutdown successfully

[<TIMESTAMP>] [VERBOSE] get app » root/env1/http-echo
root/env1/http-echo stopped

[<TIMESTAMP>] [VERBOSE] get app » root/env1/my-app
Stopping container wing-01hxccp3xrbjk8vvbkq1f92a3a

[<TIMESTAMP>] [VERBOSE] get app » root/env1/my-app
Sending SIGTERM to container

[<TIMESTAMP>] [WARNING] get app » root/env1/my-app
Timeout waiting for container root/env1/my-app to shutdown, removing forcefully

[<TIMESTAMP>] [VERBOSE] get app » root/env1/my-app
$ docker rm -f wing-01hxccp3xrbjk8vvbkq1f92a3a

[<TIMESTAMP>] [VERBOSE] get app » root/env1/my-app
Container shutdown successfully

[<TIMESTAMP>] [VERBOSE] get app » root/env1/my-app
root/env1/my-app stopped

pass ─ container.test.wsim » root/env0/test:get echo
pass ─ container.test.wsim » root/env1/test:get app 

Tests 2 passed (2)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

