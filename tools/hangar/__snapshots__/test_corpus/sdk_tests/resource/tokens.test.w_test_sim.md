# [tokens.test.w](../../../../../../examples/tests/sdk_tests/resource/tokens.test.w) | test | sim

## stdout.log
```log
[ERROR] calling resolveAttr during a method call emits an error | foo() Error: cannot resolve attributes outside of onStop method
   --> tokens.test.w:12:5
   | pub onStop() {}
   | 
   | pub foo() {
12 |   this.ctx?.resolveAttr("my-attr", "value");
   |   ^
at foo <ABSOLUTE>/tokens.test.w:12:5
pass ─ tokens.test.wsim » root/env0/test:calling resolveAttr during a method call emits an error

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

