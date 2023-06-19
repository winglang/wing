# [inflights_calling_inflights.w](../../../../../examples/tests/valid/inflights_calling_inflights.w) | test | sim

## stdout.log
```log
=====================================================================
$Closure1
---------------------------------------------------------------------
Variables:
  handle():
    globalBucket => [put]

=====================================================================
$Closure2
---------------------------------------------------------------------
Variables:
  handle():
    storeInBucket => []

=====================================================================
$Closure3
---------------------------------------------------------------------
Variables:
  handle():
    func1 => [invoke]
    globalBucket => [get]

=====================================================================
MyResource
---------------------------------------------------------------------
Variables:
  foo():
    this.closure => []

=====================================================================
$Closure4
---------------------------------------------------------------------
Variables:
  handle():
    globalBucket => [list]

=====================================================================
$Closure5
---------------------------------------------------------------------
Variables:
  handle():
    x => [foo]

ERROR: Resource "root/env0/$Closure1" does not support inflight operation "" (requested by "root/env0/func1")

../../../../examples/tests/valid/target/test/inflights_calling_inflights.wsim.502007.tmp/.wing/preflight.js:40
             $Closure1._registerBindObject(globalBucket, host, ["put"]);
           }
>>         super._registerBind(host, ops);
         }
       }

 




Tests 1 failed (1) 
Duration <DURATION>

```

