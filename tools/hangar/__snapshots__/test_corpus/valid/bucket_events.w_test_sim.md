# [bucket_events.w](../../../../../examples/tests/valid/bucket_events.w) | test | sim

## stdout.log
```log
=====================================================================
$Closure1
---------------------------------------------------------------------

=====================================================================
$Closure2
---------------------------------------------------------------------

=====================================================================
$Closure3
---------------------------------------------------------------------

=====================================================================
$Closure4
---------------------------------------------------------------------
Types:
  std.Json = Json
Variables:
  handle():
    other => [put]

=====================================================================
$Closure5
---------------------------------------------------------------------

=====================================================================
$Closure6
---------------------------------------------------------------------
Variables:
  handle():
    b => [delete,put]

pass ┌ bucket_events.wsim » root/env0/test:test
     │ created a
     │ last key a
     │ other bucket event called!
     │ created b
     │ last key b
     │ other bucket event called!
     │ updated b
     │ last key b
     │ other bucket event called!
     │ created c
     │ last key c
     │ other bucket event called!
     │ deleted c
     │ last key c
     └ other bucket event called!
 




Tests 1 passed (1) 
Duration <DURATION>

```

