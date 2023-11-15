---
id: application-tree
title: Application tree 
---

Instances of preflight classes in Wing are identified by a unique name.
The name is used to identify the resource in the Wing Console, and is used to determine the logical name assigned to the resource in the infrastructure provisioning engine (such as Terraform or CloudFormation), and the physical name of the resource in the target cloud provider (such as AWS, Azure, or GCP).

The default name of a resource is the name of the class. The name can be overridden using the `as` syntax:

```js
let bucket1 = new cloud.Bucket(); // default name is "cloud.Bucket"
let bucket2 = new cloud.Bucket() as "my-bucket";
```

The name of a resource needs to be unique within the scope it is defined.
New classes introduce new scopes, so the same name can be used for different resources in different classes.

```js
class Group1 {
  new() {
    new cloud.Bucket() as "Store";
  }
}

class Group2 {
  new() {
    new cloud.Bucket() as "Store";
  }
}

// The following is valid
new Group1();
new Group2();
```

Classes in Wing are an extension of the [Construct Programming Model] and as such any [AWS Constructs] can be natively used in Wing applications.

[Construct Programming Model]: https://docs.aws.amazon.com/cdk/v2/guide/constructs.html
[AWS Constructs]: https://github.com/aws/constructs
