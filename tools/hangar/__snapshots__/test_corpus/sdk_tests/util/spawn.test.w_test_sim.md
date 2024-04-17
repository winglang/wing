# [spawn.test.w](../../../../../../examples/tests/sdk_tests/util/spawn.test.w) | test | sim

## stdout.log
```log
[INFO] spawn() with successful execution | Spawned child process with PID: 8718
[INFO] spawn() with successful execution | Waiting for child process to finish...null
[INFO] spawn() with successful execution | Child process exited with code: 0
[INFO] spawn() with empty args | Spawned child process with PID: 8734
[INFO] spawn() with empty args | Waiting for child process to finish...null
[INFO] spawn() with empty args | Child process exited with code: 0
[INFO] spawn() with non-existent program | Spawned child process with PID: undefined
[INFO] spawn() with non-existent program | Waiting for child process to finish...null
[INFO] spawn() and wait for terminated program | Spawned child process with PID: 8759
[INFO] spawn() and wait for terminated program | Child process exited with code: 0
[INFO] spawn() and wait for terminated program | Process already finished, returning output.
[INFO] spawn() and kill process | Spawned child process with PID: 8793
[INFO] spawn() and kill process | Waiting for child process to finish...null
[INFO] spawn() and kill process | Child process exited with code: null
pass ─ spawn.test.wsim » root/env0/test:spawn() with successful execution      
pass ─ spawn.test.wsim » root/env1/test:spawn() with empty args                
pass ─ spawn.test.wsim » root/env2/test:spawn() with non-existent program      
pass ─ spawn.test.wsim » root/env3/test:spawn() and wait for terminated program
pass ─ spawn.test.wsim » root/env4/test:spawn() and kill process               

Tests 5 passed (5)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

