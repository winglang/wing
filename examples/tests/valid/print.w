bring cloud;


print("preflight print");

new cloud.Function(inflight () => {
  print("inflight print 1.1");
  print("inflight print 1.2");
}) as "test:print1";


new cloud.Function(inflight () => {
  print("inflight print 2.1");
  print("inflight print 2.2");
}) as "test:print2";

