bring cloud;


log("preflight log");

new cloud.Function(inflight () => {
  log("inflight log 1.1");
  log("inflight log 1.2");
}) as "test:log1";


new cloud.Function(inflight () => {
  log("inflight log 2.1");
  log("inflight log 2.2");
}) as "test:log2";

