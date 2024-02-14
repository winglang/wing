# [invoke.test.w](../../../../../../examples/tests/sdk_tests/function/invoke.test.w) | test | sim

## stdout.log
```log
log preflight
log preflight
pass ┌ invoke.test.wsim » root/env0/test:invoke                           
     │ log inside test
     └ log inside function
contains 2 lines
pass ┌ invoke.test.wsim » root/env1/test:invoke without inputs and outputs
     │ no event, no return!
     └ bang!
 
 
Tests 2 passed (2)
Test Files 1 passed (1)
Duration <DURATION>
```

