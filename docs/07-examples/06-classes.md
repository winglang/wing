---
title: Classes
id: classes
keywords: [Wing example]
---

### Preflight class 
```ts playground
bring cloud;

class KeyValueStore {
  bucket: cloud.Bucket;
  init(store: cloud.Bucket) {
    this.bucket = store;
  }

  inflight get(key: str): Json {
    return this.bucket.getJson(key);
  }
  inflight set(key: str, value: Json): void {
    this.bucket.putJson(key, value);
  }
}

let kv = new KeyValueStore(new cloud.Bucket());

test "main" {
  kv.set("k", Json { 
    value: "v" 
  });
  let result = kv.get("k");
  log("${result}");
  assert("v" == str.fromJson(result.get("value")));
}


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

test "get and set on bucketBased" {
  bucketBased.set("k", Json { 
    value: "v" 
  });
  let result = bucketBased.get("k");
  assert("v" == str.fromJson(result.get("value")));
}

test "get and set on tableBased" {
  tableBased.set("k", Json { 
    value: "v" 
  });
  let result = tableBased.get("k");
  log("${result}");
  assert("v" == str.fromJson(result.get("value")));
}
```