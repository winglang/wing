# [call.test.w](../../../../../../examples/tests/sdk_tests/resource/call.test.w) | test | sim

## stdout.log
```log
[INFO] resource can log messages at different levels | a regular (info) log
[INFO] resource can log messages at different levels | an info log
[INFO] resource can log messages at different levels | another info log
[WARNING] resource can log messages at different levels | a warn log
[ERROR] resource can log messages at different levels | Error: an error log
pass ─ call.test.wsim » root/env0/test:resource.call with a field name returns the field value                
pass ─ call.test.wsim » root/env1/test:resource.call cannot be used to call onStop                            
pass ─ call.test.wsim » root/env2/test:exceptions thrown by the resource are caught and rethrown by the caller
pass ─ call.test.wsim » root/env3/test:resource.call can accept and return various kinds of values            
pass ─ call.test.wsim » root/env4/test:resource can log messages at different levels                          

Tests 5 passed (5)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

