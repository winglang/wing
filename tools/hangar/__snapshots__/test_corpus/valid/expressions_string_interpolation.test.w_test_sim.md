# [expressions_string_interpolation.test.w](../../../../../examples/tests/valid/expressions_string_interpolation.test.w) | test | sim

## stdout.log
```log
{1+1} 1
a non { { {interpolated } } } strin{ g }
this is 'a non { { {interpolated } } } strin{ g }'
[<TIMESTAMP>] [VERBOSE] str interpolation with lifted expr » root/env0/test:str interpolation with lifted expr/Handler
root/env0/test:str interpolation with lifted expr/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] str interpolation with lifted expr » root/env0/test:str interpolation with lifted expr/Handler
Bundled code (753 bytes).

[<TIMESTAMP>] [VERBOSE] str interpolation with lifted expr » root/env0/test:str interpolation with lifted expr/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] str interpolation with lifted expr » root/env0/test:str interpolation with lifted expr/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] str interpolation with lifted expr » root/env0/test:str interpolation with lifted expr/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] str interpolation with lifted expr » root/env0/test:str interpolation with lifted expr/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] str interpolation with lifted expr » root/env0/test:str interpolation with lifted expr/Handler
root/env0/test:str interpolation with lifted expr/Handler stopped

pass ─ expressions_string_interpolation.test.wsim » root/env0/test:str interpolation with lifted expr

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] str interpolation with lifted expr » root/env0/test:str interpolation with lifted expr/Handler
Sandbox child process stopped.

```

