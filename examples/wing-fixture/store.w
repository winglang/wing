bring cloud;
bring "./subdir/util.w" as myutil;

pub struct StoreOptions {
  name: str?;
}

pub class Store {
  handlers: MutArray<inflight (str): void>;
  data: cloud.Bucket;

  new(options: StoreOptions?) {
    this.data = new cloud.Bucket();
    this.handlers = MutArray<inflight (str): void> [];
  }

  extern "./util.js" pub static makeKey(name: str): str;
  extern "./util.js" pub static inflight makeKeyInflight(name: str): str;

  pub inflight set(message: str) {
    this.data.put("data.txt", myutil.double(message));
    for handler in this.handlers {
      handler(message);
    }
  }

  pub onSet(handler: inflight (str): void) {
    this.handlers.push(handler);
  }
}
