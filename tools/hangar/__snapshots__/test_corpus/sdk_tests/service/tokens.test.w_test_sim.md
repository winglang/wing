# [tokens.test.w](../../../../../../examples/tests/sdk_tests/service/tokens.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Bucket
root/env0/Bucket started

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/test:will bind and use tokens/Handler
root/env0/test:will bind and use tokens/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Bucket/Policy
root/env0/Bucket/Policy started

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Api
Server listening on http://<IP>:<PORT>

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Api
root/env0/Api started

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/test:will bind and use tokens/Handler
Bundled code (1330 bytes).

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Api/Endpoint
root/env0/Api/Endpoint started

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Api/OnRequestHandler0
root/env0/Api/OnRequestHandler0 started

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Api/Policy
root/env0/Api/Policy started

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Api/OnRequestHandler0
Bundled code (1205 bytes).

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Api/ApiEventMapping0
root/env0/Api/ApiEventMapping0 started

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Service
Bundled code (1721 bytes).

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Service
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Service
Sent a message to the sandbox: {"fn":"start","args":[]}

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Api
Processing "GET /" params={}).

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Api/OnRequestHandler0
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Api/OnRequestHandler0
Sent a message to the sandbox: {"fn":"handler","args":["{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"/\",\"query\":{},\"vars\":{}}"]}

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Api/OnRequestHandler0
Received a message from the sandbox: {"type":"ok","value":"{\"body\":\"api test\",\"status\":200}"}

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Api/OnRequestHandler0
Invoke (payload="{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"/\",\"query\":{},\"vars\":{}}").

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Api
GET / - 200.

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Bucket
Put (key=service.txt).

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Service
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Service
root/env0/Service started

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/test:will bind and use tokens/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/test:will bind and use tokens/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Bucket
Exists (key=service.txt).

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Bucket
Get (key=service.txt).

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/test:will bind and use tokens/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/test:will bind and use tokens/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/test:will bind and use tokens/Handler
root/env0/test:will bind and use tokens/Handler stopped

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Bucket/Policy
root/env0/Bucket/Policy stopped

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Service
Sent a message to the sandbox: {"fn":"stop","args":[]}

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Service
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Service
root/env0/Service stopped

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Bucket
root/env0/Bucket stopped

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/test:will bind and use tokens/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Api/Endpoint
root/env0/Api/Endpoint stopped

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Service
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Api/Policy
root/env0/Api/Policy stopped

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Api/ApiEventMapping0
root/env0/Api/ApiEventMapping0 stopped

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Api/OnRequestHandler0
root/env0/Api/OnRequestHandler0 stopped

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Api
Closing server on http://<IP>:<PORT>

[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Api
root/env0/Api stopped

pass ─ tokens.test.wsim » root/env0/test:will bind and use tokens

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] will bind and use tokens » root/env0/Api/OnRequestHandler0
Sandbox child process stopped.

```

