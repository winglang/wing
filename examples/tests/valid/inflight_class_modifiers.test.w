// `inflight` is the default phase, but still okay to indicate within inflight classes

inflight class C {
  inflight field: num;
  init() {
    this.field = 12;
  }
  inflight method() {}
}
