/*\
cases:
  - target: sim
    maxMeanTime: 1000
  - target: tf-aws
    maxMeanTime: 3000
\*/

bring cloud;

new cloud.Function(inflight () => { assert(1 == 1); }) as "Function1";
