# [fetch.test.w](../../../../../../examples/tests/sdk_tests/http/fetch.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api
Server listening on http://<IP>:<PORT>

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api
root/env0/Api started

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/test:redirect is 'follow' by default/Handler
root/env0/test:redirect is 'follow' by default/Handler started

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Api
Server listening on http://<IP>:<PORT>

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Api
root/env1/Api started

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/test:redirect 'manual'/Handler
root/env1/test:redirect 'manual'/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/test:redirect is 'follow' by default/Handler
Bundled code (919 bytes).

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api/Endpoint
root/env0/Api/Endpoint started

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/test:redirect 'manual'/Handler
Bundled code (1013 bytes).

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Bucket
Adding object from preflight (key=url.txt).

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Bucket
root/env0/Bucket started

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api/OnRequestHandler0
root/env0/Api/OnRequestHandler0 started

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api/OnRequestHandler1
root/env0/Api/OnRequestHandler1 started

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api/Policy
root/env0/Api/Policy started

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api/OnRequestHandler0
Bundled code (1779 bytes).

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api/OnRequestHandler1
Bundled code (1179 bytes).

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api/ApiEventMapping0
root/env0/Api/ApiEventMapping0 started

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api/ApiEventMapping1
root/env0/Api/ApiEventMapping1 started

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Bucket/Policy
root/env0/Bucket/Policy started

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Api/Endpoint
root/env1/Api/Endpoint started

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Bucket
Adding object from preflight (key=url.txt).

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Bucket
root/env1/Bucket started

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Api/OnRequestHandler0
root/env1/Api/OnRequestHandler0 started

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Api/OnRequestHandler1
root/env1/Api/OnRequestHandler1 started

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Api/Policy
root/env1/Api/Policy started

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Api/OnRequestHandler0
Bundled code (1779 bytes).

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Api/ApiEventMapping0
root/env1/Api/ApiEventMapping0 started

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Api/OnRequestHandler1
Bundled code (1179 bytes).

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Api/ApiEventMapping1
root/env1/Api/ApiEventMapping1 started

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Bucket/Policy
root/env1/Bucket/Policy started

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/test:redirect is 'follow' by default/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/test:redirect is 'follow' by default/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api
Processing "GET /redirect" params={}).

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api/OnRequestHandler0
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api/OnRequestHandler0
Sent a message to the sandbox: {"fn":"handler","args":["{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"/redirect\",\"query\":{},\"vars\":{}}"]}

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Bucket
Get (key=url.txt).

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api/OnRequestHandler0
Received a message from the sandbox: {"type":"ok","value":"{\"status\":301,\"headers\":{\"Location\":\"http://<IP>:<PORT>/target\"}}"}

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api/OnRequestHandler0
Invoke (payload="{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"/redirect\",\"query\":{},\"vars\":{}}").

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api
GET /redirect - 301.

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api
Processing "GET /target" params={}).

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api/OnRequestHandler1
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api/OnRequestHandler1
Sent a message to the sandbox: {"fn":"handler","args":["{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"/target\",\"query\":{},\"vars\":{}}"]}

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api/OnRequestHandler1
Received a message from the sandbox: {"type":"ok","value":"{\"status\":200,\"body\":\"I am the target\"}"}

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api/OnRequestHandler1
Invoke (payload="{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"/target\",\"query\":{},\"vars\":{}}").

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api
GET /target - 200.

[<TIMESTAMP>] [INFO] redirect is 'follow' by default » root/env0/test:redirect is 'follow' by default/Handler
I am the target

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/test:redirect is 'follow' by default/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/test:redirect is 'follow' by default/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/test:redirect 'manual'/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/test:redirect 'manual'/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Api
Processing "GET /redirect" params={}).

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Api/OnRequestHandler0
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Api/OnRequestHandler0
Sent a message to the sandbox: {"fn":"handler","args":["{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"/redirect\",\"query\":{},\"vars\":{}}"]}

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Bucket
Get (key=url.txt).

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Api/OnRequestHandler0
Received a message from the sandbox: {"type":"ok","value":"{\"status\":301,\"headers\":{\"Location\":\"http://<IP>:<PORT>/target\"}}"}

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Api/OnRequestHandler0
Invoke (payload="{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"/redirect\",\"query\":{},\"vars\":{}}").

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Api
GET /redirect - 301.

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/test:redirect 'manual'/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/test:redirect 'manual'/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/test:redirect is 'follow' by default/Handler
root/env0/test:redirect is 'follow' by default/Handler stopped

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/test:redirect 'manual'/Handler
root/env1/test:redirect 'manual'/Handler stopped

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api/Endpoint
root/env0/Api/Endpoint stopped

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api/Policy
root/env0/Api/Policy stopped

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api/ApiEventMapping0
root/env0/Api/ApiEventMapping0 stopped

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api/OnRequestHandler0
root/env0/Api/OnRequestHandler0 stopped

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Bucket/Policy
root/env0/Bucket/Policy stopped

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/test:redirect is 'follow' by default/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api/OnRequestHandler0
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Bucket
root/env0/Bucket stopped

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api/ApiEventMapping1
root/env0/Api/ApiEventMapping1 stopped

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api
Closing server on http://<IP>:<PORT>

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api
root/env0/Api stopped

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api/OnRequestHandler1
root/env0/Api/OnRequestHandler1 stopped

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/test:redirect 'manual'/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Api/Endpoint
root/env1/Api/Endpoint stopped

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Api/Policy
root/env1/Api/Policy stopped

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Api/ApiEventMapping0
root/env1/Api/ApiEventMapping0 stopped

[<TIMESTAMP>] [VERBOSE] redirect is 'follow' by default » root/env0/Api/OnRequestHandler1
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Api/OnRequestHandler0
root/env1/Api/OnRequestHandler0 stopped

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Bucket/Policy
root/env1/Bucket/Policy stopped

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Bucket
root/env1/Bucket stopped

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Api/ApiEventMapping1
root/env1/Api/ApiEventMapping1 stopped

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Api
Closing server on http://<IP>:<PORT>

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Api
root/env1/Api stopped

[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Api/OnRequestHandler1
root/env1/Api/OnRequestHandler1 stopped

pass ─ fetch.test.wsim » root/env0/test:redirect is 'follow' by default
pass ─ fetch.test.wsim » root/env1/test:redirect 'manual'              

Tests 2 passed (2)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] redirect 'manual' » root/env1/Api/OnRequestHandler0
Sandbox child process stopped.

```

