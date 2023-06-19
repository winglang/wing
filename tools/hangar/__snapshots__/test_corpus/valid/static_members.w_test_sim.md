# [static_members.w](../../../../../examples/tests/valid/static_members.w) | test | sim

## stdout.log
```log
captures: 
captures: Types:
  InflightClass = InflightClass

ERROR: InflightClass is not defined

../../../../examples/tests/valid/target/test/static_members.wsim.279646.tmp/.wing/preflight.js:44
         }
         static _toInflightType(context) {
>>         const InflightClassClient = InflightClass._toInflightType(context);
           return $stdlib.core.NodeJsCode.fromInline(`
             require("./inflight.$Closure1.js")({

 




Tests 1 failed (1) 
Duration <DURATION>

```

