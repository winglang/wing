class R {
  init() {}
  init() {}
//^-- can't have multiple inits
  inflight init() {}
  inflight init() {}
        // ^-- can't have multiple inflight inits

  inflight init(x: num) {}
             // ^-- can't have inflight init with args
}