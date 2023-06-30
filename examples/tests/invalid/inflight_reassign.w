let var xvar = "hello";
let ylet = 123;

inflight () => {
  xvar = "hi";
//^^^^ Variable cannot be reassigned from inflight

  ylet = 456;
//^^^^ Variable is not reassignable
};