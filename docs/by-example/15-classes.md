---
title: Classes
id: classes
slug: /classes
sidebar_label: Classes
description: Using classes with Wing
keywords: [Wing language, classes]
image: /img/wing-by-example.png
custom_edit_url: https://github.com/winglang/wing/blob/main/docs/by-example/15-classes.md
---

Wing Classes are fundamental building blocks for creating reusable, structured code in Wing applications. Similar to other object-oriented languages, Wing classes allow you to define custom types with their own properties and methods.

Classes in Wing can represent both traditional application logic and cloud resources, making them a powerful tool for modeling your cloud architecture in code.

### Preflight class

This is a [preflight](/docs/concepts/inflights#preflight-code) class. 
This preflight class as [inflight methods](/docs/concepts/inflights#inflight-code), these methods can be called within your inflight functions.

```ts playground example
bring cloud;
bring util;

class Foo  {
  pub field1: str;     // <-- readonly
  pub var field2: num; // <-- reassignable
  inflight field3: Array<str>;

  new() {
    this.field1 = "hello";
    this.field2 = 123;
  }

  setField2(value: num): void {
    this.field2 = value;
  }

  // private inflight function, only accessible during inflight
  inflight new() {
    this.field3 = ["value created on inflight init"];
    log("at inflight init");
  }

  // public inflight function, only accessible during inflight
  pub inflight doStuff() {
    // all code is async and runs on the cloud
    log("field3[0]='{this.field3.at(0)}'");
    util.sleep(1s);
    log("done");
  }
}

let f = new Foo();
log("field1={f.field1}");
log("field2={f.field2}");

// inflight example for a cloud function
new cloud.Function(inflight () => {
  // calling the public inflight function (doStuff) of the Foo class.
  // This function is not accessible during preflight.
  f.doStuff();
});

```

### Inflight interface

Inflight interfaces define contracts that classes can implement. When a class implements (impl) an interface, it must provide concrete implementations of all the methods defined in that interface.

```js playground example
bring cloud;

// define the interface
inflight interface IProfile {
  // inflight function
  inflight name(): str;
}

// new class that implements the interface
inflight class WingPerson impl IProfile {
  // custom definition of the name function
  pub inflight name(): str {
    return "Fairy Wing";
  }
}

// inflight function that accepts the interface
let logName = inflight(profile: IProfile): void => {
  log(profile.name());
};

new cloud.Function(inflight () => {
  logName(new WingPerson());
});
```

### Preflight interface
```ts playground example
bring cloud;
/**
 * Preflight Interface
 **/ 
interface IKVStore extends std.IResource { // https://github.com/winglang/wing/issues/1961
  inflight get(key: str): Json;
  inflight set(key: str, value: Json): void;
}

class BucketBasedKeyValueStore impl IKVStore {
  bucket: cloud.Bucket;
  new() {
    this.bucket = new cloud.Bucket();
  }
  pub inflight get(key: str): Json {
    return this.bucket.getJson(key);
  }
  pub inflight set(key: str, value: Json): void {
    this.bucket.putJson(key, value);
  }
}

```