# [signed_url.test.w](../../../../../../examples/tests/sdk_tests/bucket/signed_url.test.w) | test | sim

## stdout.log
```log
runtime error: Resource root/env0/testBucket does not support inflight operation signedUrl (requested by root/env0/test:signedUrl/Handler).
It might not be implemented yet.
  --> ../../../../examples/tests/sdk_tests/bucket/signed_url.test.w:7:18
  | 
  | let testBucket = new cloud.Bucket(public: true) as "testBucket";
  | 
7 | test "signedUrl" {
  |                  ^
at _registerOnLift (<ABSOLUTE>:LINE:COL)
at (<ABSOLUTE>:LINE:COL)
 
 
Tests 1 unsupported (1)
Test Files 1 unsupported (1)
Duration <DURATION>
```

