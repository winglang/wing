# [optionals.test.w](../../../../../examples/tests/valid/optionals.test.w) | test | sim

## stdout.log
```log
runtime error: Resource root/env0/orange bucket does not support inflight operation c (requested by root/env0/test:t/Handler).
It might not be implemented yet.
    --> optionals.test.w:191:10
    | let payloadWithoutOptions = Payload {a: "a"};
    | let payloadWithBucket = Payload {a: "a", c: new cloud.Bucket() as "orange bucket"};
    | 
191 | test "t" {
    |          ^
at _registerOnLift (<ABSOLUTE>:LINE:COL)
at (<ABSOLUTE>:LINE:COL)
 
 
Tests 1 unsupported (1)
Test Files 1 unsupported (1)
Duration <DURATION>
```

