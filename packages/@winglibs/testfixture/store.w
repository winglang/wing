bring cloud;
bring fs;
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

  // Example of a method that reads a file from the winglib in preflight
  // This is to validate that @dirname is calculated correctly
  pub static loadStaticData(): str {
    let path = fs.join(@dirname, "example-data.txt");
    let contents = fs.readFile(path);
    return contents;
  }
}

pub interface PublicInterface {}

internal interface InternalInterface {}

internal class InternalClass {
  static internal internalStaticMethod() {}
}

pub class PublicClass impl PublicInterface, InternalInterface {
  static internal internalStaticMethod() {}
  pub publicField: num;
  internal internalField: num;

  new() {
    this.publicField = 42;
    this.internalField = 42;
  }

  pub publicMethod() {}
  internal internalMethod() {}
}

pub struct PublicStruct {}
internal struct InternalStruct {}
