# [concurrency.test.w](../../../../../../examples/tests/sdk_tests/function/concurrency.test.w) | test | sim

## stdout.log
```log
[ERROR] f1 concurrency limit reached | Invoke (payload=undefined). Error: Too many requests, the function has reached its concurrency limit.
[INFO] queue applies backpressure to functions with limited concurrency | c: 3
pass ─ concurrency.test.wsim » root/env0/test:f1 concurrency limit reached                                    
pass ─ concurrency.test.wsim » root/env1/test:queue applies backpressure to functions with limited concurrency

Tests 2 passed (2)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

