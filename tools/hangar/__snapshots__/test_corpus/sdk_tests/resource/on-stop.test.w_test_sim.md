# [on-stop.test.w](../../../../../../examples/tests/sdk_tests/resource/on-stop.test.w) | test | sim

## stdout.log
```log
[ERROR] if a resource throws an error on stopping, it doesn't crash the simulation | Error: unexpected error!
  --> on-stop.test.w:6:5
  | inflight class OnStopThrowerBackend impl sim.IResource {
  |   pub onStart(ctx: sim.IResourceContext) {}
  |   pub onStop() {
6 |     throw "unexpected error!";
  |     ^
at onStop <ABSOLUTE>/on-stop.test.w:6:5
pass ─ on-stop.test.wsim » root/env0/test:if a resource throws an error on stopping, it doesn't crash the simulation

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

