# [main.w](../../../../../../../examples/tests/doc_examples/valid/00-cloud-oriented-programming.md_example_1/main.w) | test | sim

## stdout.log
```log
Error: Queue.timeout is not supported on the sim platform yet.
For more information see: https://github.com/winglang/wing/issues/1980.
Contributions welcome ❤️
  --> main.w:5:13
  | // Example metadata: {"valid":true}
  | bring cloud;
  | 
5 | let queue = new cloud.Queue(timeout: 2m);
  |             ^
at <ABSOLUTE>/main.w:5:13

Tests 1 unsupported (1)
Snapshots 1 skipped
Test Files 1 unsupported (1)
Duration <DURATION>
```

