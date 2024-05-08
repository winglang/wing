# [issue_2889.test.w](../../../../../examples/tests/valid/issue_2889.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] api should return a valid stringified json » root/env0/Api
Server listening on http://<IP>:<PORT>

[<TIMESTAMP>] [VERBOSE] api should return a valid stringified json » root/env0/Api
root/env0/Api started

[<TIMESTAMP>] [VERBOSE] api should return a valid stringified json » root/env0/test:api should return a valid stringified json/Handler
root/env0/test:api should return a valid stringified json/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] api should return a valid stringified json » root/env0/Api/Endpoint
root/env0/Api/Endpoint started

[<TIMESTAMP>] [VERBOSE] api should return a valid stringified json » root/env0/test:api should return a valid stringified json/Handler
Bundled code (907 bytes).

[<TIMESTAMP>] [VERBOSE] api should return a valid stringified json » root/env0/Api/OnRequestHandler0
root/env0/Api/OnRequestHandler0 started

[<TIMESTAMP>] [VERBOSE] api should return a valid stringified json » root/env0/Api/Policy
root/env0/Api/Policy started

[<TIMESTAMP>] [VERBOSE] api should return a valid stringified json » root/env0/Api/OnRequestHandler0
Bundled code (1303 bytes).

[<TIMESTAMP>] [VERBOSE] api should return a valid stringified json » root/env0/Api/ApiEventMapping0
root/env0/Api/ApiEventMapping0 started

[<TIMESTAMP>] [VERBOSE] api should return a valid stringified json » root/env0/test:api should return a valid stringified json/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] api should return a valid stringified json » root/env0/test:api should return a valid stringified json/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] api should return a valid stringified json » root/env0/Api
Processing "GET /foo" params={}).

[<TIMESTAMP>] [VERBOSE] api should return a valid stringified json » root/env0/Api/OnRequestHandler0
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] api should return a valid stringified json » root/env0/Api/OnRequestHandler0
Sent a message to the sandbox: {"fn":"handler","args":["{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"/foo\",\"query\":{},\"vars\":{}}"]}

[<TIMESTAMP>] [VERBOSE] api should return a valid stringified json » root/env0/Api/OnRequestHandler0
Received a message from the sandbox: {"type":"ok","value":"{\"status\":200,\"headers\":{\"Content-Type\":\"application/json\"},\"body\":\"[{\\\"foo\\\":\\\"bar\\\"},{\\\"foo\\\":\\\"baz\\\"},{\\\"foo\\\":\\\"qux\\\"}]\"}"}

[<TIMESTAMP>] [VERBOSE] api should return a valid stringified json » root/env0/Api/OnRequestHandler0
Invoke (payload="{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"/foo\",\"query\":{},\"vars\":{}}").

[<TIMESTAMP>] [VERBOSE] api should return a valid stringified json » root/env0/Api
GET /foo - 200.

[<TIMESTAMP>] [VERBOSE] api should return a valid stringified json » root/env0/test:api should return a valid stringified json/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] api should return a valid stringified json » root/env0/test:api should return a valid stringified json/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] api should return a valid stringified json » root/env0/test:api should return a valid stringified json/Handler
root/env0/test:api should return a valid stringified json/Handler stopped

[<TIMESTAMP>] [VERBOSE] api should return a valid stringified json » root/env0/Api/Endpoint
root/env0/Api/Endpoint stopped

[<TIMESTAMP>] [VERBOSE] api should return a valid stringified json » root/env0/Api/Policy
root/env0/Api/Policy stopped

[<TIMESTAMP>] [VERBOSE] api should return a valid stringified json » root/env0/Api/ApiEventMapping0
root/env0/Api/ApiEventMapping0 stopped

[<TIMESTAMP>] [VERBOSE] api should return a valid stringified json » root/env0/Api/OnRequestHandler0
root/env0/Api/OnRequestHandler0 stopped

[<TIMESTAMP>] [VERBOSE] api should return a valid stringified json » root/env0/Api
Closing server on http://<IP>:<PORT>

[<TIMESTAMP>] [VERBOSE] api should return a valid stringified json » root/env0/Api
root/env0/Api stopped

pass ─ issue_2889.test.wsim » root/env0/test:api should return a valid stringified json

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] api should return a valid stringified json » root/env0/test:api should return a valid stringified json/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] api should return a valid stringified json » root/env0/Api/OnRequestHandler0
Sandbox child process stopped.

```

