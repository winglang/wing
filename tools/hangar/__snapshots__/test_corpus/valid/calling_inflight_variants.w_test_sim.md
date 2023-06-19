# [calling_inflight_variants.w](../../../../../examples/tests/valid/calling_inflight_variants.w) | test | sim

## stdout.log
```log
captures: 
captures: Variables:
  callFn2():
    this.inflight1 => []
  makeFn():
    this.inflight1 => []

captures: Variables:
  $inflight_init():
    foo => [callFn,callFn2]
  handle():
    foo => [callFn,callFn2]

pass ─ calling_inflight_variants.wsim » root/env0/test:calling different types of inflights
 




Tests 1 passed (1) 
Duration <DURATION>

```

