# [aws-function.test.w](../../../../../../examples/tests/sdk_tests/function/aws-function.test.w) | test | sim

## stdout.log
```log
[ERROR] can access lambda context | Error: fake error
   --> aws-function.test.w:43:5
   | 
   | let fn = new cloud.Function(inflight (msg: str?) => {
   |   if msg == "error" {
43 |     throw "fake error";
   |     ^
at <ABSOLUTE>/aws-function.test.w:43:5
pass ─ aws-function.test.wsim » root/env0/test:validates the AWS Function
pass ─ aws-function.test.wsim » root/env1/test:can access lambda context 

Tests 2 passed (2)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

