/*\
cases:
  - target: sim
    meanThreshold: 1000
  - target: tf-aws
    meanThreshold: 3000
\*/

bring cloud;

new cloud.Function(inflight () => { assert(1 == 1); }) as "Function1";
