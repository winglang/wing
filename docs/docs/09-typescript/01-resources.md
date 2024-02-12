---
title: Resources
id: resources
---

Resources are created similar to other CDKs (awscdk, cdktf, cdk8s, etc.). They make up the tree that represents your infrastructure.
Resources are classes typically constructed with at least two arguments: The scope (parent) resource and an id.

The first argument for `main` is the root of this tree of resources and can be used to construct your first resource:

```ts
import { main, cloud } from "@wingcloud/framework";

main((root) => {
  new cloud.Bucket(root, "Bucket");
});
```

API documentation for the `cloud` namespace is available [here](../04-standard-library/cloud).
Note that those docs are meant for The TypeScript API is similar, with two primary differences:

- Resources always have 2 arguments first: the `scope` resource and `id` for the resource
- Some types are different, a table can be found in the [winglang reference](../03-language-reference.md#522-type-model)

### Creating new resources

Resources can be grouped together by using [constructs](https://github.com/aws/constructs).

```ts
// my-construct.ts
import { cloud, Construct } from "@wingcloud/framework";

export class MyConstruct extends Construct {
  public bucket: cloud.Bucket;
  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.bucket = new cloud.Bucket(this, "MyBucket");
  }
}
```

```ts
// main.ts
import { main } from "@wingcloud/framework";
import { MyConstruct } from "./my-construct";

main((root) => {
  new MyConstruct(root, "MyConstruct");
});
```

The creation of `lift`able resources is not currently supported in TypeScript
