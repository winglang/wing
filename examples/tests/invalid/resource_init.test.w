class R {
  new() {}
  new() {}
//^-- can't have multiple inits
  inflight new() {}
  inflight new() {}
        // ^-- can't have multiple inflight inits

  inflight new(x: num) {}
             // ^-- can't have inflight init with args
}