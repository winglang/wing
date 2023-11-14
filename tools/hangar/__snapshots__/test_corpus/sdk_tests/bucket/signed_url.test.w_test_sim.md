# [signed_url.test.w](../../../../../../examples/tests/sdk_tests/bucket/signed_url.test.w) | test | sim

## stdout.log
```log
ERROR: Resource root/env0/testBucket does not support inflight operation signedUrl (requested by root/env0/test:signedUrl/Handler).
It might not be implemented yet.

../../../../examples/tests/sdk_tests/bucket/target/test/signed_url.test.wsim.[REDACTED].tmp/.wing/preflight.js:42
         _registerOnLift(host, ops) {
           if (ops.includes("handle")) {
>>           $Closure1._registerOnLiftObject(testBucket, host, ["put", "signedUrl"]);
           }
           super._registerOnLift(host, ops);

 
 
Tests 1 unsupported (1)
Test Files 1 unsupported (1)
Duration <DURATION>
```

