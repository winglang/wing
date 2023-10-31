# [copy.test.w](../../../../../../examples/tests/sdk_tests/bucket/copy.test.w) | test | sim

## stdout.log
```log
ERROR: Resource root/env0/cloud.Bucket does not support inflight operation copy (requested by root/env0/test:copy()/Handler).
It might not be implemented yet.

../../../../examples/tests/sdk_tests/bucket/target/test/copy.test.wsim.[REDACTED].tmp/.wing/preflight.js:41
         _registerOnLift(host, ops) {
           if (ops.includes("handle")) {
>>           $Closure1._registerOnLiftObject(b, host, ["copy", "get", "metadata", "put", "putJson"]);
           }
           super._registerOnLift(host, ops);

 
 
Tests 1 unsupported (1)
Test Files 1 unsupported (1)
Duration <DURATION>
```

