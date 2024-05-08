# [get.test.w](../../../../../../examples/tests/sdk_tests/table/get.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] get » root/env0/Table
root/env0/Table started

[<TIMESTAMP>] [VERBOSE] get » root/env0/test:get/Handler
root/env0/test:get/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] get » root/env0/test:get/Handler
Bundled code (1171 bytes).

[<TIMESTAMP>] [VERBOSE] get » root/env0/test:get/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] get » root/env0/test:get/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] get » root/env0/Table
insert row foo into the table users.

[<TIMESTAMP>] [VERBOSE] get » root/env0/Table
get row foo from table users.

[<TIMESTAMP>] [VERBOSE] get » root/env0/Table
Error: Row does not exist (key=bar) (get row bar from table users.)

[<TIMESTAMP>] [VERBOSE] get » root/env0/Table
get row foo from table users.

[<TIMESTAMP>] [VERBOSE] get » root/env0/test:get/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] get » root/env0/test:get/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] get » root/env0/test:get/Handler
root/env0/test:get/Handler stopped

[<TIMESTAMP>] [VERBOSE] get » root/env0/Table
root/env0/Table stopped

pass ─ get.test.wsim » root/env0/test:get

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] get » root/env0/test:get/Handler
Sandbox child process stopped.

```

