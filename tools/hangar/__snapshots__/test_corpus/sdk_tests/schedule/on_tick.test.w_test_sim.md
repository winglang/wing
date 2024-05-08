# [on_tick.test.w](../../../../../../examples/tests/sdk_tests/schedule/on_tick.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [INFO] (no test) » root/env0/c1/Resource
Bundled code (2405 bytes).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c1/Resource
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c1/Resource
Sent a message to the sandbox: {"fn":"start","args":["<ABSOLUTE>/c8025c14ed0e96633ee9b4facaa37c106b2d2aed41"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c1/Resource
Received a message from the sandbox: {"type":"ok","value":{}}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c1/Resource
root/env0/c1/Resource started

[<TIMESTAMP>] [INFO] (no test) » root/env0/c2/Resource
Bundled code (2405 bytes).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c2/Resource
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c2/Resource
Sent a message to the sandbox: {"fn":"start","args":["<ABSOLUTE>/c88196853583b543bd59be145284c2e48cce16917d"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c2/Resource
Received a message from the sandbox: {"type":"ok","value":{}}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c2/Resource
root/env0/c2/Resource started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/onTick()/Handler
root/env0/onTick()/Handler started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_cron
root/env0/from_cron started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_cron/OnTick0
root/env0/from_cron/OnTick0 started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/onTick()/Handler
Bundled code (2603 bytes).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_cron/Policy
root/env0/from_cron/Policy started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_cron/OnTick0
Bundled code (1694 bytes).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_cron/OnTickMapping0
root/env0/from_cron/OnTickMapping0 started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_rate
root/env0/from_rate started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_rate/OnTick0
root/env0/from_rate/OnTick0 started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_rate/Policy
root/env0/from_rate/Policy started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_rate/OnTick0
Bundled code (1694 bytes).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_rate/OnTickMapping0
root/env0/from_rate/OnTickMapping0 started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/onTick()/Handler
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/onTick()/Handler
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c1/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c1/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c1/Resource
peek()

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c2/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c2/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c2/Resource
peek()

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_cron
Running task with function handle: sim-5.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_rate
Running task with function handle: sim-9.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_cron/OnTick0
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_cron/OnTick0
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_rate/OnTick0
Initializing sandbox.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_rate/OnTick0
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c2/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c2/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c2/Resource
inc()

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_rate/OnTick0
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_rate/OnTick0
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c1/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c1/Resource
Received a message from the sandbox: {"type":"ok","value":0}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c1/Resource
inc()

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_cron/OnTick0
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_cron/OnTick0
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_cron
Running task with function handle: sim-5.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_rate
Running task with function handle: sim-9.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_cron/OnTick0
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_rate/OnTick0
Sent a message to the sandbox: {"fn":"handler","args":[null]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c2/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c2/Resource
Received a message from the sandbox: {"type":"ok","value":1}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c2/Resource
inc()

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c1/Resource
Sent a message to the sandbox: {"fn":"call","args":["inc"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_rate/OnTick0
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_rate/OnTick0
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c1/Resource
Received a message from the sandbox: {"type":"ok","value":1}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c1/Resource
inc()

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_cron/OnTick0
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_cron/OnTick0
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c1/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c1/Resource
Received a message from the sandbox: {"type":"ok","value":2}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c1/Resource
peek()

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c2/Resource
Sent a message to the sandbox: {"fn":"call","args":["peek"]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c2/Resource
Received a message from the sandbox: {"type":"ok","value":2}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c2/Resource
peek()

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/onTick()/Handler
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/onTick()/Handler
Invoke (payload=undefined).

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/onTick()/Handler
root/env0/onTick()/Handler stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_cron/Policy
root/env0/from_cron/Policy stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/onTick()/Handler
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_cron/OnTickMapping0
root/env0/from_cron/OnTickMapping0 stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_cron/OnTick0
root/env0/from_cron/OnTick0 stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c1/Resource
Sent a message to the sandbox: {"fn":"stop","args":[]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_cron/OnTick0
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c1/Resource
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c1/Resource
root/env0/c1/Resource stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_rate/Policy
root/env0/from_rate/Policy stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c1/Resource
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_rate/OnTickMapping0
root/env0/from_rate/OnTickMapping0 stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_rate/OnTick0
root/env0/from_rate/OnTick0 stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c2/Resource
Sent a message to the sandbox: {"fn":"stop","args":[]}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c2/Resource
Received a message from the sandbox: {"type":"ok"}

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c2/Resource
root/env0/c2/Resource stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_cron
root/env0/from_cron stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/c2/Resource
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_rate/OnTick0
Sandbox child process stopped.

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/from_rate
root/env0/from_rate stopped

pass ─ on_tick.test.wsim » root/env0/onTick()

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

