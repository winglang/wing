# [inherit_stdlib_class.test.w](../../../../../examples/tests/valid/inherit_stdlib_class.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] can inherit std lib preflight class » root/env0/AnApi
Server listening on http://<IP>:<PORT>

[<TIMESTAMP>] [VERBOSE] can inherit std lib preflight class » root/env0/AnApi
root/env0/AnApi started

[<TIMESTAMP>] [VERBOSE] can inherit std lib preflight class » root/env0/test:can inherit std lib preflight class/Handler
root/env0/test:can inherit std lib preflight class/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] can inherit std lib preflight class » root/env0/AnApi/Endpoint
root/env0/AnApi/Endpoint started

[<TIMESTAMP>] [VERBOSE] can inherit std lib preflight class » root/env0/AnApi/OnRequestHandler0
root/env0/AnApi/OnRequestHandler0 started

[<TIMESTAMP>] [VERBOSE] can inherit std lib preflight class » root/env0/test:can inherit std lib preflight class/Handler
Bundled code (791 bytes).

[<TIMESTAMP>] [VERBOSE] can inherit std lib preflight class » root/env0/AnApi/Policy
root/env0/AnApi/Policy started

[<TIMESTAMP>] [VERBOSE] can inherit std lib preflight class » root/env0/AnApi/OnRequestHandler0
Bundled code (1185 bytes).

[<TIMESTAMP>] [VERBOSE] can inherit std lib preflight class » root/env0/AnApi/ApiEventMapping0
root/env0/AnApi/ApiEventMapping0 started

[<TIMESTAMP>] [VERBOSE] can inherit std lib preflight class » root/env0/test:can inherit std lib preflight class/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] can inherit std lib preflight class » root/env0/test:can inherit std lib preflight class/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] can inherit std lib preflight class » root/env0/AnApi
Processing "GET /" params={}).

[<TIMESTAMP>] [VERBOSE] can inherit std lib preflight class » root/env0/AnApi/OnRequestHandler0
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] can inherit std lib preflight class » root/env0/AnApi/OnRequestHandler0
Sent a message to the sandbox: {"fn":"handler","args":["{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"/\",\"query\":{},\"vars\":{}}"]}

[<TIMESTAMP>] [VERBOSE] can inherit std lib preflight class » root/env0/AnApi/OnRequestHandler0
Received a message from the sandbox: {"type":"ok","value":"{\"status\":200}"}

[<TIMESTAMP>] [VERBOSE] can inherit std lib preflight class » root/env0/AnApi/OnRequestHandler0
Invoke (payload="{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"/\",\"query\":{},\"vars\":{}}").

[<TIMESTAMP>] [VERBOSE] can inherit std lib preflight class » root/env0/AnApi
GET / - 200.

[<TIMESTAMP>] [VERBOSE] can inherit std lib preflight class » root/env0/test:can inherit std lib preflight class/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] can inherit std lib preflight class » root/env0/test:can inherit std lib preflight class/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] can inherit std lib preflight class » root/env0/test:can inherit std lib preflight class/Handler
root/env0/test:can inherit std lib preflight class/Handler stopped

[<TIMESTAMP>] [VERBOSE] can inherit std lib preflight class » root/env0/AnApi/Endpoint
root/env0/AnApi/Endpoint stopped

[<TIMESTAMP>] [VERBOSE] can inherit std lib preflight class » root/env0/AnApi/Policy
root/env0/AnApi/Policy stopped

[<TIMESTAMP>] [VERBOSE] can inherit std lib preflight class » root/env0/AnApi/ApiEventMapping0
root/env0/AnApi/ApiEventMapping0 stopped

[<TIMESTAMP>] [VERBOSE] can inherit std lib preflight class » root/env0/AnApi/OnRequestHandler0
root/env0/AnApi/OnRequestHandler0 stopped

[<TIMESTAMP>] [VERBOSE] can inherit std lib preflight class » root/env0/AnApi
Closing server on http://<IP>:<PORT>

[<TIMESTAMP>] [VERBOSE] can inherit std lib preflight class » root/env0/AnApi
root/env0/AnApi stopped

pass ─ inherit_stdlib_class.test.wsim » root/env0/test:can inherit std lib preflight class

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] can inherit std lib preflight class » root/env0/test:can inherit std lib preflight class/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] can inherit std lib preflight class » root/env0/AnApi/OnRequestHandler0
Sandbox child process stopped.

```

