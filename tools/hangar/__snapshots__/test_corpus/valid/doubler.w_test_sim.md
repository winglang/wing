# [doubler.w](../../../../../examples/tests/valid/doubler.w) | test | sim

## stdout.log
```log
captures: Variables:
  $inflight_init():
    this.func => [handle]
  invoke():
    this.func => [handle]

captures: 
captures: Types:
  std.Number = Number
  std.Json = Json
Variables:
  handle():
    handler => []

captures: 
captures: 
captures: Variables:
  $inflight_init():
    f => [invoke]
  handle():
    f => [invoke]

pass ─ doubler.wsim » root/env0/test:f(2) == 8
 




Tests 1 passed (1) 
Duration <DURATION>

```

