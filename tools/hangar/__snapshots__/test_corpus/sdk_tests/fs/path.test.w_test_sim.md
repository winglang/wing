# [path.test.w](../../../../../../examples/tests/sdk_tests/fs/path.test.w) | test | sim

## stderr.log
```log
Simulator lockfile compromised. Stopping simulation. Reason: Failed to update the lockfile.
Error: ENOENT: no such file or directory, utime '/home/runner/work/wing/wing/examples/tests/sdk_tests/fs/target/test/path.test.wsim/.state/<STATE_FILE>'
    at async Object.utimes (node:internal/fs/promises:1134:10)
    at async <ABSOLUTE>/lockfile.js:85:21 {
  errno: -2,
  code: 'ENOENT',
  syscall: 'utime',
  path: '/home/runner/work/wing/wing/examples/tests/sdk_tests/fs/target/test/path.test.wsim/.state/<STATE_FILE>'
}
Unexpected error in Lockfile.onCompromised callback: Error: There is no running simulation to stop. Did you mean to call `await simulator.start()` first?
    at Simulator.stop (<ABSOLUTE>:LINE:COL)
    at Lockfile.onCompromised (<ABSOLUTE>:LINE:COL)
    at Lockfile.markAsCompromised (<ABSOLUTE>:LINE:COL)
    at async <ABSOLUTE>/lockfile.js:89:21
```

## stdout.log
```log
pass ─ path.test.wsim » root/env0/test:inflight path conversion
pass ─ path.test.wsim » root/env1/test:extension()             

Tests 2 passed (2)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

