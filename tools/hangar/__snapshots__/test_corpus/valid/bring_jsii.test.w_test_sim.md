# [bring_jsii.test.w](../../../../../examples/tests/valid/bring_jsii.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] sayHello » root/env0/test:sayHello/Handler
root/env0/test:sayHello/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] sayHello » root/env0/test:sayHello/Handler
Bundled code (685 bytes).

[<TIMESTAMP>] [VERBOSE] sayHello » root/env0/test:sayHello/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] sayHello » root/env0/test:sayHello/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] sayHello » root/env0/test:sayHello/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] sayHello » root/env0/test:sayHello/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] sayHello » root/env0/test:sayHello/Handler
root/env0/test:sayHello/Handler stopped

pass ─ bring_jsii.test.wsim » root/env0/test:sayHello

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] sayHello » root/env0/test:sayHello/Handler
Sandbox child process stopped.

```

