# [capture_resource_and_data.w](../../../../../examples/tests/valid/capture_resource_and_data.w) | test | sim

## stdout.log
```log
=====================================================================
Static
---------------------------------------------------------------------

=====================================================================
Hello
---------------------------------------------------------------------
Types:
  std.String = String
  Static = Static
  std.Json = Json
Variables:
  bang():
    this.x => [bar]
  hello():
    this.b => [put]

=====================================================================
$Closure1
---------------------------------------------------------------------
Variables:
  handle():
    foo => [baz]
    hello => [bang]

pass ┌ capture_resource_and_data.wsim » root/env0/test:resource and data
     │ Hello
     │ aa
     │ hello
     └ 123
 




Tests 1 passed (1) 
Duration <DURATION>

```

