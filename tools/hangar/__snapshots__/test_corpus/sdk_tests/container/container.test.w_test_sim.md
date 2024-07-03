# [container.test.w](../../../../../../examples/tests/sdk_tests/container/container.test.w) | test | sim

## stdout.log
```log
[INFO] get echo | bang
[INFO] get echo | 
[INFO] get app | Hello, Wingnuts!
[WARNING] get echo | Timeout waiting for container root/env0/http-echo to shutdown, removing forcefully
[WARNING] get echo | Timeout waiting for container root/env0/my-app to shutdown, removing forcefully
[WARNING] get app | Timeout waiting for container root/env1/http-echo to shutdown, removing forcefully
[WARNING] get app | Timeout waiting for container root/env1/my-app to shutdown, removing forcefully
pass ─ container.test.wsim » root/env0/test:get echo
pass ─ container.test.wsim » root/env1/test:get app 

Tests 2 passed (2)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

