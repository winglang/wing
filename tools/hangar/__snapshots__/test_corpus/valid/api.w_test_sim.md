# [api.w](../../../../../examples/tests/valid/api.w) | test | sim

## stdout.log
```log
captures: Types:
  std.Json = Json
Variables:
  $inflight_init():
    counter => [inc]
  handle():
    counter => [inc]

captures: Variables:
  $inflight_init():
    api => [url]
  handle():
    api => [url]

captures: Variables:
  $inflight_init():
    __parent_this => [api.url]
  handle():
    __parent_this => [api.url]

captures: 
ERROR: Resource "root/env0/A" does not support inflight operation "api.url" (requested by "root/env0/A/cloud.Api/OnRequestHandler-9fdc62ca")

../../../../examples/tests/valid/target/test/api.wsim.281862.tmp/.wing/preflight.js:111
             _registerBind(host, ops) {
               if (ops.includes("$inflight_init")) {
>>               $Closure3._registerBindObject(__parent_this, host, ["api.url"]);
               }
               if (ops.includes("handle")) {

 




Tests 1 failed (1) 
Duration <DURATION>

```

