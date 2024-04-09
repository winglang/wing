# [pop.test.w](../../../../../../examples/tests/sdk_tests/queue/pop.test.w) | test | sim

## stdout.log
```log
Error: Queue.timeout is not supported on the sim platform yet.
For more information see: https://github.com/winglang/wing/issues/1980.
Contributions welcome ❤️
  --> pop.test.w:5:9
  | bring util;
  | 
  | let timeout = 3s;
5 | let q = new cloud.Queue(timeout: timeout);
  |         ^
at <ABSOLUTE>/pop.test.w:5:9
 
 
Tests 1 unsupported (1)
Snapshots 1 skipped
Test Files 1 unsupported (1)
Duration <DURATION>
```

