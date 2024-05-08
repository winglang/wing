# [post.test.w](../../../../../../examples/tests/sdk_tests/api/post.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/Api
Server listening on http://<IP>:<PORT>

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/Api
root/env0/Api started

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/test:http.post and http.fetch can preform a call to an api/Handler
root/env0/test:http.post and http.fetch can preform a call to an api/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/Api/Endpoint
root/env0/Api/Endpoint started

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler0
root/env0/Api/OnRequestHandler0 started

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/test:http.post and http.fetch can preform a call to an api/Handler
Bundled code (1093 bytes).

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/Api/Policy
root/env0/Api/Policy started

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler0
Bundled code (1511 bytes).

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/Api/ApiEventMapping0
root/env0/Api/ApiEventMapping0 started

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/test:http.post and http.fetch can preform a call to an api/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/test:http.post and http.fetch can preform a call to an api/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/Api
Processing "POST /path" params={}).

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler0
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler0
Sent a message to the sandbox: {"fn":"handler","args":["{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"content-type\":\"application/json\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\",\"content-length\":\"14\"},\"body\":\"{\\\"cat\\\":\\\"Tion\\\"}\",\"method\":\"POST\",\"path\":\"/path\",\"query\":{},\"vars\":{}}"]}

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler0
Received a message from the sandbox: {"type":"ok","value":"{\"status\":200,\"body\":\"{\\\"cat\\\":\\\"Tion\\\"}\"}"}

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler0
Invoke (payload="{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"content-type\":\"application/json\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\",\"content-length\":\"14\"},\"body\":\"{\\\"cat\\\":\\\"Tion\\\"}\",\"method\":\"POST\",\"path\":\"/path\",\"query\":{},\"vars\":{}}").

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/Api
POST /path - 200.

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/Api
Processing "POST /path" params={}).

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler0
Sent a message to the sandbox: {"fn":"handler","args":["{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"content-type\":\"application/json\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\",\"content-length\":\"14\"},\"body\":\"{\\\"cat\\\":\\\"Tion\\\"}\",\"method\":\"POST\",\"path\":\"/path\",\"query\":{},\"vars\":{}}"]}

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler0
Received a message from the sandbox: {"type":"ok","value":"{\"status\":200,\"body\":\"{\\\"cat\\\":\\\"Tion\\\"}\"}"}

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler0
Invoke (payload="{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"content-type\":\"application/json\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\",\"content-length\":\"14\"},\"body\":\"{\\\"cat\\\":\\\"Tion\\\"}\",\"method\":\"POST\",\"path\":\"/path\",\"query\":{},\"vars\":{}}").

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/Api
POST /path - 200.

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/test:http.post and http.fetch can preform a call to an api/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/test:http.post and http.fetch can preform a call to an api/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/test:http.post and http.fetch can preform a call to an api/Handler
root/env0/test:http.post and http.fetch can preform a call to an api/Handler stopped

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/Api/Endpoint
root/env0/Api/Endpoint stopped

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/Api/Policy
root/env0/Api/Policy stopped

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/Api/ApiEventMapping0
root/env0/Api/ApiEventMapping0 stopped

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler0
root/env0/Api/OnRequestHandler0 stopped

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/Api
Closing server on http://<IP>:<PORT>

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/Api
root/env0/Api stopped

pass ─ post.test.wsim » root/env0/test:http.post and http.fetch can preform a call to an api

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/test:http.post and http.fetch can preform a call to an api/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] http.post and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler0
Sandbox child process stopped.

```

