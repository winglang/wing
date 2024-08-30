bring cloud;

inflight interface IGoo {
  notHandle(): void;
}

inflight class NotGoo {
  notHandle(): void {
    log("handle!");
  }
}

test "f" {

  inflight class YesGoo impl IGoo {
    pub notHandle(): void {
      log("i am goo");
    }
  }

  // this works
  let y: IGoo = new YesGoo();
  y.notHandle();

  // this doesn't work
  let x: IGoo = new NotGoo();
  x.notHandle();
}

