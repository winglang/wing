/*\
cases:
  - target: sim
    maxMeanTime: 3000
  - target: tf-aws
    maxMeanTime: 8000
\*/

bring cloud;

new cloud.Function(inflight () => { assert(1 == 1); }) as "Function1";
