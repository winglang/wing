# [optionals.test.w](../../../../../tests/valid/optionals.test.w) | test | sim

## stdout.log
```log
{"$id":"/S1","type":"object","properties":{"x":{"oneOf":[{"type":"null"},{"type":"string"}]}},"required":[],"description":""}
{"$id":"/S2","type":"object","properties":{"y":{"oneOf":[{"type":"null"},{"type":"object","properties":{"x":{"oneOf":[{"type":"null"},{"type":"string"}]}},"required":[],"description":""}]}},"required":[],"description":""}
pass ─ optionals.test.wsim » root/Default/test:t

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

