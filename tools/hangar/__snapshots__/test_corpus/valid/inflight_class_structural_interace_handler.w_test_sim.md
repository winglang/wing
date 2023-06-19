# [inflight_class_structural_interace_handler.w](../../../../../examples/tests/valid/inflight_class_structural_interace_handler.w) | test | sim

## stdout.log
```log
captures: 
captures: Types:
  YesGoo = YesGoo
  NotGoo = NotGoo

ERROR: YesGoo is not defined

../../../../examples/tests/valid/target/test/inflight_class_structural_interace_handler.wsim.274923.tmp/.wing/preflight.js:41
         static _toInflightType(context) {
           const NotGooClient = NotGoo._toInflightType(context);
>>         const YesGooClient = YesGoo._toInflightType(context);
           return $stdlib.core.NodeJsCode.fromInline(`
             require("./inflight.$Closure1.js")({

 




Tests 1 failed (1) 
Duration <DURATION>

```

