# [json_bucket.w](../../../../../examples/tests/valid/json_bucket.w) | test | sim

## stdout.log
```log
captures: Variables:
  $inflight_init():
    b => [getJson]
  handle():
    b => [getJson]
    fileName => []

captures: Variables:
  $inflight_init():
    b => [putJson]
    getJson => [invoke]
  handle():
    b => [putJson]
    fileName => []
    getJson => [invoke]
    j => []

pass ─ json_bucket.wsim » root/env0/test:put
 




Tests 1 passed (1) 
Duration <DURATION>

```

