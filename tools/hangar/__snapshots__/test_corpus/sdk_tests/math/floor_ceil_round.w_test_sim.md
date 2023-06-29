# [floor_ceil_round.w](../../../../../../examples/tests/sdk_tests/math/floor_ceil_round.w) | test | sim

## stdout.log
```log
ERROR: assertion failed: math.round(math.E, 1) == 2.7

../../../../examples/tests/sdk_tests/math/target/test/floor_ceil_round.wsim.548067.tmp/.wing/preflight.js:60
       {((cond) => {if (!cond) throw new Error("assertion failed: math.round(-y) == -6")})(((math.Util.round((-y))) === (-6)))};
       {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.E) == 3")})(((math.Util.round(math.Util.E)) === 3))};
>>     {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.E, 1) == 2.7")})(((math.Util.round(math.Util.E,1)) === 2.7))};
       {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.E, 2) == 2.72")})(((math.Util.round(math.Util.E,2)) === 2.72))};
       {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.E, 3) == 2.718")})(((math.Util.round(math.Util.E,3)) === 2.718))};

 
 
Tests 1 failed (1)
Test Files 1 failed (1)
Duration <DURATION>
```

