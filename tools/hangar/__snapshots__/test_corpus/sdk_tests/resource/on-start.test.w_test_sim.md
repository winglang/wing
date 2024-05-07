# [on-start.test.w](../../../../../../examples/tests/sdk_tests/resource/on-start.test.w) | test | sim

## stdout.log
```log
[ERROR] method calls fail if the resource fails to start | Error: unexpected error!
  --> on-start.test.w:5:5
  | 
  | inflight class OnStartThrowerBackend impl sim.IResource {
  |   pub onStart(ctx: sim.IResourceContext) {
5 |     throw "unexpected error!";
  |     ^
at onStart <ABSOLUTE>/on-start.test.w:5:5
[ERROR] method calls fail if the resource fails to start | Error: resource not started
pass ─ on-start.test.wsim » root/env0/test:method calls fail if the resource fails to start

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

