# [resource.test.w](../../../../../examples/tests/valid/resource.test.w) | test | sim

## stderr.log
```log
Error: Resource "root/env1/BigPublisher/Queue" does not have permission to perform operation "hasAvailableWorkers" on resource "root/env1/BigPublisher/Queue/SetConsumer0".
    at Proxy.<anonymous> (<ABSOLUTE>:LINE:COL)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async Queue.processMessages (<ABSOLUTE>:LINE:COL)
    at async loop (<ABSOLUTE>:LINE:COL) {
  name: undefined
}
```

## stdout.log
```log
pass ┌ resource.test.wsim » root/env0/test:test             
     └ counter is: 201
pass ┌ resource.test.wsim » root/env1/test:dependency cycles
     └ counter is: 201
 
 
Tests 2 passed (2)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

