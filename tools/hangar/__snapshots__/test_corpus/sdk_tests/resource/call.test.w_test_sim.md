# [call.test.w](../../../../../../examples/tests/sdk_tests/resource/call.test.w) | test | sim

## stdout.log
```log
[ERROR] resource.call with a field name returns the field value | Error: Property "field1" is not a function
[ERROR] resource.call with a field name returns the field value | Error: Method or property "invalidField" not found
[ERROR] resource.call cannot be used to call onStop | Error: Cannot call "onStop"
[ERROR] exceptions thrown by the resource are caught and rethrown by the caller | Error: Look ma, an error!
   --> call.test.w:30:5
   | pub onStop() {}
   | 
   | pub throwsError() {
30 |   throw "Look ma, an error!";
   |   ^
at throwsError <ABSOLUTE>/call.test.w:30:5
[INFO] resource can log messages at different levels | a regular (info) log
[INFO] resource can log messages at different levels | an info log
[INFO] resource can log messages at different levels | another info log
[WARNING] resource can log messages at different levels | a warn log
[ERROR] resource can log messages at different levels | Error: an error log
[ERROR] resource.call times out if the method takes too long | Error: Call to resource "root/env5/MyResource/Resource" timed out after 30000ms
[ERROR] resource.call times out if the method takes too long | Error: Resource is not running (it may have crashed or stopped)
pass ─ call.test.wsim » root/env0/test:resource.call with a field name returns the field value                
pass ─ call.test.wsim » root/env1/test:resource.call cannot be used to call onStop                            
pass ─ call.test.wsim » root/env2/test:exceptions thrown by the resource are caught and rethrown by the caller
pass ─ call.test.wsim » root/env3/test:resource.call can accept and return various kinds of values            
pass ─ call.test.wsim » root/env4/test:resource can log messages at different levels                          
pass ─ call.test.wsim » root/env5/test:resource.call times out if the method takes too long                   

Tests 6 passed (6)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

