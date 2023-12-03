---
title: Singletons
id: singletons
keywords: [singleton]
---

Sometimes, it makes sense for a resource to be defined only once per application. This example shows
a pattern for how to implement singletons in Wing.

As an example, say we want to maintain a central bucket that can be accessed from any part of the
application:

```js playground
bring cloud;

class SingletonBucket {
  pub static of(scope: std.IResource): cloud.Bucket {
    let uid = "SingletonBucket";
    let root = std.Node.of(scope).root;
    let rootNode = std.Node.of(root);
    return unsafeCast(rootNode.tryFindChild(uid)) ?? new cloud.Bucket() as uid in root;
  }
}
```

The `SingletonBucket.of()` static method uses `std.Node.of(scope).root` to find the root node of the app.
Then, if there is already a child with the identifier `SingletonBucket` at that level, it returns
it or otherwise it creates a new bucket with this id (`as uid`) under the root node (`in root`).

> `unsafeCast()` is needed here to cast the returned object from `tryFindChild()` to `cloud.Bucket`.

Now, in order to access our bucket from anywhere within the app, I can just use:

```js
let bucket = SingletonBucket.of(this);
```

And we will always get the same bucket.