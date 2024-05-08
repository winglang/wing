# [two_websites.test.w](../../../../../../examples/tests/sdk_tests/website/two_websites.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [INFO] deploying two websites » root/env0/Website
Website server listening on http://<IP>:<PORT>

[<TIMESTAMP>] [VERBOSE] deploying two websites » root/env0/Website
root/env0/Website started

[<TIMESTAMP>] [INFO] deploying two websites » root/env0/website-2
Website server listening on http://<IP>:<PORT>

[<TIMESTAMP>] [VERBOSE] deploying two websites » root/env0/website-2
root/env0/website-2 started

[<TIMESTAMP>] [VERBOSE] deploying two websites » root/env0/test:deploying two websites/Handler
root/env0/test:deploying two websites/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] deploying two websites » root/env0/Website/Endpoint
root/env0/Website/Endpoint started

[<TIMESTAMP>] [VERBOSE] deploying two websites » root/env0/test:deploying two websites/Handler
Bundled code (879 bytes).

[<TIMESTAMP>] [VERBOSE] deploying two websites » root/env0/website-2/Endpoint
root/env0/website-2/Endpoint started

[<TIMESTAMP>] [VERBOSE] deploying two websites » root/env0/test:deploying two websites/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] deploying two websites » root/env0/test:deploying two websites/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] deploying two websites » root/env0/test:deploying two websites/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] deploying two websites » root/env0/test:deploying two websites/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] deploying two websites » root/env0/test:deploying two websites/Handler
root/env0/test:deploying two websites/Handler stopped

[<TIMESTAMP>] [VERBOSE] deploying two websites » root/env0/Website/Endpoint
root/env0/Website/Endpoint stopped

[<TIMESTAMP>] [VERBOSE] deploying two websites » root/env0/Website
Closing server on http://<IP>:<PORT>

[<TIMESTAMP>] [VERBOSE] deploying two websites » root/env0/Website
root/env0/Website stopped

[<TIMESTAMP>] [VERBOSE] deploying two websites » root/env0/website-2/Endpoint
root/env0/website-2/Endpoint stopped

[<TIMESTAMP>] [VERBOSE] deploying two websites » root/env0/website-2
Closing server on http://<IP>:<PORT>

[<TIMESTAMP>] [VERBOSE] deploying two websites » root/env0/website-2
root/env0/website-2 stopped

pass ─ two_websites.test.wsim » root/env0/test:deploying two websites

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] deploying two websites » root/env0/test:deploying two websites/Handler
Sandbox child process stopped.

```

