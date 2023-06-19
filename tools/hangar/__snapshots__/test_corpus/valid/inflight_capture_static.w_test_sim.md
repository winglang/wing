# [inflight_capture_static.w](../../../../../examples/tests/valid/inflight_capture_static.w) | test | sim

## stdout.log
```log
captures: 
captures: 
captures: Types:
  Preflight = Preflight

captures: Types:
  OuterInflight = OuterInflight

captures: Types:
  InnerInflight = InnerInflight

captures: Types:
  util.Util = Util

ERROR: InnerInflight is not defined

../../../../examples/tests/valid/target/test/inflight_capture_static.wsim.276645.tmp/.wing/preflight.js:116
         }
         static _toInflightType(context) {
>>         const InnerInflightClient = InnerInflight._toInflightType(context);
           return $stdlib.core.NodeJsCode.fromInline(`
             require("./inflight.$Closure3.js")({

 




Tests 1 failed (1) 
Duration <DURATION>

```

