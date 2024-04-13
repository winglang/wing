# [get.test.w](../../../../../../examples/tests/sdk_tests/bucket/get.test.w) | test | sim

## stdout.log
```log
[ERROR] get range of an object | Get (key=test2.txt). Error: Object does not exist (key=test2.txt): TypeError: The encoded data was not valid for encoding utf-8
    at TextDecoder.decode (node:internal/encoding:449:16)
    at Object.activity (<ABSOLUTE>:LINE:COL)
    at async Object.withTrace (<ABSOLUTE>:LINE:COL)
pass ─ get.test.wsim » root/env0/test:get range of an object
pass ─ get.test.wsim » root/env1/test:get empty object      

Tests 2 passed (2)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

