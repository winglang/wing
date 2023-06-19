# [inflight_class_definitions.w](../../../../../examples/tests/valid/inflight_class_definitions.w) | test | sim

## stdout.log
```log
captures: 
captures: 
captures: Types:
  C = C

captures: 
captures: 
captures: 
captures: Variables:
  callInner():
    this.inner => []

captures: Types:
  B = B
Variables:
  $inflight_init():
    a => [goo]
    d => [callInner]
  handle():
    a => [goo]
    d => [callInner]
    fn => []
    innerD => []

ERROR: C is not defined

../../../../examples/tests/valid/target/test/inflight_class_definitions.wsim.281615.tmp/.wing/preflight.js:67
         }
         static _toInflightType(context) {
>>         const CClient = C._toInflightType(context);
           return $stdlib.core.NodeJsCode.fromInline(`
             require("./inflight.$Closure1.js")({

 




Tests 1 failed (1) 
Duration <DURATION>

```

