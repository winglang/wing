# [median_mode_mean.test.w](../../../../../../examples/tests/sdk_tests/math/median_mode_mean.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] inflight median » root/env0/test:inflight median/Handler
root/env0/test:inflight median/Handler started

[<TIMESTAMP>] [VERBOSE] inflight mode » root/env1/test:inflight mode/Handler
root/env1/test:inflight mode/Handler started

[<TIMESTAMP>] [VERBOSE] inflight mean » root/env2/test:inflight mean/Handler
root/env2/test:inflight mean/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] inflight median » root/env0/test:inflight median/Handler
Bundled code (797 bytes).

[<TIMESTAMP>] [VERBOSE] inflight mode » root/env1/test:inflight mode/Handler
Bundled code (820 bytes).

[<TIMESTAMP>] [VERBOSE] inflight mean » root/env2/test:inflight mean/Handler
Bundled code (756 bytes).

[<TIMESTAMP>] [VERBOSE] inflight median » root/env0/test:inflight median/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] inflight median » root/env0/test:inflight median/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] inflight median » root/env0/test:inflight median/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] inflight median » root/env0/test:inflight median/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] inflight mode » root/env1/test:inflight mode/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] inflight mode » root/env1/test:inflight mode/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] inflight mode » root/env1/test:inflight mode/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] inflight mode » root/env1/test:inflight mode/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] inflight mean » root/env2/test:inflight mean/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] inflight mean » root/env2/test:inflight mean/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] inflight mean » root/env2/test:inflight mean/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] inflight mean » root/env2/test:inflight mean/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] inflight median » root/env0/test:inflight median/Handler
root/env0/test:inflight median/Handler stopped

[<TIMESTAMP>] [VERBOSE] inflight mode » root/env1/test:inflight mode/Handler
root/env1/test:inflight mode/Handler stopped

[<TIMESTAMP>] [VERBOSE] inflight median » root/env0/test:inflight median/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] inflight mode » root/env1/test:inflight mode/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] inflight mean » root/env2/test:inflight mean/Handler
root/env2/test:inflight mean/Handler stopped

pass ─ median_mode_mean.test.wsim » root/env0/test:inflight median
pass ─ median_mode_mean.test.wsim » root/env1/test:inflight mode  
pass ─ median_mode_mean.test.wsim » root/env2/test:inflight mean  

Tests 3 passed (3)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] inflight mean » root/env2/test:inflight mean/Handler
Sandbox child process stopped.

```

