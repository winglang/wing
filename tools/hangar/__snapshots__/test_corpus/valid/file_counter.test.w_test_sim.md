# [file_counter.test.w](../../../../../examples/tests/valid/file_counter.test.w) | test | sim

## stdout.log
```log
runtime error: Queue.timeout is not supported on the sim platform yet.
For more information see: https://github.com/winglang/wing/issues/1980.
Contributions welcome ❤️
  --> file_counter.test.w:5:13
  | 
  | let bucket = new cloud.Bucket();
  | let counter = new cloud.Counter(initial: 100);
5 | let queue = new cloud.Queue(timeout: 10s);
  |             ^
at (<ABSOLUTE>:LINE:COL)
 
 
Tests 1 unsupported (1)
Test Files 1 unsupported (1)
Duration <DURATION>
```

