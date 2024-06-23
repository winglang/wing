bring math;

let ar = [1,2,3];

test "Use phase independent methods on lifted object" {
  // Phase independent method with no inflight args is lifted
  assert(ar.at(0) == 1);
  let i = math.floor(math.random() * ar.length);
  // Phase independent method with inflight args is executed inflight
  let var x = ar.at(i);
  assert(x >= 1 && x <= 3);
  // Complex expression with inflight inner expression is evaluated inflight
  x = ar.at(1 - 1 + i);
  assert(x >= 1 && x <= 3);

  // Get mutable copy of lifted array
  // Make sure the `copyMut` method is called inflight and not lifted and turned into an immutable array
  let mut_ar = ar.copyMut();
  mut_ar.push(4);
}
