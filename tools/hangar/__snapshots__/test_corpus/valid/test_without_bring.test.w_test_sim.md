# [test_without_bring.test.w](../../../../../examples/tests/valid/test_without_bring.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] hello test » root/env0/test:hello test/Handler
root/env0/test:hello test/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] hello test » root/env0/test:hello test/Handler
Bundled code (579 bytes).

[<TIMESTAMP>] [VERBOSE] hello test » root/env0/test:hello test/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] hello test » root/env0/test:hello test/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] hello test » root/env0/test:hello test/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] hello test » root/env0/test:hello test/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] hello test » root/env0/test:hello test/Handler
root/env0/test:hello test/Handler stopped

pass ─ test_without_bring.test.wsim » root/env0/test:hello test

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] hello test » root/env0/test:hello test/Handler
Sandbox child process stopped.

```

