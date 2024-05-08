# [on-stop.test.w](../../../../../../examples/tests/sdk_tests/resource/on-stop.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [INFO] if a resource throws an error on stopping, it doesn't crash the simulation » root/env0/OnStopThrower/Resource
Bundled code (2501 bytes).

[<TIMESTAMP>] [VERBOSE] if a resource throws an error on stopping, it doesn't crash the simulation » root/env0/OnStopThrower/Resource
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] if a resource throws an error on stopping, it doesn't crash the simulation » root/env0/OnStopThrower/Resource
Sent a message to the sandbox: {"fn":"start","args":["<ABSOLUTE>/c87ce59e2c2ce27bd0e74db272a251dc587eaabbc9"]}

[<TIMESTAMP>] [VERBOSE] if a resource throws an error on stopping, it doesn't crash the simulation » root/env0/OnStopThrower/Resource
Received a message from the sandbox: {"type":"ok","value":{}}

[<TIMESTAMP>] [VERBOSE] if a resource throws an error on stopping, it doesn't crash the simulation » root/env0/OnStopThrower/Resource
root/env0/OnStopThrower/Resource started

[<TIMESTAMP>] [VERBOSE] if a resource throws an error on stopping, it doesn't crash the simulation » root/env0/test:if a resource throws an error on stopping, it doesn't crash the simulation/Handler
root/env0/test:if a resource throws an error on stopping, it doesn't crash the simulation/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] if a resource throws an error on stopping, it doesn't crash the simulation » root/env0/test:if a resource throws an error on stopping, it doesn't crash the simulation/Handler
Bundled code (1652 bytes).

[<TIMESTAMP>] [VERBOSE] if a resource throws an error on stopping, it doesn't crash the simulation » root/env0/test:if a resource throws an error on stopping, it doesn't crash the simulation/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] if a resource throws an error on stopping, it doesn't crash the simulation » root/env0/test:if a resource throws an error on stopping, it doesn't crash the simulation/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] if a resource throws an error on stopping, it doesn't crash the simulation » root/env0/OnStopThrower/Resource
Sent a message to the sandbox: {"fn":"call","args":["noop"]}

[<TIMESTAMP>] [VERBOSE] if a resource throws an error on stopping, it doesn't crash the simulation » root/env0/OnStopThrower/Resource
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] if a resource throws an error on stopping, it doesn't crash the simulation » root/env0/OnStopThrower/Resource
noop()

[<TIMESTAMP>] [VERBOSE] if a resource throws an error on stopping, it doesn't crash the simulation » root/env0/test:if a resource throws an error on stopping, it doesn't crash the simulation/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] if a resource throws an error on stopping, it doesn't crash the simulation » root/env0/test:if a resource throws an error on stopping, it doesn't crash the simulation/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] if a resource throws an error on stopping, it doesn't crash the simulation » root/env0/test:if a resource throws an error on stopping, it doesn't crash the simulation/Handler
root/env0/test:if a resource throws an error on stopping, it doesn't crash the simulation/Handler stopped

[<TIMESTAMP>] [VERBOSE] if a resource throws an error on stopping, it doesn't crash the simulation » root/env0/OnStopThrower/Resource
Sent a message to the sandbox: {"fn":"stop","args":[]}

[<TIMESTAMP>] [VERBOSE] if a resource throws an error on stopping, it doesn't crash the simulation » root/env0/OnStopThrower/Resource
Received a message from the sandbox: {"type":"error","reason":{}}

[<TIMESTAMP>] [ERROR] if a resource throws an error on stopping, it doesn't crash the simulation » root/env0/OnStopThrower/Resource
Error: unexpected error!
  --> on-stop.test.w:6:5
  | inflight class OnStopThrowerBackend impl sim.IResource {
  |   pub onStart(ctx: sim.IResourceContext) {}
  |   pub onStop() {
6 |     throw "unexpected error!";
  |     ^
at onStop <ABSOLUTE>/on-stop.test.w:6:5

[<TIMESTAMP>] [VERBOSE] if a resource throws an error on stopping, it doesn't crash the simulation » root/env0/OnStopThrower/Resource
root/env0/OnStopThrower/Resource stopped

pass ─ on-stop.test.wsim » root/env0/test:if a resource throws an error on stopping, it doesn't crash the simulation

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] if a resource throws an error on stopping, it doesn't crash the simulation » root/env0/OnStopThrower/Resource
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] if a resource throws an error on stopping, it doesn't crash the simulation » root/env0/test:if a resource throws an error on stopping, it doesn't crash the simulation/Handler
Sandbox child process stopped.

```

