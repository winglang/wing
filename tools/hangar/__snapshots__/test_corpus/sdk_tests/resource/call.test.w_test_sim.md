# [call.test.w](../../../../../../examples/tests/sdk_tests/resource/call.test.w) | test | sim

## stdout.log
```log
[ERROR] resource.call with a field name returns the field value | field1("arg1", "arg2") Error: Property "field1" is not a function
[ERROR] resource.call with a field name returns the field value | invalidField() Error: Method or property "invalidField" not found
[ERROR] resource.call cannot be used to call onStart or onStop | onStart() Error: Cannot call "onStart"
[ERROR] resource.call cannot be used to call onStart or onStop | onStop() Error: Cannot call "onStop"
[ERROR] exceptions thrown by the resource are caught and rethrown by the caller | throwsError() Error: Look ma, an error!
   --> call.test.w:30:5
   | pub onStop() {}
   | 
   | pub throwsError() {
30 |   throw "Look ma, an error!";
   |   ^
at throwsError <ABSOLUTE>/call.test.w:30:5
pass ─ call.test.wsim » root/env0/test:resource.call with a field name returns the field value                
pass ─ call.test.wsim » root/env1/test:resource.call cannot be used to call onStart or onStop                 
pass ─ call.test.wsim » root/env2/test:exceptions thrown by the resource are caught and rethrown by the caller
pass ─ call.test.wsim » root/env3/test:resource.call can accept and return various kinds of values            

Tests 4 passed (4)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

