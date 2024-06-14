# [call.test.w](../../../../../../examples/tests/sdk_tests/resource/call.test.w) | test | sim

## stderr.log
```log
error: an error log
originalMessage: an error log
traceWithSources: []
error: Error: Resource is not running (it may have crashed or stopped)
    at exports.stop (<ABSOLUTE>:LINE:COL)
    at process.<anonymous> (<ABSOLUTE>:LINE:COL)
    at process.emit (node:events:519:28)
    at emit (node:internal/child_process:951:14)
    at process.processTicksAndRejections (node:internal/process/task_queues:83:21)
originalMessage: Resource is not running (it may have crashed or stopped)
traceWithSources: []
```

## stdout.log
```log
[INFO] resource can log messages at different levels | a regular (info) log
[INFO] resource can log messages at different levels | an info log
[INFO] resource can log messages at different levels | another info log
[WARNING] resource can log messages at different levels | a warn log
[ERROR] resource can log messages at different levels | Error: an error log
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

