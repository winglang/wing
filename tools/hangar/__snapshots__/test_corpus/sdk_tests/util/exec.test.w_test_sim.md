# [exec.test.w](../../../../../../examples/tests/sdk_tests/util/exec.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] exec() with valid program » root/env0/test:exec() with valid program/Handler
root/env0/test:exec() with valid program/Handler started

[<TIMESTAMP>] [VERBOSE] exec() with invalid program » root/env1/test:exec() with invalid program/Handler
root/env1/test:exec() with invalid program/Handler started

[<TIMESTAMP>] [VERBOSE] exec() with explicit non-zero exit status » root/env2/test:exec() with explicit non-zero exit status/Handler
root/env2/test:exec() with explicit non-zero exit status/Handler started

[<TIMESTAMP>] [VERBOSE] exec() with env option » root/env3/test:exec() with env option/Handler
root/env3/test:exec() with env option/Handler started

[<TIMESTAMP>] [VERBOSE] exec() with valid program » root/env0/test:exec() with valid program/Handler
Bundled code (840 bytes).

[<TIMESTAMP>] [VERBOSE] exec() with inheritEnv option » root/env4/test:exec() with inheritEnv option/Handler
root/env4/test:exec() with inheritEnv option/Handler started

[<TIMESTAMP>] [VERBOSE] exec() with invalid program » root/env1/test:exec() with invalid program/Handler
Bundled code (1155 bytes).

[<TIMESTAMP>] [VERBOSE] exec() with cwd option » root/env5/test:exec() with cwd option/Handler
root/env5/test:exec() with cwd option/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] exec() with explicit non-zero exit status » root/env2/test:exec() with explicit non-zero exit status/Handler
Bundled code (840 bytes).

[<TIMESTAMP>] [VERBOSE] exec() with env option » root/env3/test:exec() with env option/Handler
Bundled code (840 bytes).

[<TIMESTAMP>] [VERBOSE] exec() with inheritEnv option » root/env4/test:exec() with inheritEnv option/Handler
Bundled code (840 bytes).

[<TIMESTAMP>] [VERBOSE] exec() with cwd option » root/env5/test:exec() with cwd option/Handler
Bundled code (964 bytes).

[<TIMESTAMP>] [VERBOSE] exec() with valid program » root/env0/test:exec() with valid program/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] exec() with valid program » root/env0/test:exec() with valid program/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] exec() with valid program » root/env0/test:exec() with valid program/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] exec() with valid program » root/env0/test:exec() with valid program/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] exec() with invalid program » root/env1/test:exec() with invalid program/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] exec() with invalid program » root/env1/test:exec() with invalid program/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] exec() with invalid program » root/env1/test:exec() with invalid program/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] exec() with invalid program » root/env1/test:exec() with invalid program/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] exec() with explicit non-zero exit status » root/env2/test:exec() with explicit non-zero exit status/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] exec() with explicit non-zero exit status » root/env2/test:exec() with explicit non-zero exit status/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] exec() with explicit non-zero exit status » root/env2/test:exec() with explicit non-zero exit status/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] exec() with explicit non-zero exit status » root/env2/test:exec() with explicit non-zero exit status/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] exec() with env option » root/env3/test:exec() with env option/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] exec() with env option » root/env3/test:exec() with env option/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] exec() with env option » root/env3/test:exec() with env option/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] exec() with env option » root/env3/test:exec() with env option/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] exec() with inheritEnv option » root/env4/test:exec() with inheritEnv option/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] exec() with inheritEnv option » root/env4/test:exec() with inheritEnv option/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] exec() with inheritEnv option » root/env4/test:exec() with inheritEnv option/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] exec() with inheritEnv option » root/env4/test:exec() with inheritEnv option/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] exec() with cwd option » root/env5/test:exec() with cwd option/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] exec() with cwd option » root/env5/test:exec() with cwd option/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] exec() with cwd option » root/env5/test:exec() with cwd option/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] exec() with cwd option » root/env5/test:exec() with cwd option/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] exec() with valid program » root/env0/test:exec() with valid program/Handler
root/env0/test:exec() with valid program/Handler stopped

[<TIMESTAMP>] [VERBOSE] exec() with invalid program » root/env1/test:exec() with invalid program/Handler
root/env1/test:exec() with invalid program/Handler stopped

[<TIMESTAMP>] [VERBOSE] exec() with explicit non-zero exit status » root/env2/test:exec() with explicit non-zero exit status/Handler
root/env2/test:exec() with explicit non-zero exit status/Handler stopped

[<TIMESTAMP>] [VERBOSE] exec() with env option » root/env3/test:exec() with env option/Handler
root/env3/test:exec() with env option/Handler stopped

[<TIMESTAMP>] [VERBOSE] exec() with inheritEnv option » root/env4/test:exec() with inheritEnv option/Handler
root/env4/test:exec() with inheritEnv option/Handler stopped

[<TIMESTAMP>] [VERBOSE] exec() with cwd option » root/env5/test:exec() with cwd option/Handler
root/env5/test:exec() with cwd option/Handler stopped

pass ─ exec.test.wsim » root/env0/test:exec() with valid program                
pass ─ exec.test.wsim » root/env1/test:exec() with invalid program              
pass ─ exec.test.wsim » root/env2/test:exec() with explicit non-zero exit status
pass ─ exec.test.wsim » root/env3/test:exec() with env option                   
pass ─ exec.test.wsim » root/env4/test:exec() with inheritEnv option            
pass ─ exec.test.wsim » root/env5/test:exec() with cwd option                   

Tests 6 passed (6)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] exec() with valid program » root/env0/test:exec() with valid program/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] exec() with invalid program » root/env1/test:exec() with invalid program/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] exec() with explicit non-zero exit status » root/env2/test:exec() with explicit non-zero exit status/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] exec() with env option » root/env3/test:exec() with env option/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] exec() with inheritEnv option » root/env4/test:exec() with inheritEnv option/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] exec() with cwd option » root/env5/test:exec() with cwd option/Handler
Sandbox child process stopped.

```

