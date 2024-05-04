# [redis.test.w](../../../../../examples/tests/valid/redis.test.w) | test | sim

## stdout.log
```log
[INFO] testing Redis | docker.io/library/redis@sha256:e50c7e23f79ae81351beacb20e004720d4bed657415e68c2b1a2b5557c075ce0: Pulling from library/redis
[INFO] testing Redis | 3f9582a2cbe7: Pulling fs layer
241c2d338588: Pulling fs layer
89515d93a23e: Pulling fs layer
65e8ba9473fe: Pulling fs layer
585124038cab: Pulling fs layer
b483de716a47: Pulling fs layer
65e8ba9473fe: Waiting
585124038cab: Waiting
b483de716a47: Waiting
[INFO] testing Redis | 241c2d338588: Download complete
[INFO] testing Redis | 89515d93a23e: Verifying Checksum
89515d93a23e: Download complete
[INFO] testing Redis | 585124038cab: Verifying Checksum
585124038cab: Download complete
[INFO] testing Redis | b483de716a47: Verifying Checksum
b483de716a47: Download complete
[INFO] testing Redis | 65e8ba9473fe: Verifying Checksum
65e8ba9473fe: Download complete
[INFO] testing Redis | 3f9582a2cbe7: Verifying Checksum
[INFO] testing Redis | 3f9582a2cbe7: Download complete
[INFO] testing Redis | 3f9582a2cbe7: Pull complete
[INFO] testing Redis | 241c2d338588: Pull complete
[INFO] testing Redis | 89515d93a23e: Pull complete
[INFO] testing Redis | 65e8ba9473fe: Pull complete
[INFO] testing Redis | 585124038cab: Pull complete
[INFO] testing Redis | b483de716a47: Pull complete
[INFO] testing Redis | Digest: sha256:e50c7e23f79ae81351beacb20e004720d4bed657415e68c2b1a2b5557c075ce0
[INFO] testing Redis | Status: Downloaded newer image for redis@sha256:e50c7e23f79ae81351beacb20e004720d4bed657415e68c2b1a2b5557c075ce0
[INFO] testing Redis | docker.io/library/redis@sha256:e50c7e23f79ae81351beacb20e004720d4bed657415e68c2b1a2b5557c075ce0
[INFO] testing Redis | Container redis@sha256:e50c7e23f79ae81351beacb20e004720d4bed657415e68c2b1a2b5557c075ce0 started
[INFO] testing Redis | 1:C 04 May 2024 10:35:09.307 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
1:C 04 May 2024 10:35:09.307 # Redis version=7.0.9, bits=64, commit=00000000, modified=0, pid=1, just started
1:C 04 May 2024 10:35:09.307 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server <ABSOLUTE>/redis.conf
1:M 04 May 2024 10:35:09.308 * monotonic clock: POSIX clock_gettime
1:M 04 May 2024 10:35:09.308 * Running mode=standalone, port=6379.
1:M 04 May 2024 10:35:09.308 # Server initialized
1:M 04 May 2024 10:35:09.308 # WARNING Memory overcommit must be enabled! Without it, a background save or replication may fail under low memory condition. Being disabled, it can can also cause failures without low memory condition, see https://github.com/jemalloc/jemalloc/issues/1328. To fix this issue add 'vm.overcommit_memory = 1' to <ABSOLUTE>/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
1:M 04 May 2024 10:35:09.308 * Ready to accept connections
[INFO] testing Redis | Container redis@sha256:e50c7e23f79ae81351beacb20e004720d4bed657415e68c2b1a2b5557c075ce0 started
[INFO] testing Redis | 1:C 04 May 2024 10:35:09.590 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
1:C 04 May 2024 10:35:09.590 # Redis version=7.0.9, bits=64, commit=00000000, modified=0, pid=1, just started
1:C 04 May 2024 10:35:09.590 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server <ABSOLUTE>/redis.conf
1:M 04 May 2024 10:35:09.590 * monotonic clock: POSIX clock_gettime
1:M 04 May 2024 10:35:09.591 * Running mode=standalone, port=6379.
1:M 04 May 2024 10:35:09.591 # Server initialized
1:M 04 May 2024 10:35:09.591 # WARNING Memory overcommit must be enabled! Without it, a background save or replication may fail under low memory condition. Being disabled, it can can also cause failures without low memory condition, see https://github.com/jemalloc/jemalloc/issues/1328. To fix this issue add 'vm.overcommit_memory = 1' to <ABSOLUTE>/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
1:M 04 May 2024 10:35:09.591 * Ready to accept connections
[INFO] testing Redis | Error: non-zero exit code: null
    at ChildProcess.<anonymous> (<ABSOLUTE>:LINE:COL)
    at Object.onceWrapper (node:events:633:26)
    at ChildProcess.emit (node:events:530:35)
    at ChildProcess._handle.onexit (node:internal/child_process:294:12)
[INFO] testing Redis | Error: non-zero exit code: null
    at ChildProcess.<anonymous> (<ABSOLUTE>:LINE:COL)
    at Object.onceWrapper (node:events:633:26)
    at ChildProcess.emit (node:events:530:35)
    at ChildProcess._handle.onexit (node:internal/child_process:294:12)
pass ─ redis.test.wsim » root/env0/test:testing Redis

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

