# [on-stop.test.w](../../../../../../tests/sdk_tests/resource/on-stop.test.w) | test | sim

## stdout.log
```log
[ERROR] if a resource throws an error on stopping, it doesn't crash the simulation | Error: unexpected error!
  --> on-stop.test.w:5:5
  | 
  | inflight class OnStopThrowerBackend impl sim.IResource {
  |   pub onStop() {
5 |     throw "unexpected error!";
  |     ^
at onStop <ABSOLUTE>/on-stop.test.w:5:5
pass ─ on-stop.test.wsim » root/Default/test:if a resource throws an error on stopping, it doesn't crash the simulation

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

