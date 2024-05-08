# [url.test.w](../../../../../../examples/tests/sdk_tests/endpoint/url.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/Api
Server listening on http://<IP>:<PORT>

[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/Api
root/env0/Api started

[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/test:access endpoint url/Handler
root/env0/test:access endpoint url/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/Api/Endpoint
root/env0/Api/Endpoint started

[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/Api/OnRequestHandler0
root/env0/Api/OnRequestHandler0 started

[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/test:access endpoint url/Handler
Bundled code (790 bytes).

[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/Api/Policy
root/env0/Api/Policy started

[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/Api/OnRequestHandler0
Bundled code (1181 bytes).

[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/Api/ApiEventMapping0
root/env0/Api/ApiEventMapping0 started

[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/Endpoint
root/env0/Endpoint started

[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/test:access endpoint url/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/test:access endpoint url/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/Api
Processing "GET /" params={}).

[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/Api/OnRequestHandler0
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/Api/OnRequestHandler0
Sent a message to the sandbox: {"fn":"handler","args":["{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"/\",\"query\":{},\"vars\":{}}"]}

[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/Api/OnRequestHandler0
Received a message from the sandbox: {"type":"ok","value":"{\"status\":200,\"body\":\"OK\"}"}

[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/Api/OnRequestHandler0
Invoke (payload="{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"/\",\"query\":{},\"vars\":{}}").

[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/Api
GET / - 200.

[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/test:access endpoint url/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/test:access endpoint url/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/test:access endpoint url/Handler
root/env0/test:access endpoint url/Handler stopped

[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/Api/Endpoint
root/env0/Api/Endpoint stopped

[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/Api/Policy
root/env0/Api/Policy stopped

[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/Api/ApiEventMapping0
root/env0/Api/ApiEventMapping0 stopped

[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/Api/OnRequestHandler0
root/env0/Api/OnRequestHandler0 stopped

[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/Endpoint
root/env0/Endpoint stopped

[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/Api
Closing server on http://<IP>:<PORT>

[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/Api
root/env0/Api stopped

pass ─ url.test.wsim » root/env0/test:access endpoint url

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/test:access endpoint url/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] access endpoint url » root/env0/Api/OnRequestHandler0
Sandbox child process stopped.

```

