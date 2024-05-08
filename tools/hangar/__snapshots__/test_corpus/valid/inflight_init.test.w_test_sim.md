# [inflight_init.test.w](../../../../../examples/tests/valid/inflight_init.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] inflight class init » root/env0/test:inflight class init/Handler
root/env0/test:inflight class init/Handler started

[<TIMESTAMP>] [VERBOSE] inflight calls parent's init » root/env1/test:inflight calls parent's init/Handler
root/env1/test:inflight calls parent's init/Handler started

[<TIMESTAMP>] [VERBOSE] inflight calls parent's init when non exists » root/env2/test:inflight calls parent's init when non exists/Handler
root/env2/test:inflight calls parent's init when non exists/Handler started

[<TIMESTAMP>] [VERBOSE] inflight class inherits form JSII class » root/env3/test:inflight class inherits form JSII class/Handler
root/env3/test:inflight class inherits form JSII class/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] inflight class init » root/env0/test:inflight class init/Handler
Bundled code (749 bytes).

[<TIMESTAMP>] [VERBOSE] inflight calls parent's init » root/env1/test:inflight calls parent's init/Handler
Bundled code (934 bytes).

[<TIMESTAMP>] [VERBOSE] inflight calls parent's init when non exists » root/env2/test:inflight calls parent's init when non exists/Handler
Bundled code (574 bytes).

[<TIMESTAMP>] [VERBOSE] inflight class inherits form JSII class » root/env3/test:inflight class inherits form JSII class/Handler
Bundled code (646 bytes).

[<TIMESTAMP>] [VERBOSE] inflight class init » root/env0/test:inflight class init/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] inflight class init » root/env0/test:inflight class init/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] inflight class init » root/env0/test:inflight class init/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] inflight class init » root/env0/test:inflight class init/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] inflight calls parent's init » root/env1/test:inflight calls parent's init/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] inflight calls parent's init » root/env1/test:inflight calls parent's init/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] inflight calls parent's init » root/env1/test:inflight calls parent's init/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] inflight calls parent's init » root/env1/test:inflight calls parent's init/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] inflight calls parent's init when non exists » root/env2/test:inflight calls parent's init when non exists/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] inflight calls parent's init when non exists » root/env2/test:inflight calls parent's init when non exists/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] inflight calls parent's init when non exists » root/env2/test:inflight calls parent's init when non exists/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] inflight calls parent's init when non exists » root/env2/test:inflight calls parent's init when non exists/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] inflight class inherits form JSII class » root/env3/test:inflight class inherits form JSII class/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] inflight class inherits form JSII class » root/env3/test:inflight class inherits form JSII class/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] inflight class inherits form JSII class » root/env3/test:inflight class inherits form JSII class/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] inflight class inherits form JSII class » root/env3/test:inflight class inherits form JSII class/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] inflight class init » root/env0/test:inflight class init/Handler
root/env0/test:inflight class init/Handler stopped

[<TIMESTAMP>] [VERBOSE] inflight calls parent's init » root/env1/test:inflight calls parent's init/Handler
root/env1/test:inflight calls parent's init/Handler stopped

[<TIMESTAMP>] [VERBOSE] inflight calls parent's init when non exists » root/env2/test:inflight calls parent's init when non exists/Handler
root/env2/test:inflight calls parent's init when non exists/Handler stopped

[<TIMESTAMP>] [VERBOSE] inflight class inherits form JSII class » root/env3/test:inflight class inherits form JSII class/Handler
root/env3/test:inflight class inherits form JSII class/Handler stopped

pass ─ inflight_init.test.wsim » root/env0/test:inflight class init                         
pass ─ inflight_init.test.wsim » root/env1/test:inflight calls parent's init                
pass ─ inflight_init.test.wsim » root/env2/test:inflight calls parent's init when non exists
pass ─ inflight_init.test.wsim » root/env3/test:inflight class inherits form JSII class     

Tests 4 passed (4)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] inflight class init » root/env0/test:inflight class init/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] inflight calls parent's init » root/env1/test:inflight calls parent's init/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] inflight calls parent's init when non exists » root/env2/test:inflight calls parent's init when non exists/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] inflight class inherits form JSII class » root/env3/test:inflight class inherits form JSII class/Handler
Sandbox child process stopped.

```

