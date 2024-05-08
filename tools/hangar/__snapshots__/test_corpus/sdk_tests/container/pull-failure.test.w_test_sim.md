# [pull-failure.test.w](../../../../../../examples/tests/sdk_tests/container/pull-failure.test.w) | test | sim

## stdout.log
```log
[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner started

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Container
$ docker inspect foo://do-not-pull-me

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Container
Pulling foo://do-not-pull-me...

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Container
$ docker pull foo://do-not-pull-me

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Container
Command "docker pull" exited with non-zero code 1}
invalid reference format

[<TIMESTAMP>] [ERROR] (no test) » root/env0/Container
Error: Failed to start container: Command "docker pull" exited with non-zero code 1 (see verbose logs)

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Container
root/env0/Container started

[<TIMESTAMP>] [VERBOSE] (no test) » root/cloud.TestRunner
root/cloud.TestRunner stopped

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Container
Stopping container wing-01hxccnp41n54v1vvwr97g1djc

[<TIMESTAMP>] [VERBOSE] (no test) » root/env0/Container
root/env0/Container stopped

pass ─ pull-failure.test.wsim (no tests)

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

