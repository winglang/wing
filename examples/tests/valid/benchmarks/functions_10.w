/*\
cases:
  - target: sim
    maxMeanTime: 3000
  - target: tf-aws
    maxMeanTime: 22000
\*/

bring cloud;

new cloud.Function(inflight () => { assert(1 == 1); }) as "Function1";
new cloud.Function(inflight () => { assert(2 == 2); }) as "Function2";
new cloud.Function(inflight () => { assert(3 == 3); }) as "Function3";
new cloud.Function(inflight () => { assert(4 == 4); }) as "Function4";
new cloud.Function(inflight () => { assert(5 == 5); }) as "Function5";
new cloud.Function(inflight () => { assert(6 == 6); }) as "Function6";
new cloud.Function(inflight () => { assert(7 == 7); }) as "Function7";
new cloud.Function(inflight () => { assert(8 == 8); }) as "Function8";
new cloud.Function(inflight () => { assert(9 == 9); }) as "Function9";
new cloud.Function(inflight () => { assert(10 == 10); }) as "Function10";
