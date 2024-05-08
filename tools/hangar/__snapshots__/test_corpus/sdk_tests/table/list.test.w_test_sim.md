# [list.test.w](../../../../../../examples/tests/sdk_tests/table/list.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] list » root/env0/Table
root/env0/Table started

[<TIMESTAMP>] [VERBOSE] list » root/env0/test:list/Handler
root/env0/test:list/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] list » root/env0/test:list/Handler
Bundled code (1306 bytes).

[<TIMESTAMP>] [VERBOSE] list » root/env0/test:list/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] list » root/env0/test:list/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] list » root/env0/Table
insert row eyal into the table users.

[<TIMESTAMP>] [VERBOSE] list » root/env0/Table
insert row revital into the table users.

[<TIMESTAMP>] [VERBOSE] list » root/env0/Table
list all rows from table users.

[<TIMESTAMP>] [VERBOSE] list » root/env0/test:list/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] list » root/env0/test:list/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] list » root/env0/test:list/Handler
root/env0/test:list/Handler stopped

[<TIMESTAMP>] [VERBOSE] list » root/env0/Table
root/env0/Table stopped

pass ─ list.test.wsim » root/env0/test:list

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] list » root/env0/test:list/Handler
Sandbox child process stopped.

```

