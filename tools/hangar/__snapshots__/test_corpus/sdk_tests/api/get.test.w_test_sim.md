# [get.test.w](../../../../../../examples/tests/sdk_tests/api/get.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api
Server listening on http://<IP>:<PORT>

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api
root/env0/Api started

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/test:http.get and http.fetch can preform a call to an api/Handler
root/env0/test:http.get and http.fetch can preform a call to an api/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/Endpoint
root/env0/Api/Endpoint started

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler0
root/env0/Api/OnRequestHandler0 started

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/test:http.get and http.fetch can preform a call to an api/Handler
Bundled code (1089 bytes).

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler1
root/env0/Api/OnRequestHandler1 started

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler2
root/env0/Api/OnRequestHandler2 started

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/Policy
root/env0/Api/Policy started

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler0
Bundled code (1371 bytes).

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler1
Bundled code (1176 bytes).

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler2
Bundled code (1176 bytes).

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/ApiEventMapping0
root/env0/Api/ApiEventMapping0 started

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/ApiEventMapping1
root/env0/Api/ApiEventMapping1 started

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/ApiEventMapping2
root/env0/Api/ApiEventMapping2 started

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/test:http.get and http.fetch can preform a call to an api/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/test:http.get and http.fetch can preform a call to an api/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api
Processing "GET /path" params={}).

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler0
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler0
Sent a message to the sandbox: {"fn":"handler","args":["{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"content-type\":\"application/json\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"/path\",\"query\":{},\"vars\":{}}"]}

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler0
Received a message from the sandbox: {"type":"ok","value":"{\"status\":200,\"body\":\"ok!\"}"}

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler0
Invoke (payload="{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"content-type\":\"application/json\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"/path\",\"query\":{},\"vars\":{}}").

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api
GET /path - 200.

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api
Processing "GET /path" params={}).

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler0
Sent a message to the sandbox: {"fn":"handler","args":["{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"content-type\":\"application/json\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"/path\",\"query\":{},\"vars\":{}}"]}

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler0
Received a message from the sandbox: {"type":"ok","value":"{\"status\":200,\"body\":\"ok!\"}"}

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler0
Invoke (payload="{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"content-type\":\"application/json\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"/path\",\"query\":{},\"vars\":{}}").

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api
GET /path - 200.

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api
Processing "GET /path" params={}).

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler0
Sent a message to the sandbox: {"fn":"handler","args":["{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"content-type\":\"application/json\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"/path\",\"query\":{},\"vars\":{}}"]}

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler0
Received a message from the sandbox: {"type":"ok","value":"{\"status\":200,\"body\":\"ok!\"}"}

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler0
Invoke (payload="{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"content-type\":\"application/json\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"/path\",\"query\":{},\"vars\":{}}").

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api
GET /path - 200.

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api
Processing "GET /default-response" params={}).

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler1
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler1
Sent a message to the sandbox: {"fn":"handler","args":["{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"/default-response\",\"query\":{},\"vars\":{}}"]}

[<TIMESTAMP>] [INFO] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler1
200 ok

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler1
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler1
Invoke (payload="{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"/default-response\",\"query\":{},\"vars\":{}}").

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api
GET /default-response - 200.

[<TIMESTAMP>] [INFO] http.get and http.fetch can preform a call to an api » root/env0/test:http.get and http.fetch can preform a call to an api/Handler


[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api
Processing "GET /default-status" params={}).

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler2
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler2
Sent a message to the sandbox: {"fn":"handler","args":["{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"/default-status\",\"query\":{},\"vars\":{}}"]}

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler2
Received a message from the sandbox: {"type":"ok","value":"{\"body\":\"ok\"}"}

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler2
Invoke (payload="{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"/default-status\",\"query\":{},\"vars\":{}}").

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api
GET /default-status - 200.

[<TIMESTAMP>] [INFO] http.get and http.fetch can preform a call to an api » root/env0/test:http.get and http.fetch can preform a call to an api/Handler
ok

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/test:http.get and http.fetch can preform a call to an api/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/test:http.get and http.fetch can preform a call to an api/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/test:http.get and http.fetch can preform a call to an api/Handler
root/env0/test:http.get and http.fetch can preform a call to an api/Handler stopped

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/Endpoint
root/env0/Api/Endpoint stopped

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/Policy
root/env0/Api/Policy stopped

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/test:http.get and http.fetch can preform a call to an api/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/ApiEventMapping0
root/env0/Api/ApiEventMapping0 stopped

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler0
root/env0/Api/OnRequestHandler0 stopped

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/ApiEventMapping1
root/env0/Api/ApiEventMapping1 stopped

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/ApiEventMapping2
root/env0/Api/ApiEventMapping2 stopped

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api
Closing server on http://<IP>:<PORT>

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api
root/env0/Api stopped

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler0
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler1
root/env0/Api/OnRequestHandler1 stopped

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler2
root/env0/Api/OnRequestHandler2 stopped

pass ─ get.test.wsim » root/env0/test:http.get and http.fetch can preform a call to an api

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler1
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] http.get and http.fetch can preform a call to an api » root/env0/Api/OnRequestHandler2
Sandbox child process stopped.

```

