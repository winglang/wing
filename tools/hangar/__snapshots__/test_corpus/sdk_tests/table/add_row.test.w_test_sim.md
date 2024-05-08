# [add_row.test.w](../../../../../../examples/tests/sdk_tests/table/add_row.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] addRow » root/env0/Table
Adding initial row (key=mario).

[<TIMESTAMP>] [VERBOSE] addRow » root/env0/Table
Adding initial row (key=peach).

[<TIMESTAMP>] [VERBOSE] addRow » root/env0/Table
root/env0/Table started

[<TIMESTAMP>] [VERBOSE] addRow » root/env0/test:addRow/Handler
root/env0/test:addRow/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] addRow » root/env0/test:addRow/Handler
Bundled code (1304 bytes).

[<TIMESTAMP>] [VERBOSE] addRow » root/env0/test:addRow/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] addRow » root/env0/test:addRow/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] addRow » root/env0/Table
get row mario from table users.

[<TIMESTAMP>] [VERBOSE] addRow » root/env0/Table
get row mario from table users.

[<TIMESTAMP>] [VERBOSE] addRow » root/env0/Table
get row mario from table users.

[<TIMESTAMP>] [VERBOSE] addRow » root/env0/Table
get row peach from table users.

[<TIMESTAMP>] [VERBOSE] addRow » root/env0/Table
get row peach from table users.

[<TIMESTAMP>] [VERBOSE] addRow » root/env0/Table
get row peach from table users.

[<TIMESTAMP>] [VERBOSE] addRow » root/env0/test:addRow/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] addRow » root/env0/test:addRow/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] addRow » root/env0/test:addRow/Handler
root/env0/test:addRow/Handler stopped

[<TIMESTAMP>] [VERBOSE] addRow » root/env0/Table
root/env0/Table stopped

pass ─ add_row.test.wsim » root/env0/test:addRow

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] addRow » root/env0/test:addRow/Handler
Sandbox child process stopped.

```

