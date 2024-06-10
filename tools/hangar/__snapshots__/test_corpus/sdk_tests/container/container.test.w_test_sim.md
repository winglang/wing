# [container.test.w](../../../../../../examples/tests/sdk_tests/container/container.test.w) | test | sim

## stdout.log
```log
[ERROR] get app | Error: Failed to start container: Container hashicorp/http-echo stopped unexpectedly
[INFO] get echo | bang
[INFO] get echo | 
[INFO] get app | Hello, Wingnuts!
[INFO] container with entrypoint | hello
[INFO] container with host network | http://localhost:5678
[INFO] container with host network | bang
[INFO] container with host network | 
[WARNING] get echo | Timeout waiting for container root/env0/my-app to shutdown, removing forcefully
[WARNING] get echo | Timeout waiting for container root/env0/with-entrypoint to shutdown, removing forcefully
[WARNING] get app | Timeout waiting for container root/env1/my-app to shutdown, removing forcefully
[WARNING] get app | Timeout waiting for container root/env1/with-entrypoint to shutdown, removing forcefully
[WARNING] container with entrypoint | Timeout waiting for container root/env2/my-app to shutdown, removing forcefully
[WARNING] container with entrypoint | Timeout waiting for container root/env2/with-entrypoint to shutdown, removing forcefully
[WARNING] container with host network | Timeout waiting for container root/env3/my-app to shutdown, removing forcefully
[WARNING] container with host network | Timeout waiting for container root/env3/with-entrypoint to shutdown, removing forcefully
pass ─ container.test.wsim » root/env0/test:get echo                   
pass ─ container.test.wsim » root/env1/test:get app                    
pass ─ container.test.wsim » root/env2/test:container with entrypoint  
pass ─ container.test.wsim » root/env3/test:container with host network

Tests 4 passed (4)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

