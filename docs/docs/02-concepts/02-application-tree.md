---
id: application-tree
title: Application tree 
---

## Instance names

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

## Instance scope

Instances of preflight classes define the application's construct tree. This way you can think about the generated cloud infrastructure as a logical tree where each node is some logical piece of infrastructure which may contain children nodes which are also part of your application's infrastructure (composition). 

In Wing this tree structure is automatically generated for. Any class instantiated at the top level (global scope) is a child of the "root" node of of the tree. 
Any class instantiated inside another class (in its constructor or one of it's other preflight methods) will be placed as a child of that other class.

```js
class ThumbnailBucket {
  //...
}

class ImageStorage {
  new() {
    new ThumbnailBucket(); // This ThumbnailBucket will be a child of a ImageStorage instance in the construct tree
  }
}

new ImageStorage(); // This ImageStorage will be a child of the root in the construct tree
new ThumbnailBucket(); // This Counter will be a child of of the root in the construct tree

// Here's a tree view of the generated infrastructure:
//
//              root
//               /\
//   ImageStorage  ThumbnailBucket
//    /
//  ThumbnailBucket
```

As mentioned in the [previous section](#instance-names) each instance must have a unique name within its scope. 
And the name will be automatically generated based on the class name. 
So the tree shown above also shows the correct names for each infrastructure piece of our application.
You may query information about the construct tree using the `nodeof(someInstance)` intrinsic function:
```js
let b = new cloud.Bucket();
log(nodeof(b).path); // Will log something like "/root/Bucket"
```

### Controlling instance scope

You may define an explicit scope for an instance instead of using Wing's default of placing it inside the instance where it was created using the `in` keyword:

```js
class ThumbnailBucket {
  //...
}

class ImageStorage {
  new() {
    new ThumbnailBucket(); // This ThumbnailBucket will be a child of a ImageStorage instance in the construct tree
  }
}

let imageStorage = new ImageStorage(); // This goes in root
let defaultThumbnails = new ThumbnailBucket() as "defaultsThumbs" in imageStorage; // This is explicitly named "defaultsThumbs" and explicitly placed inside imageStorage

// Here's a tree view of the generated infrastructure:
//
//                   root
//                  /
//            ImageStorage  
//             /       \
//  ThumbnailBucket    defaultsThumbs
```

### Instances created inside static methods

Preflight classes instantiated inside static methods, or instantiated inside constructors before `this` is available will use the
scope of the caller by default:

```js
class Factory {
  pub static make() {
    new cloud.Bucket(); // We're in a static, so we don't know where to place this bucket
  }
}

class MyBucket() {
  new() {
    Factory.make(); // Bucket will be placed inside `this` instance of `MyBucket`
  }
}
new MyBucket();

// tree:
//          root
//           /
//       MyBucket
//         /
//      Bucket
```

Similarly, consider this case where we instantiate a class inside a parameter in a `super()` constructor call before the
the class is creates and it's scope becomes valid:

```js
class Base {
  new(b: cloud.Bucket) {}
}
class Derived {
  new() {
    super(new cloud.Bucket()); // Bucket create before `Derived` so scope defaults to caller
  }
}
new Derived();

// tree:
//          root
//           /\
//     Bucket  Derived
```

## Interop
Classes in Wing are an extension of the [Construct Programming Model] and as such any [AWS Constructs] can be natively used in Wing applications.

[Construct Programming Model]: https://docs.aws.amazon.com/cdk/v2/guide/constructs.html
[AWS Constructs]: https://github.com/aws/constructs
