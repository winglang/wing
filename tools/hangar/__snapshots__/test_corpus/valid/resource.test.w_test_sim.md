# [resource.test.w](../../../../../examples/tests/valid/resource.test.w) | test | sim

## stderr.log
```log
Error: No resource found with handle "sim-25".
    at HandleManager.find (<ABSOLUTE>:LINE:COL)
    at Object.findInstance (<ABSOLUTE>:LINE:COL)
    at Queue.processMessages (<ABSOLUTE>:LINE:COL)
    at <ABSOLUTE>/queue.inflight.js:12:59
    at loop (<ABSOLUTE>:LINE:COL)
```

## stdout.log
```log
pass ┌ resource.test.wsim » root/env0/test:test             
     └ counter is: 201
pass ─ resource.test.wsim » root/env1/test:dependency cycles
 
 
Tests 2 passed (2)
Test Files 1 passed (1)
Duration <DURATION>
```

