# [for_loop.test.w](../../../../../tests/valid/for_loop.test.w) | test | sim

## stdout.log
```log
wing: 1
wing: 2
wing: 3
lang: 1
lang: 2
lang: 3
dang: 1
dang: 2
dang: 3
wing: 1
wing: 2
lang: 1
lang: 2
dang: 1
dang: 2
wing: 1
wing: 2
wing: 3
lang: 1
lang: 2
lang: 3
dang: 1
dang: 2
dang: 3
---
for x in 0..0 { ... }
there's no value to iterate
---
for x in 0..=0 { ... }
0
---
for x in 0..2 { ... }
0
1
---
for x in 0..=2 { ... }
0
1
2
---
for x in 2..0 { ... }
2
1
---
for x in 2..=0 { ... }
2
1
0
---
for x in 0..-2 { ... }
0
-1
---
for x in 0..=-2 { ... }
0
-1
-2
---
for x in -2..0 { ... }
-2
-1
---
for x in -2..=0 { ... }
-2
-1
0
---
for x in 0..z { ... } <=> x = 2
0
1
---
for x in 0..=z { ... } <=> x = 2
0
1
2
---
for x in z..0 { ... } <=> x = 2
2
1
---
for x in 0..(z*2) { ... } <=> x = 2
0
1
2
3
---
for x in 0..=(z*2) { ... } <=> x = 2
0
1
2
3
4
---
for x in (z*2)..0 { ... } <=> x = 2
4
3
2
1
pass ─ for_loop.test.wsim (no tests)

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

