# [tokens.test.w](../../../../../../examples/tests/sdk_tests/resource/tokens.test.w) | test | sim

## stdout.log
```log
[ERROR] calling resolveToken during a method call emits an error | Error: cannot resolve attributes outside of onStop method
   --> tokens.test.w:10:5
   | pub onStop() {}
   | 
   | pub foo() {
10 |   this.ctx.resolveToken("my-attr", "value");
   |   ^
at foo <ABSOLUTE>/tokens.test.w:10:5
pass ─ tokens.test.wsim » root/env0/test:calling resolveToken during a method call emits an error

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

