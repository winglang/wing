# [signed_url.test.w](../../../../../../examples/tests/sdk_tests/bucket/signed_url.test.w) | test | sim

## stdout.log
```log
runtime error: Resource root/env0/cloud.Bucket does not support inflight operation signedUrl (requested by root/env0/test:signedUrl GET (implicit)/Handler).
It might not be implemented yet.
  --> signed_url.test.w:8:33
  | 
  | let bucket = new cloud.Bucket();
  | 
8 | test "signedUrl GET (implicit)" {
  |                                 ^
at onLift <ABSOLUTE>/signed_url.test.w:8:33
 
 
Tests 1 unsupported (1)
Test Files 1 unsupported (1)
Duration <DURATION>
```

