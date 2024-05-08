# [dec.test.w](../../../../../../examples/tests/sdk_tests/counter/dec.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [INFO] dec() » root/env0/counter1/Resource
Bundled code (2405 bytes).

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
Sent a message to the sandbox: {"fn":"start","args":["<ABSOLUTE>/c8b75505e9068bd637a043eb82a020be7c5bf3d635"]}

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
Received a message from the sandbox: {"type":"ok","value":{}}

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
root/env0/counter1/Resource started

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/test:dec()/Handler
root/env0/test:dec()/Handler started

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/test:dec()/Handler
Bundled code (1526 bytes).

[<TIMESTAMP>] [INFO] dec() with custom key » root/env1/counter2/Resource
Bundled code (2406 bytes).

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter2/Resource
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter2/Resource
Sent a message to the sandbox: {"fn":"start","args":["<ABSOLUTE>/c8b66b6076266e4178794d64d31c4f88aa733214d8"]}

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter2/Resource
Received a message from the sandbox: {"type":"ok","value":{}}

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter2/Resource
root/env1/counter2/Resource started

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/test:dec() with custom key/Handler
root/env1/test:dec() with custom key/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/test:dec() with custom key/Handler
Bundled code (1526 bytes).

[<TIMESTAMP>] [INFO] dec() » root/env0/counter2/Resource
Bundled code (2406 bytes).

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter2/Resource
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter2/Resource
Sent a message to the sandbox: {"fn":"start","args":["<ABSOLUTE>/c8c509d75a9de285b0cdc0b3a5560aa023d28a0d56"]}

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter2/Resource
Received a message from the sandbox: {"type":"ok","value":{}}

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter2/Resource
root/env0/counter2/Resource started

[<TIMESTAMP>] [INFO] dec() with custom key » root/env1/counter1/Resource
Bundled code (2405 bytes).

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter1/Resource
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter1/Resource
Sent a message to the sandbox: {"fn":"start","args":["<ABSOLUTE>/c8b792bda5365cae567ab5671b1f8121fe97999fb4"]}

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter1/Resource
Received a message from the sandbox: {"type":"ok","value":{}}

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter1/Resource
root/env1/counter1/Resource started

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/test:dec()/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/test:dec()/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
Sent a message to the sandbox: {"fn":"call","args":["dec"]}

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
dec()

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek"]}

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
Received a message from the sandbox: {"type":"ok","value":-1}

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
peek()

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
Sent a message to the sandbox: {"fn":"call","args":["dec",5]}

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
Received a message from the sandbox: {"type":"ok","value":-1}

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
dec(5)

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek"]}

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
Received a message from the sandbox: {"type":"ok","value":-6}

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
peek()

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
Sent a message to the sandbox: {"fn":"call","args":["dec",-4]}

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
Received a message from the sandbox: {"type":"ok","value":-6}

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
dec(-4)

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek"]}

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
Received a message from the sandbox: {"type":"ok","value":-2}

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
peek()

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
Sent a message to the sandbox: {"fn":"call","args":["dec",0]}

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
Received a message from the sandbox: {"type":"ok","value":-2}

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
dec(0)

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek"]}

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
Received a message from the sandbox: {"type":"ok","value":-2}

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
peek()

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/test:dec()/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/test:dec()/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/test:dec() with custom key/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/test:dec() with custom key/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter2/Resource
Sent a message to the sandbox: {"fn":"call","args":["dec",5,"custom-key"]}

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter2/Resource
Received a message from the sandbox: {"type":"ok","value":-1}

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter2/Resource
dec(5, "custom-key")

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter2/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek","custom-key"]}

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter2/Resource
Received a message from the sandbox: {"type":"ok","value":-6}

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter2/Resource
peek("custom-key")

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter2/Resource
Sent a message to the sandbox: {"fn":"call","args":["dec",-4,"custom-key"]}

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter2/Resource
Received a message from the sandbox: {"type":"ok","value":-6}

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter2/Resource
dec(-4, "custom-key")

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter2/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek","custom-key"]}

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter2/Resource
Received a message from the sandbox: {"type":"ok","value":-2}

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter2/Resource
peek("custom-key")

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter2/Resource
Sent a message to the sandbox: {"fn":"call","args":["dec",0,"custom-key"]}

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter2/Resource
Received a message from the sandbox: {"type":"ok","value":-2}

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter2/Resource
dec(0, "custom-key")

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter2/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek","custom-key"]}

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter2/Resource
Received a message from the sandbox: {"type":"ok","value":-2}

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter2/Resource
peek("custom-key")

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/test:dec() with custom key/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/test:dec() with custom key/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/test:dec()/Handler
root/env0/test:dec()/Handler stopped

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
Sent a message to the sandbox: {"fn":"stop","args":[]}

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
root/env0/counter1/Resource stopped

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/test:dec() with custom key/Handler
root/env1/test:dec() with custom key/Handler stopped

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter2/Resource
Sent a message to the sandbox: {"fn":"stop","args":[]}

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter2/Resource
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter2/Resource
root/env1/counter2/Resource stopped

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/test:dec()/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter2/Resource
Sent a message to the sandbox: {"fn":"stop","args":[]}

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter1/Resource
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/test:dec() with custom key/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter2/Resource
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter2/Resource
root/env0/counter2/Resource stopped

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter1/Resource
Sent a message to the sandbox: {"fn":"stop","args":[]}

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter1/Resource
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter1/Resource
root/env1/counter1/Resource stopped

pass ─ dec.test.wsim » root/env0/test:dec()                
pass ─ dec.test.wsim » root/env1/test:dec() with custom key

Tests 2 passed (2)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter2/Resource
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] dec() » root/env0/counter2/Resource
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] dec() with custom key » root/env1/counter1/Resource
Sandbox child process stopped.

```

