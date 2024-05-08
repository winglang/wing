# [state.test.w](../../../../../../examples/tests/sdk_tests/resource/state.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [INFO] sim.Resource can read and write state » root/env0/ResourceWithState/Resource
Bundled code (2629 bytes).

[<TIMESTAMP>] [VERBOSE] sim.Resource can read and write state » root/env0/ResourceWithState/Resource
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] sim.Resource can read and write state » root/env0/ResourceWithState/Resource
Sent a message to the sandbox: {"fn":"start","args":["<ABSOLUTE>/c82c9a821a086e7fbf7a4169f97df848ccea9707b2"]}

[<TIMESTAMP>] [VERBOSE] sim.Resource can read and write state » root/env0/ResourceWithState/Resource
Received a message from the sandbox: {"type":"ok","value":{}}

[<TIMESTAMP>] [VERBOSE] sim.Resource can read and write state » root/env0/ResourceWithState/Resource
root/env0/ResourceWithState/Resource started

[<TIMESTAMP>] [VERBOSE] sim.Resource can read and write state » root/env0/test:sim.Resource can read and write state/Handler
root/env0/test:sim.Resource can read and write state/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] sim.Resource can read and write state » root/env0/test:sim.Resource can read and write state/Handler
Bundled code (1794 bytes).

[<TIMESTAMP>] [VERBOSE] sim.Resource can read and write state » root/env0/test:sim.Resource can read and write state/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] sim.Resource can read and write state » root/env0/test:sim.Resource can read and write state/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] sim.Resource can read and write state » root/env0/ResourceWithState/Resource
Sent a message to the sandbox: {"fn":"call","args":["writeState"]}

[<TIMESTAMP>] [VERBOSE] sim.Resource can read and write state » root/env0/ResourceWithState/Resource
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] sim.Resource can read and write state » root/env0/ResourceWithState/Resource
writeState()

[<TIMESTAMP>] [VERBOSE] sim.Resource can read and write state » root/env0/ResourceWithState/Resource
Sent a message to the sandbox: {"fn":"call","args":["readState"]}

[<TIMESTAMP>] [VERBOSE] sim.Resource can read and write state » root/env0/ResourceWithState/Resource
Received a message from the sandbox: {"type":"ok","value":"my state"}

[<TIMESTAMP>] [VERBOSE] sim.Resource can read and write state » root/env0/ResourceWithState/Resource
readState()

[<TIMESTAMP>] [VERBOSE] sim.Resource can read and write state » root/env0/test:sim.Resource can read and write state/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] sim.Resource can read and write state » root/env0/test:sim.Resource can read and write state/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] sim.Resource can read and write state » root/env0/test:sim.Resource can read and write state/Handler
root/env0/test:sim.Resource can read and write state/Handler stopped

[<TIMESTAMP>] [VERBOSE] sim.Resource can read and write state » root/env0/ResourceWithState/Resource
Sent a message to the sandbox: {"fn":"stop","args":[]}

[<TIMESTAMP>] [VERBOSE] sim.Resource can read and write state » root/env0/ResourceWithState/Resource
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] sim.Resource can read and write state » root/env0/ResourceWithState/Resource
root/env0/ResourceWithState/Resource stopped

pass ─ state.test.wsim » root/env0/test:sim.Resource can read and write state

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] sim.Resource can read and write state » root/env0/ResourceWithState/Resource
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] sim.Resource can read and write state » root/env0/test:sim.Resource can read and write state/Handler
Sandbox child process stopped.

```

