# [bring_cdktf.w](../../../../../examples/tests/valid/bring_cdktf.w) | test | sim

## stdout.log
```log
=====================================================================
MyClass
---------------------------------------------------------------------
Variables:
  getBucketArn():
    this.b2 => [arn]

=====================================================================
$Closure1
---------------------------------------------------------------------
Variables:
  handle():
    b => [arn,bucketDomainName]
    c => [getBucketArn]

ERROR: No stack could be identified for the construct at path 'root/env0/aws.s3Bucket.S3Bucket'

../../../../examples/tests/valid/target/test/bring_cdktf.wsim.528331.tmp/.wing/preflight.js:71
         _registerBind(host, ops) {
           if (ops.includes("$inflight_init")) {
>>           $Closure1._registerBindObject(b, host, ["arn", "bucketDomainName"]);
             $Closure1._registerBindObject(c, host, ["getBucketArn"]);
           }

 




Tests 1 failed (1) 
Duration <DURATION>

```

