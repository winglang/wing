# [on-start.test.w](../../../../../../tests/sdk_tests/resource/on-start.test.w) | test | sim

## stdout.log
```log
[ERROR] method calls fail if the resource fails to start | Error: unexpected error!
  --> on-start.test.w:6:5
  | 
  | inflight class OnStartThrowerBackend impl sim.IResource {
  |   new() {
6 |     throw "unexpected error!";
  |     ^
at $inflight_init <ABSOLUTE>/on-start.test.w:6:5
at <ABSOLUTE>/on-start.test.w:17:18
[ERROR] method calls fail if the resource fails to start | Error: root/Default/OnStartThrower/Resource failed to start: Error: unexpected error!
[ERROR] method calls fail if the resource fails to start | Error: Resource is not running (it may have crashed or stopped)
pass ─ on-start.test.wsim » root/Default/test:method calls fail if the resource fails to start

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

