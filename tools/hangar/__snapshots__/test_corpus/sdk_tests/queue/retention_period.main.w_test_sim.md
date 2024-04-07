# [retention_period.main.w](../../../../../../examples/tests/sdk_tests/queue/retention_period.main.w) | test | sim

## stdout.log
```log
Error: Queue.timeout is not supported on the sim platform yet.
For more information see: https://github.com/winglang/wing/issues/1980.
Contributions welcome ❤️
  --> retention_period.main.w:7:9
  | let var timeout = 30s;
  | let var retentionPeriod = 60s;
  | 
7 | let q = new cloud.Queue(timeout: timeout, retentionPeriod: retentionPeriod);
  |         ^
at <ABSOLUTE>/retention_period.main.w:7:9
 
Tests 1 unsupported (1)
Test Files 1 unsupported (1)
Duration <DURATION>
```

