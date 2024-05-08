# [shell.test.w](../../../../../../examples/tests/sdk_tests/util/shell.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] shell() with valid command » root/env0/test:shell() with valid command/Handler
root/env0/test:shell() with valid command/Handler started

[<TIMESTAMP>] [VERBOSE] shell() with invalid command » root/env1/test:shell() with invalid command/Handler
root/env1/test:shell() with invalid command/Handler started

[<TIMESTAMP>] [VERBOSE] shell() with explicit non-zero exit status » root/env2/test:shell() with explicit non-zero exit status/Handler
root/env2/test:shell() with explicit non-zero exit status/Handler started

[<TIMESTAMP>] [VERBOSE] shell() with env option » root/env3/test:shell() with env option/Handler
root/env3/test:shell() with env option/Handler started

[<TIMESTAMP>] [VERBOSE] shell() with inheritEnv option » root/env4/test:shell() with inheritEnv option/Handler
root/env4/test:shell() with inheritEnv option/Handler started

[<TIMESTAMP>] [VERBOSE] shell() with valid command » root/env0/test:shell() with valid command/Handler
Bundled code (1019 bytes).

[<TIMESTAMP>] [VERBOSE] shell() with cwd option » root/env5/test:shell() with cwd option/Handler
root/env5/test:shell() with cwd option/Handler started

[<TIMESTAMP>] [VERBOSE] shell() with invalid command » root/env1/test:shell() with invalid command/Handler
Bundled code (1157 bytes).

[<TIMESTAMP>] [VERBOSE] shell() with throw option » root/env6/test:shell() with throw option/Handler
root/env6/test:shell() with throw option/Handler started

[<TIMESTAMP>] [VERBOSE] shell() with explicit non-zero exit status » root/env2/test:shell() with explicit non-zero exit status/Handler
Bundled code (1157 bytes).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] shell() with env option » root/env3/test:shell() with env option/Handler
Bundled code (1019 bytes).

[<TIMESTAMP>] [VERBOSE] shell() with inheritEnv option » root/env4/test:shell() with inheritEnv option/Handler
Bundled code (1019 bytes).

[<TIMESTAMP>] [VERBOSE] shell() with cwd option » root/env5/test:shell() with cwd option/Handler
Bundled code (965 bytes).

[<TIMESTAMP>] [VERBOSE] shell() with throw option » root/env6/test:shell() with throw option/Handler
Bundled code (841 bytes).

[<TIMESTAMP>] [VERBOSE] shell() with valid command » root/env0/test:shell() with valid command/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] shell() with valid command » root/env0/test:shell() with valid command/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] shell() with valid command » root/env0/test:shell() with valid command/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] shell() with valid command » root/env0/test:shell() with valid command/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] shell() with invalid command » root/env1/test:shell() with invalid command/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] shell() with invalid command » root/env1/test:shell() with invalid command/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] shell() with invalid command » root/env1/test:shell() with invalid command/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] shell() with invalid command » root/env1/test:shell() with invalid command/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] shell() with explicit non-zero exit status » root/env2/test:shell() with explicit non-zero exit status/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] shell() with explicit non-zero exit status » root/env2/test:shell() with explicit non-zero exit status/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] shell() with explicit non-zero exit status » root/env2/test:shell() with explicit non-zero exit status/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] shell() with explicit non-zero exit status » root/env2/test:shell() with explicit non-zero exit status/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] shell() with env option » root/env3/test:shell() with env option/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] shell() with env option » root/env3/test:shell() with env option/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] shell() with env option » root/env3/test:shell() with env option/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] shell() with env option » root/env3/test:shell() with env option/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] shell() with inheritEnv option » root/env4/test:shell() with inheritEnv option/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] shell() with inheritEnv option » root/env4/test:shell() with inheritEnv option/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] shell() with inheritEnv option » root/env4/test:shell() with inheritEnv option/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] shell() with inheritEnv option » root/env4/test:shell() with inheritEnv option/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] shell() with cwd option » root/env5/test:shell() with cwd option/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] shell() with cwd option » root/env5/test:shell() with cwd option/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] shell() with cwd option » root/env5/test:shell() with cwd option/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] shell() with cwd option » root/env5/test:shell() with cwd option/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] shell() with throw option » root/env6/test:shell() with throw option/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] shell() with throw option » root/env6/test:shell() with throw option/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] shell() with throw option » root/env6/test:shell() with throw option/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] shell() with throw option » root/env6/test:shell() with throw option/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] shell() with valid command » root/env0/test:shell() with valid command/Handler
root/env0/test:shell() with valid command/Handler stopped

[<TIMESTAMP>] [VERBOSE] shell() with invalid command » root/env1/test:shell() with invalid command/Handler
root/env1/test:shell() with invalid command/Handler stopped

[<TIMESTAMP>] [VERBOSE] shell() with explicit non-zero exit status » root/env2/test:shell() with explicit non-zero exit status/Handler
root/env2/test:shell() with explicit non-zero exit status/Handler stopped

[<TIMESTAMP>] [VERBOSE] shell() with env option » root/env3/test:shell() with env option/Handler
root/env3/test:shell() with env option/Handler stopped

[<TIMESTAMP>] [VERBOSE] shell() with inheritEnv option » root/env4/test:shell() with inheritEnv option/Handler
root/env4/test:shell() with inheritEnv option/Handler stopped

[<TIMESTAMP>] [VERBOSE] shell() with cwd option » root/env5/test:shell() with cwd option/Handler
root/env5/test:shell() with cwd option/Handler stopped

[<TIMESTAMP>] [VERBOSE] shell() with throw option » root/env6/test:shell() with throw option/Handler
root/env6/test:shell() with throw option/Handler stopped

pass ─ shell.test.wsim » root/env0/test:shell() with valid command                
pass ─ shell.test.wsim » root/env1/test:shell() with invalid command              
pass ─ shell.test.wsim » root/env2/test:shell() with explicit non-zero exit status
pass ─ shell.test.wsim » root/env3/test:shell() with env option                   
pass ─ shell.test.wsim » root/env4/test:shell() with inheritEnv option            
pass ─ shell.test.wsim » root/env5/test:shell() with cwd option                   
pass ─ shell.test.wsim » root/env6/test:shell() with throw option                 

Tests 7 passed (7)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] shell() with valid command » root/env0/test:shell() with valid command/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] shell() with invalid command » root/env1/test:shell() with invalid command/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] shell() with explicit non-zero exit status » root/env2/test:shell() with explicit non-zero exit status/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] shell() with env option » root/env3/test:shell() with env option/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] shell() with inheritEnv option » root/env4/test:shell() with inheritEnv option/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] shell() with cwd option » root/env5/test:shell() with cwd option/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] shell() with throw option » root/env6/test:shell() with throw option/Handler
Sandbox child process stopped.

```

