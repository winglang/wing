# [inflight_class_inside_inflight_closure.w](../../../../../examples/tests/valid/inflight_class_inside_inflight_closure.w) | test | sim

## stdout.log
```log
captures: Types:
  InflightClass = InflightClass
Variables:
  $inflight_init():
    __parent_this => [b.put]
  handle():
    __parent_this => [b.put]

captures: 
captures: Variables:
  $inflight_init():
    f => [invoke]
  handle():
    f => [invoke]

captures: Types:
  Foo = Foo

ERROR: Resource "root/env0/PreflightClass" does not support inflight operation "b.put" (requested by "root/env0/PreflightClass/cloud.Function")

../../../../examples/tests/valid/target/test/inflight_class_inside_inflight_closure.wsim.285872.tmp/.wing/preflight.js:46
             _registerBind(host, ops) {
               if (ops.includes("$inflight_init")) {
>>               $Closure1._registerBindObject(__parent_this, host, ["b.put"]);
               }
               if (ops.includes("handle")) {

 




Tests 1 failed (1) 
Duration <DURATION>

```

