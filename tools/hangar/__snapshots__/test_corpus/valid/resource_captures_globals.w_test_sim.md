# [resource_captures_globals.w](../../../../../examples/tests/valid/resource_captures_globals.w) | test | sim

## stdout.log
```log
captures: 
captures: Variables:
  $inflight_init():
    globalCounter => [inc,peek]
  myMethod():
    globalCounter => [inc,peek]
  myStaticMethod():
    globalCounter => [peek]

captures: Variables:
  $inflight_init():
    $parentThis => [localCounter.inc]
    globalCounter => [inc]
  handle():
    $parentThis => [localCounter.inc]
    globalCounter => [inc]

captures: Types:
  Another = Another
Variables:
  $inflight_init():
    globalAnother => [first.myResource.put,myField,myMethod]
    globalBucket => [put]
    this.localTopic => [publish]
  myPut():
    globalAnother => [first.myResource.put,myField,myMethod]
    globalArrayOfStr => []
    globalBool => []
    globalBucket => [put]
    globalMapOfNum => []
    globalNum => []
    globalSetOfStr => []
    globalStr => []
    this.localTopic => [publish]

captures: Variables:
  $inflight_init():
    res => [myPut]
  handle():
    res => [myPut]

captures: Types:
  Another = Another

ERROR: Resource "root/env0/Another" does not support inflight operation "first.myResource.put" (requested by "root/env0/MyResource/cloud.Topic-OnMessage-bdb05a8d")

../../../../examples/tests/valid/target/test/resource_captures_globals.wsim.284646.tmp/.wing/preflight.js:67
             Another._registerBindObject(globalCounter, host, ["inc", "peek"]);
           }
>>         super._registerBind(host, ops);
         }
         static _registerTypeBind(host, ops) {

 




Tests 1 failed (1) 
Duration <DURATION>

```

