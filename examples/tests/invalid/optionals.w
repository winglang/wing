inflight f(x: num) {
  // do something
}

let x: num? = 1;
f(x); // error: x is num? but f expects num
