# [on-start.test.w](../../../../../../examples/tests/sdk_tests/resource/on-start.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [INFO] method calls fail if the resource fails to start » root/env0/OnStartThrower/Resource
Bundled code (2505 bytes).

[<TIMESTAMP>] [VERBOSE] method calls fail if the resource fails to start » root/env0/OnStartThrower/Resource
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] method calls fail if the resource fails to start » root/env0/OnStartThrower/Resource
Sent a message to the sandbox: {"fn":"start","args":["<ABSOLUTE>/c8716fa49de38fa7ddfe682268d5cf0d81f1e8913f"]}

[<TIMESTAMP>] [VERBOSE] method calls fail if the resource fails to start » root/env0/OnStartThrower/Resource
Received a message from the sandbox: {"type":"error","reason":{}}

[<TIMESTAMP>] [ERROR] method calls fail if the resource fails to start » root/env0/OnStartThrower/Resource
Error: unexpected error!
  --> on-start.test.w:5:5
  | 
  | inflight class OnStartThrowerBackend impl sim.IResource {
  |   pub onStart(ctx: sim.IResourceContext) {
5 |     throw "unexpected error!";
  |     ^
at onStart <ABSOLUTE>/on-start.test.w:5:5

[<TIMESTAMP>] [VERBOSE] method calls fail if the resource fails to start » root/env0/OnStartThrower/Resource
root/env0/OnStartThrower/Resource started

[<TIMESTAMP>] [VERBOSE] method calls fail if the resource fails to start » root/env0/test:method calls fail if the resource fails to start/Handler
root/env0/test:method calls fail if the resource fails to start/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] method calls fail if the resource fails to start » root/env0/test:method calls fail if the resource fails to start/Handler
Bundled code (1657 bytes).

[<TIMESTAMP>] [VERBOSE] method calls fail if the resource fails to start » root/env0/test:method calls fail if the resource fails to start/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] method calls fail if the resource fails to start » root/env0/test:method calls fail if the resource fails to start/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] method calls fail if the resource fails to start » root/env0/OnStartThrower/Resource
Sent a message to the sandbox: {"fn":"call","args":["noop"]}

[<TIMESTAMP>] [VERBOSE] method calls fail if the resource fails to start » root/env0/OnStartThrower/Resource
Received a message from the sandbox: {"type":"error","reason":{}}

[<TIMESTAMP>] [VERBOSE] method calls fail if the resource fails to start » root/env0/OnStartThrower/Resource
Error: resource not started (noop())

[<TIMESTAMP>] [VERBOSE] method calls fail if the resource fails to start » root/env0/test:method calls fail if the resource fails to start/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] method calls fail if the resource fails to start » root/env0/test:method calls fail if the resource fails to start/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] method calls fail if the resource fails to start » root/env0/test:method calls fail if the resource fails to start/Handler
root/env0/test:method calls fail if the resource fails to start/Handler stopped

[<TIMESTAMP>] [VERBOSE] method calls fail if the resource fails to start » root/env0/OnStartThrower/Resource
Sent a message to the sandbox: {"fn":"stop","args":[]}

[<TIMESTAMP>] [VERBOSE] method calls fail if the resource fails to start » root/env0/OnStartThrower/Resource
Received a message from the sandbox: {"type":"error","reason":{}}

[<TIMESTAMP>] [ERROR] method calls fail if the resource fails to start » root/env0/OnStartThrower/Resource
Error: resource not started

[<TIMESTAMP>] [VERBOSE] method calls fail if the resource fails to start » root/env0/OnStartThrower/Resource
root/env0/OnStartThrower/Resource stopped

pass ─ on-start.test.wsim » root/env0/test:method calls fail if the resource fails to start

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] method calls fail if the resource fails to start » root/env0/OnStartThrower/Resource
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] method calls fail if the resource fails to start » root/env0/test:method calls fail if the resource fails to start/Handler
Sandbox child process stopped.

```

