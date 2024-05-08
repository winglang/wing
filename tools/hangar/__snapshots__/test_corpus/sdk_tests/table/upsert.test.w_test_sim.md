# [upsert.test.w](../../../../../../examples/tests/sdk_tests/table/upsert.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] upsert » root/env0/Table
Adding initial row (key=mario).

[<TIMESTAMP>] [VERBOSE] upsert » root/env0/Table
Adding initial row (key=luigi).

[<TIMESTAMP>] [VERBOSE] upsert » root/env0/Table
root/env0/Table started

[<TIMESTAMP>] [VERBOSE] upsert » root/env0/test:upsert/Handler
root/env0/test:upsert/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] upsert » root/env0/test:upsert/Handler
Bundled code (1174 bytes).

[<TIMESTAMP>] [VERBOSE] upsert » root/env0/test:upsert/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] upsert » root/env0/test:upsert/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] upsert » root/env0/Table
upsert row mario into the table users.

[<TIMESTAMP>] [VERBOSE] upsert » root/env0/Table
upsert row luigi into the table users.

[<TIMESTAMP>] [VERBOSE] upsert » root/env0/Table
upsert row peach into the table users.

[<TIMESTAMP>] [VERBOSE] upsert » root/env0/Table
get row mario from table users.

[<TIMESTAMP>] [VERBOSE] upsert » root/env0/Table
get row mario from table users.

[<TIMESTAMP>] [VERBOSE] upsert » root/env0/Table
get row luigi from table users.

[<TIMESTAMP>] [VERBOSE] upsert » root/env0/Table
get row luigi from table users.

[<TIMESTAMP>] [VERBOSE] upsert » root/env0/Table
get row peach from table users.

[<TIMESTAMP>] [VERBOSE] upsert » root/env0/Table
get row peach from table users.

[<TIMESTAMP>] [VERBOSE] upsert » root/env0/Table
get row peach from table users.

[<TIMESTAMP>] [VERBOSE] upsert » root/env0/test:upsert/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] upsert » root/env0/test:upsert/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] upsert » root/env0/test:upsert/Handler
root/env0/test:upsert/Handler stopped

[<TIMESTAMP>] [VERBOSE] upsert » root/env0/Table
root/env0/Table stopped

pass ─ upsert.test.wsim » root/env0/test:upsert

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] upsert » root/env0/test:upsert/Handler
Sandbox child process stopped.

```

