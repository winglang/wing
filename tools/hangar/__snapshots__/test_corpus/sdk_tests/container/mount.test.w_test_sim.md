# [mount.test.w](../../../../../../examples/tests/sdk_tests/container/mount.test.w) | test | sim

## stderr.log
```log
Failed to clean up target/test/mount.test.wsim: Error: EACCES: permission denied, scandir 'target/test/mount.test.wsim/.state/<STATE_FILE>' Error: EACCES: permission denied, scandir 'target/test/mount.test.wsim/.state/<STATE_FILE>'
    at readdirSync (node:fs:1508:26)
    at _rmdirSync (node:internal/fs/rimraf:250:29)
    at rimrafSync (node:internal/fs/rimraf:193:7)
    at node:internal/fs/rimraf:253:9
    at Array.forEach (<anonymous>)
    at _rmdirSync (node:internal/fs/rimraf:250:7)
    at rimrafSync (node:internal/fs/rimraf:193:7)
    at node:internal/fs/rimraf:253:9
    at Array.forEach (<anonymous>)
    at _rmdirSync (node:internal/fs/rimraf:250:7)
    at rimrafSync (node:internal/fs/rimraf:193:7)
    at rmSync (node:fs:1265:10)
    at testSimulator (<ABSOLUTE>:LINE:COL)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async testOne (<ABSOLUTE>:LINE:COL)
    at async testFile (<ABSOLUTE>:LINE:COL)
    at async Promise.all (index 0)
    at async Object.test (<ABSOLUTE>:LINE:COL)
    at async Command.<anonymous> (<ABSOLUTE>:LINE:COL)
```

## stdout.log
```log
[INFO] my test | dummy test
pass ─ mount.test.wsim » root/env0/test:my test

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

