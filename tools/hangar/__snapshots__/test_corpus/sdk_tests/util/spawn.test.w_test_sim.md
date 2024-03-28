# [spawn.test.w](../../../../../../examples/tests/sdk_tests/util/spawn.test.w) | test | sim

## stdout.log
```log
pass ┌ spawn.test.wsim » root/env0/test:spawn() with successful execution      
     │ Spawned child process with PID: 8447
     │ Waiting for child process to finish...null
     └ Child process exited with code: 0
pass ┌ spawn.test.wsim » root/env1/test:spawn() with empty args                
     │ Spawned child process with PID: 8455
     │ Waiting for child process to finish...null
     └ Child process exited with code: 0
pass ┌ spawn.test.wsim » root/env2/test:spawn() with non-existent program      
     │ Spawned child process with PID: undefined
     └ Waiting for child process to finish...null
pass ┌ spawn.test.wsim » root/env3/test:spawn() and wait for terminated program
     │ Spawned child process with PID: 8472
     │ Child process exited with code: 0
     └ Process already finished, returning output.
pass ┌ spawn.test.wsim » root/env4/test:spawn() and kill process               
     │ Spawned child process with PID: 8502
     │ Waiting for child process to finish...null
     └ Child process exited with code: null
 
 
Tests 5 passed (5)
Test Files 1 passed (1)
Duration <DURATION>
```

