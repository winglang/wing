# [get.test.w](../../../../../../examples/tests/sdk_tests/bucket/get.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] get range of an object » root/env0/Bucket
root/env0/Bucket started

[<TIMESTAMP>] [VERBOSE] get range of an object » root/env0/test:get range of an object/Handler
root/env0/test:get range of an object/Handler started

[<TIMESTAMP>] [VERBOSE] get empty object » root/env1/Bucket
root/env1/Bucket started

[<TIMESTAMP>] [VERBOSE] get range of an object » root/env0/test:get range of an object/Handler
Bundled code (1306 bytes).

[<TIMESTAMP>] [VERBOSE] get empty object » root/env1/test:get empty object/Handler
root/env1/test:get empty object/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] get range of an object » root/env0/Bucket/Policy
root/env0/Bucket/Policy started

[<TIMESTAMP>] [VERBOSE] get empty object » root/env1/Bucket/Policy
root/env1/Bucket/Policy started

[<TIMESTAMP>] [VERBOSE] get empty object » root/env1/test:get empty object/Handler
Bundled code (1306 bytes).

[<TIMESTAMP>] [VERBOSE] get range of an object » root/env0/test:get range of an object/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] get range of an object » root/env0/test:get range of an object/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] get range of an object » root/env0/Bucket
Put (key=test1.txt).

[<TIMESTAMP>] [VERBOSE] get range of an object » root/env0/Bucket
Get (key=test1.txt).

[<TIMESTAMP>] [VERBOSE] get range of an object » root/env0/Bucket
Get (key=test1.txt).

[<TIMESTAMP>] [VERBOSE] get range of an object » root/env0/Bucket
Get (key=test1.txt).

[<TIMESTAMP>] [VERBOSE] get range of an object » root/env0/Bucket
Put (key=test2.txt).

[<TIMESTAMP>] [VERBOSE] get range of an object » root/env0/Bucket
Get (key=test2.txt).

[<TIMESTAMP>] [VERBOSE] get range of an object » root/env0/Bucket
Error: Object content could not be read as text (key=test2.txt): TypeError: The encoded data was not valid for encoding utf-8
    at TextDecoder.decode (node:internal/encoding:449:16)
    at Object.activity (<ABSOLUTE>:LINE:COL)
    at async Object.withTrace (<ABSOLUTE>:LINE:COL))} (Get (key=test2.txt).)

[<TIMESTAMP>] [VERBOSE] get range of an object » root/env0/test:get range of an object/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] get range of an object » root/env0/test:get range of an object/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] get empty object » root/env1/test:get empty object/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] get empty object » root/env1/test:get empty object/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] get empty object » root/env1/Bucket
Put (key=empty.txt).

[<TIMESTAMP>] [VERBOSE] get empty object » root/env1/Bucket
Get (key=empty.txt).

[<TIMESTAMP>] [VERBOSE] get empty object » root/env1/test:get empty object/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] get empty object » root/env1/test:get empty object/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] get range of an object » root/env0/test:get range of an object/Handler
root/env0/test:get range of an object/Handler stopped

[<TIMESTAMP>] [VERBOSE] get range of an object » root/env0/Bucket/Policy
root/env0/Bucket/Policy stopped

[<TIMESTAMP>] [VERBOSE] get range of an object » root/env0/Bucket
root/env0/Bucket stopped

[<TIMESTAMP>] [VERBOSE] get empty object » root/env1/test:get empty object/Handler
root/env1/test:get empty object/Handler stopped

[<TIMESTAMP>] [VERBOSE] get empty object » root/env1/Bucket/Policy
root/env1/Bucket/Policy stopped

[<TIMESTAMP>] [VERBOSE] get empty object » root/env1/Bucket
root/env1/Bucket stopped

pass ─ get.test.wsim » root/env0/test:get range of an object
pass ─ get.test.wsim » root/env1/test:get empty object      

Tests 2 passed (2)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] get range of an object » root/env0/test:get range of an object/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] get empty object » root/env1/test:get empty object/Handler
Sandbox child process stopped.

```

