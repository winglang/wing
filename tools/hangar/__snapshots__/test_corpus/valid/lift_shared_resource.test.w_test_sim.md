# [lift_shared_resource.test.w](../../../../../examples/tests/valid/lift_shared_resource.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/Api
Server listening on http://<IP>:<PORT>

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/Api
root/env0/Api started

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/test:call endpoint/Handler
root/env0/test:call endpoint/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/test:call endpoint/Handler
Bundled code (789 bytes).

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/Bucket
root/env0/Bucket started

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/Bucket/Policy
root/env0/Bucket/Policy started

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/Api/Endpoint
root/env0/Api/Endpoint started

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/Api/OnRequestHandler0
root/env0/Api/OnRequestHandler0 started

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/Api/Policy
root/env0/Api/Policy started

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/Api/OnRequestHandler0
Bundled code (3289 bytes).

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/Api/ApiEventMapping0
root/env0/Api/ApiEventMapping0 started

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/test:call endpoint/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/test:call endpoint/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/Api
Processing "GET /" params={}).

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/Api/OnRequestHandler0
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/Api/OnRequestHandler0
Sent a message to the sandbox: {"fn":"handler","args":["{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"/\",\"query\":{},\"vars\":{}}"]}

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/Bucket
List (prefix=null).

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/Bucket
List (prefix=null).

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/Api/OnRequestHandler0
Received a message from the sandbox: {"type":"ok","value":"{\"status\":200}"}

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/Api/OnRequestHandler0
Invoke (payload="{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"/\",\"query\":{},\"vars\":{}}").

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/Api
GET / - 200.

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/test:call endpoint/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/test:call endpoint/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/test:call endpoint/Handler
root/env0/test:call endpoint/Handler stopped

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/Bucket/Policy
root/env0/Bucket/Policy stopped

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/Api/Endpoint
root/env0/Api/Endpoint stopped

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/Api/Policy
root/env0/Api/Policy stopped

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/Api/ApiEventMapping0
root/env0/Api/ApiEventMapping0 stopped

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/Api/OnRequestHandler0
root/env0/Api/OnRequestHandler0 stopped

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/Bucket
root/env0/Bucket stopped

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/Api
Closing server on http://<IP>:<PORT>

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/Api
root/env0/Api stopped

pass ─ lift_shared_resource.test.wsim » root/env0/test:call endpoint

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/test:call endpoint/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] call endpoint » root/env0/Api/OnRequestHandler0
Sandbox child process stopped.

```

