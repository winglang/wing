# [debug_env.w](../../../../../examples/tests/valid/debug_env.w) | test | sim

## stderr.log
```log
[libs/wingc/src/jsify.rs:1330] &class.name.span.file_id = "../../../../examples/tests/valid/debug_env.w"
[libs/wingc/src/jsify.rs:1330] &class.name.span.file_id = "../../../../examples/tests/valid/debug_env.w"
```

## stdout.log
```log
[symbol environment at ../../../../examples/tests/valid/debug_env.w:7:5]
level 0: { this => A }
level 1: { A => A [type], assert => (condition: bool): void, cloud => cloud [namespace], log => (message: str): void, panic => (message: str): void, std => std [namespace], throw => (message: str): void }
pass ─ debug_env.wsim (no tests)
 
 
Tests 1 passed (1)
Test Files 1 passed (1)
Duration <DURATION>
```

