# [container.test.w](../../../../../../examples/tests/sdk_tests/container/container.test.w) | test | sim

## stdout.log
```log
[INFO] get echo | Image hashicorp/http-echo not found, pulling...
[INFO] get echo | Container hashicorp/http-echo started
[INFO] get app | Image my-app:a9ae83b54b1ec21faa1a3255f05c095c not found, building from ./my-docker-image...
[INFO] get app | Container my-app:a9ae83b54b1ec21faa1a3255f05c095c started
[INFO] get echo | Container my-app:a9ae83b54b1ec21faa1a3255f05c095c started
[INFO] get app | Container hashicorp/http-echo started
[INFO] get echo | bang
[INFO] get echo | 
[INFO] get app | Hello, Wingnuts!
[ERROR] get echo | non-zero exit code: 2 Error: non-zero exit code: 2
[ERROR] get app | non-zero exit code: 2 Error: non-zero exit code: 2
pass ─ container.test.wsim » root/env0/test:get echo
pass ─ container.test.wsim » root/env1/test:get app 

Tests 2 passed (2)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

