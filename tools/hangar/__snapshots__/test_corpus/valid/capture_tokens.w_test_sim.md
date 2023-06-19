# [capture_tokens.w](../../../../../examples/tests/valid/capture_tokens.w) | test | sim

## stdout.log
```log
=====================================================================
MyResource
---------------------------------------------------------------------
Variables:
  foo():
    this.api => [url]
    this.url => []

=====================================================================
$Closure1
---------------------------------------------------------------------
Variables:
  handle():
    r => [foo]

=====================================================================
$Closure2
---------------------------------------------------------------------
Types:
  MyResource = MyResource
Variables:
  handle():
    api => [url]
    url => []

pass ─ capture_tokens.wsim » root/env0/test:inflight class  
pass ─ capture_tokens.wsim » root/env1/test:inflight globals
 




Tests 1 passed (1) 
Duration <DURATION>

```

