# [path_vars.test.w](../../../../../../examples/tests/sdk_tests/api/path_vars.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api
Server listening on http://<IP>:<PORT>

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api
root/env0/Api started

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/test:path vars are valid/Handler
root/env0/test:path vars are valid/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/Endpoint
root/env0/Api/Endpoint started

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/OnRequestHandler0
root/env0/Api/OnRequestHandler0 started

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/test:path vars are valid/Handler
Bundled code (914 bytes).

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/OnRequestHandler1
root/env0/Api/OnRequestHandler1 started

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/Policy
root/env0/Api/Policy started

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/OnRequestHandler0
Bundled code (1310 bytes).

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/OnRequestHandler1
Bundled code (1310 bytes).

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/ApiEventMapping0
root/env0/Api/ApiEventMapping0 started

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/ApiEventMapping1
root/env0/Api/ApiEventMapping1 started

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/test:path vars are valid/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/test:path vars are valid/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api
Processing "GET <ABSOLUTE>/:name" params={"name":"akhil"}).

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/OnRequestHandler0
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/OnRequestHandler0
Sent a message to the sandbox: {"fn":"handler","args":["{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"<ABSOLUTE>/akhil\",\"query\":{},\"vars\":{\"name\":\"akhil\"}}"]}

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/OnRequestHandler0
Received a message from the sandbox: {"type":"ok","value":"{\"body\":\"{\\\"user\\\":\\\"akhil\\\"}\",\"headers\":{\"content-type\":\"application/json\"},\"status\":200}"}

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/OnRequestHandler0
Invoke (payload="{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"<ABSOLUTE>/akhil\",\"query\":{},\"vars\":{\"name\":\"akhil\"}}").

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api
GET <ABSOLUTE>/:name - 200.

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api
Processing "GET <ABSOLUTE>/:name" params={"name":"akhil"}).

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/OnRequestHandler0
Sent a message to the sandbox: {"fn":"handler","args":["{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"<ABSOLUTE>/akhil\",\"query\":{},\"vars\":{\"name\":\"akhil\"}}"]}

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/OnRequestHandler0
Received a message from the sandbox: {"type":"ok","value":"{\"body\":\"{\\\"user\\\":\\\"akhil\\\"}\",\"headers\":{\"content-type\":\"application/json\"},\"status\":200}"}

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/OnRequestHandler0
Invoke (payload="{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"<ABSOLUTE>/akhil\",\"query\":{},\"vars\":{\"name\":\"akhil\"}}").

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api
GET <ABSOLUTE>/:name - 200.

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api
Processing "GET <ABSOLUTE>/:name" params={"name":"akhil"}).

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/OnRequestHandler0
Sent a message to the sandbox: {"fn":"handler","args":["{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"<ABSOLUTE>/akhil\",\"query\":{},\"vars\":{\"name\":\"akhil\"}}"]}

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/OnRequestHandler0
Received a message from the sandbox: {"type":"ok","value":"{\"body\":\"{\\\"user\\\":\\\"akhil\\\"}\",\"headers\":{\"content-type\":\"application/json\"},\"status\":200}"}

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/OnRequestHandler0
Invoke (payload="{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"<ABSOLUTE>/akhil\",\"query\":{},\"vars\":{\"name\":\"akhil\"}}").

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api
GET <ABSOLUTE>/:name - 200.

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api
Processing "GET <ABSOLUTE>/:age" params={"name":"akhil","age":"23"}).

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/OnRequestHandler1
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/OnRequestHandler1
Sent a message to the sandbox: {"fn":"handler","args":["{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"<ABSOLUTE>/23\",\"query\":{},\"vars\":{\"name\":\"akhil\",\"age\":\"23\"}}"]}

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/OnRequestHandler1
Received a message from the sandbox: {"type":"ok","value":"{\"body\":\"{\\\"user\\\":\\\"akhil\\\",\\\"age\\\":\\\"23\\\"}\",\"headers\":{\"content-type\":\"application/json\"},\"status\":200}"}

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/OnRequestHandler1
Invoke (payload="{\"headers\":{\"host\":\"<IP>:<PORT>\",\"connection\":\"keep-alive\",\"accept\":\"*/*\",\"accept-language\":\"*\",\"sec-fetch-mode\":\"cors\",\"user-agent\":\"node\",\"accept-encoding\":\"gzip, deflate\"},\"body\":\"\",\"method\":\"GET\",\"path\":\"<ABSOLUTE>/23\",\"query\":{},\"vars\":{\"name\":\"akhil\",\"age\":\"23\"}}").

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api
GET <ABSOLUTE>/:age - 200.

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/test:path vars are valid/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/test:path vars are valid/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/test:path vars are valid/Handler
root/env0/test:path vars are valid/Handler stopped

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/Endpoint
root/env0/Api/Endpoint stopped

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/test:path vars are valid/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/Policy
root/env0/Api/Policy stopped

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/ApiEventMapping0
root/env0/Api/ApiEventMapping0 stopped

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/OnRequestHandler0
root/env0/Api/OnRequestHandler0 stopped

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/ApiEventMapping1
root/env0/Api/ApiEventMapping1 stopped

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api
Closing server on http://<IP>:<PORT>

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api
root/env0/Api stopped

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/OnRequestHandler0
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/OnRequestHandler1
root/env0/Api/OnRequestHandler1 stopped

pass ─ path_vars.test.wsim » root/env0/test:path vars are valid

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] path vars are valid » root/env0/Api/OnRequestHandler1
Sandbox child process stopped.

```

