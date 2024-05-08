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
--------------------------------- ORIGINAL STACK TRACE ---------------------------------
NotImplementedError: Queue.timeout is not supported on the sim platform yet.
For more information see: https://github.com/winglang/wing/issues/1980.
Contributions welcome ❤️
    at new Queue (<ABSOLUTE>:LINE:COL)
    at App.tryNew (<ABSOLUTE>:LINE:COL)
    at App.new (<ABSOLUTE>:LINE:COL)
    at new $Root (<ABSOLUTE>:LINE:COL)
    at TestRunner._createTree (<ABSOLUTE>:LINE:COL)
    at new App (<ABSOLUTE>:LINE:COL)
    at newApp (<ABSOLUTE>:LINE:COL)
    at PlatformManager.createApp (<ABSOLUTE>:LINE:COL)
    at Object.<anonymous> (<ABSOLUTE>:LINE:COL)
    at Module._compile (node:internal/modules/cjs/loader:1369:14)

Tests 1 unsupported (1)
Snapshots 1 skipped
Test Files 1 unsupported (1)
Duration <DURATION>
```

