# [resource_captures.w](../../../../../examples/tests/valid/resource_captures.w) | test | sim

## stdout.log
```log
captures: 
captures: 
captures: Variables:
  $inflight_init():
    this.another => [anotherFunc,first.myResource.get,first.myResource.list,first.myResource.put,meaningOfLife,myField]
    this.extBucket => [list]
    this.myQueue => [push]
    this.myResource => [get,list,put]
  testCaptureCollectionsOfData():
    this.arrayOfStr => []
    this.mapOfNum => []
    this.setOfStr => []
  testCaptureOptional():
    this.myOptStr => []
  testCapturePrimitives():
    this.myBool => []
    this.myNum => []
    this.myStr => []
  testCaptureResource():
    this.myResource => [get,list,put]
  testExpressionRecursive():
    this.myQueue => [push]
    this.myStr => []
  testExternal():
    this.extBucket => [list]
    this.extNum => []
  testNestedInflightField():
    this.another => [myField]
  testNestedResource():
    this.another => [first.myResource.get,first.myResource.list,first.myResource.put]
    this.myStr => []
  testUserDefinedResource():
    this.another => [anotherFunc,meaningOfLife]

captures: Variables:
  $inflight_init():
    r => [testCaptureCollectionsOfData,testCaptureOptional,testCapturePrimitives,testCaptureResource,testExpressionRecursive,testExternal,testInflightField,testNestedInflightField,testNestedResource,testNoCapture,testUserDefinedResource]
  handle():
    r => [testCaptureCollectionsOfData,testCaptureOptional,testCapturePrimitives,testCaptureResource,testExpressionRecursive,testExternal,testInflightField,testNestedInflightField,testNestedResource,testNoCapture,testUserDefinedResource]

ERROR: Resource "root/env0/MyResource/Another" does not support inflight operation "first.myResource.get" (requested by "root/env0/test:test/Handler")

../../../../examples/tests/valid/target/test/resource_captures.wsim.281588.tmp/.wing/preflight.js:114
         _registerBind(host, ops) {
           if (ops.includes("$inflight_init")) {
>>           MyResource._registerBindObject(this.another, host, ["anotherFunc", "first.myResource.get", "first.myResource.list", "first.myResource.put", "meaningOfLife", "myField"]);
             MyResource._registerBindObject(this.extBucket, host, ["list"]);
             MyResource._registerBindObject(this.myQueue, host, ["push"]);

 




Tests 1 failed (1) 
Duration <DURATION>

```

