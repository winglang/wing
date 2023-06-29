---
title: Classes
id: classes
keywords: [Wing example]
---

### Preflight class
```ts playground
bring cloud;
bring util;

class Foo  {
  field1: str;     // <-- readonly
  var field2: num; // <-- reassignable
  inflight field3: Array<str>;

  init() {
    this.field1 = "hello";
    this.field2 = 123;
  }

  setField2(value: num): void {
    this.field2 = value;
  }

  inflight init() {
    this.field3 = ["value created on inflight init"];
    log("at inflight init");
  }

  inflight doStuff() {
    // all code is async and runs on the cloud
    log("field3[0]='${this.field3.at(0)}'");
    util.sleep(1s);
    log("done");
  }
}

let f = new Foo();
log("field1=${f.field1}");
log("field2=${f.field2}");

new cloud.Function(inflight () => {
  f.doStuff();
});

```

### Inflight interface
```js playground
bring cloud;

interface IProfile {
  inflight name(): str;
}

inflight class WingPerson impl IProfile {
  inflight name(): str {
    return "Fairy Wing";
  }
}

let logName = inflight(profile: IProfile): void => {
  log(profile.name());
};

new cloud.Function(inflight () => {
  logName(new WingPerson());
});
```

### Preflight interface
```ts playground
/**
 * Preflight Interface
 **/ 
interface IKVStore extends std.IResource { // https://github.com/winglang/wing/issues/1961
  inflight get(key: str): Json;
  inflight set(key: str, value: Json): void;
}

class BucketBasedKeyValueStore impl IKVStore {
  bucket: cloud.Bucket;
  init() {
    this.bucket = new cloud.Bucket();
  }
  inflight get(key: str): Json {
    return this.bucket.getJson(key);
  }
  inflight set(key: str, value: Json): void {
    this.bucket.putJson(key, value);
  }
}

```

### Complete IKVStore 
```js playground
bring cloud;

interface IKVStore extends std.IResource { 
  inflight get(key: str): Json;
  inflight set(key: str, value: Json): void;
}

class BucketBasedKeyValueStore impl IKVStore {
  bucket: cloud.Bucket;
  init() {
    this.bucket = new cloud.Bucket();
  }
  inflight get(key: str): Json {
    return this.bucket.getJson(key);
  }
  inflight set(key: str, value: Json): void {
    this.bucket.putJson(key, value);
  }
}

class TableBasedKeyValueStore impl IKVStore {
  table: cloud.Table;
  init() {
    this.table = new cloud.Table(
      name: "table",
      primaryKey: "key",
      columns: {
        value: cloud.ColumnType.STRING
      }
    );
  }
  inflight get(key: str): Json {
    return this.table.get(key);
  }
  inflight set(key: str, value: Json): str {
    this.table.insert(key, value);
  }
}

let bucketBased: IKVStore = new BucketBasedKeyValueStore();
let tableBased: IKVStore = new TableBasedKeyValueStore();

let testKv = inflight (kv: IKVStore):void => {
  kv.set("k", Json { 
    value: "v" 
  });
  let result = kv.get("k");
  log("${result.get("value")}");
  assert("v" == str.fromJson(result.get("value")));
};

new cloud.Function(inflight () => {
  log("testing bucketBased KVStore");
  testKv(bucketBased);
  log("testing tableBased KVStore");
  testKv(tableBased);
});
```