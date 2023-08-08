# [inflight_capture_static.w](../../../../../examples/tests/valid/inflight_capture_static.w) | test | sim

## stderr.log
```log
[libs/wingc/src/jsify.rs:1330] &class.name.span.file_id = "../../../../examples/tests/valid/inflight_capture_static.w"
[libs/wingc/src/jsify.rs:1330] &class.name.span.file_id = "../../../../examples/tests/valid/inflight_capture_static.w"
[libs/wingc/src/jsify.rs:1330] &class.name.span.file_id = "../../../../examples/tests/valid/inflight_capture_static.w"
[libs/wingc/src/jsify.rs:1330] &class.name.span.file_id = "../../../../examples/tests/valid/inflight_capture_static.w"
[libs/wingc/src/jsify.rs:1330] &class.name.span.file_id = "../../../../examples/tests/valid/inflight_capture_static.w"
[libs/wingc/src/jsify.rs:1330] &class.name.span.file_id = "../../../../examples/tests/valid/inflight_capture_static.w"
[libs/wingc/src/jsify.rs:1330] &class.name.span.file_id = "../../../../examples/tests/valid/inflight_capture_static.w"
[libs/wingc/src/jsify.rs:1330] &class.name.span.file_id = "../../../../examples/tests/valid/inflight_capture_static.w"
[libs/wingc/src/jsify.rs:1330] &class.name.span.file_id = "../../../../examples/tests/valid/inflight_capture_static.w"
[libs/wingc/src/jsify.rs:1330] &class.name.span.file_id = "../../../../examples/tests/valid/inflight_capture_static.w"
[libs/wingc/src/jsify.rs:1330] &class.name.span.file_id = "../../../../examples/tests/valid/inflight_capture_static.w"
[libs/wingc/src/jsify.rs:1330] &class.name.span.file_id = "../../../../examples/tests/valid/inflight_capture_static.w"
```

## stdout.log
```log
pass ─ inflight_capture_static.wsim » root/env0/test:call static method of preflight              
pass ─ inflight_capture_static.wsim » root/env1/test:call static method of an outer inflight class
pass ─ inflight_capture_static.wsim » root/env2/test:call static method of an inner inflight class
pass ┌ inflight_capture_static.wsim » root/env3/test:call static method of a namespaced type      
     └ WING_TARGET=sim
 
 
Tests 4 passed (4)
Test Files 1 passed (1)
Duration <DURATION>
```

