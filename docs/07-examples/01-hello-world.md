---
title: Cheatsheet
id: cheat-sheet
keywords: [Wing example, simulator, Wing simulator Reference]
---

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} maxHeadingLevel={5}/>

#### Variable declaration 
```js playground

```
#### Function declaration and invocations
#### Creating string, bool, numbers
#### Creating arrays, maps, set
#### Using javascript code
#### Creating tests 
#### Preflight Classes and Interfaces
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
#### Flow Controls: conditions, if statements & loops
#### Enumerating over arrays, maps, sets
#### Converting immutable to mutable