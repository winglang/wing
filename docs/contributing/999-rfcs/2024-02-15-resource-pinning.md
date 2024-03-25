---
title: Resource Pinning
description: Protection of resources from accidental deletion/moves
---

# Resource Pinning

- **Author(s):**: @MarkMcCulloh
- **Submission Date**: 2024-02-15
- **Stage**: Proposal
- **Stage Date**: 2024-02-15

Introduce a mechanism to protect resources from accidental deletion/moves in the logical application tree.

## Requirements

### Functional
- User-ability in sources to signify intent for a resource to not be deleted or moved (e.g. "pinning")
- Provide default for a resource's "pinned" state in it's implementation
- Git-trackable way to store changes to pinned resources between compilations, per target platform (e.g. "pinfile")
- User-ability to manually and declaratively override a pinned resource's path in the resource tree
- User-ability to manually and declaratively override a pinned resource's attributes used by the platform
- Compilation failure when a pinned resource is deleted without explicit removal from the pinfile
- Compilation failure when a pinned resource is moved without explicit mapping of a previous path to a new path
- Compilation failure when a resource is no longer pinned in source but is still present in the pinfile

### Non-Functional
- The pinfile is human-readable and editable
- The pinfile contains the minimal information necessary to achieve the functional requirements
- The pinfile is stable and predictable between compilations on different machines
- CLI provides clear error messages and guidance for resolving deletion/moves of pinned resources

### Cases

For the following cases, assume a user has expressed their intent to protect a resource from deletion/moves somehow.
The following cases should be handled by this RFC:

- A pinned resource's id was changed in source (using `as`)
- A pinned resource was moved to a different path in the resource tree (e.g. placed inside a different class)
- An update to wing itself changed a pinned resource's path
- An update to a dependency changed the id's within a resource it exports, and the user has pinned an instance of that resource

## User Journey

Sally Stateful creates a wing file with a bucket

```wing
// main.w
bring cloud;

new cloud.Bucket() as "CoolBucket";
```

They run `wing compile` and then `wing test`. Nice, looks like everything works.

Running `wing compile -t tf-aws` also succeeds with the following output and a new file called main.w.pin.json appears:

```shell
# (output)
[+pin] /root/CoolBucket
```

```json
// main.w.pin.json
{
  "version": "1",
  "pinned": {
    "tf-aws": {
      "/root/CoolBucket": {
        "type": "aws_s3_bucket",
        "uniqueId": "CoolBucket",
        "path": "/root/CoolBucket",
      }
    }
  }
}
```

Sally deploys this to AWS and everything is great.

Some time later, Sally decided to move the bucket into a new abstraction.

```wing
// main.w
bring cloud;

class MyBucket {
  bucket: cloud.Bucket;

  new() {
    this.bucket = new cloud.Bucket();
  }
}

let myBucket = new MyBucket();

```

`wing compile` and `wing test` still work as expected.

`wing compile -t tf-aws` however fails with an error message

```shell
# (output)
[-pin] /root/CoolBucket
[+pin] /root/MyBucket/cloud.Bucket

Error: The following pinned resource has been moved or deleted:
  - /root/CoolBucket

If moved, update "path" property in the pinfile to the new path.
If deleted, remove the entry from the pinfile.
```
> In the future we will add support for `wing pin mv` and `wing pin rm`
For now, Sally wants to avoid the destructive move of the bucket so she updates the `path` in the pinfile.

```json
// main.w.pin.json
{
  "version": "1",
  "pinned": {
    "tf-aws": {
      "/root/CoolBucket": {
        "type": "aws_s3_bucket",
        "uniqueId": "CoolBucket",
        "path": "/root/MyBucket/cloud.Bucket"
      }
    }
  }
}
```

Running `wing compile -t tf-aws` now succeeds and nothing is deleted or moved in the resulting compiled output.

Later, Sally decides the bucket has no need to be so protected, so they remove the default pin on `cloud.Bucket`:

```wing
// main.w
bring cloud;

class MyBucket {
  bucket: cloud.Bucket;

  new() {
    this.bucket = new cloud.Bucket();
    this.bucket.pinned = false;
  }
}

let myBucket = new MyBucket();
```

Running `wing compile -t tf-aws` automatically updates the pinfile (because the resource is otherwise unchanged):

```shell
# (output)
[-pin] /root/CoolBucket
```

## Implementation

### pinning

The `pinned` property is used to mark a created resource as "pinned" in the resource tree. This is an inherent public property of all resources. This means that the user does not intend for the resource to be deleted or moved. Pinning is deep, meaning that pinning a parent inherently pins all of its children.

This information will be available to the target platform/app which can choose what to do with this information. For example, the sim target can simply ignore this while the terraform target can manage a pinfile to inform the user when this changes between compilation and allow them to resolve any renames.

### Annotated Pinfile

```json
{
  "version": "1",
  "pinned": {
    "tf-aws": {
      // The original logical path to the resource. These will only be leaves of the resource tree
      "/root/CoolBucket": {
        // These attributes have platform-specific values and only make sense in that context.
        // The keys however are platform-agnostic.

        // a string to identify the resource. Often matches the id but this value is platform-specific.
        "uniqueId": "CoolBucket",

        // The platform type of the resource. Together with uniqueId, this must uniquely identify the resource.
        "type": "aws_s3_bucket",
        
        // The logical path to the resource. If moved this can be updated.
        "path": "/root/CoolBucket",

        // The resulting attributes of the resource.
        // Data provided here will overwrite the resource's attributes.
        // e.g. For terraform this is effectively an escape hatch for the user write their own.
        "attributes": {
          "name": "cool-bucket",
        }
      }
    }
  }
}
```

### pinfile API

Platforms/Apps are provided with a pinfile API. The pinfile itself is a JSON file that contains the current state of the resource tree. The pinfile is created next to the entrypoint file and is named `<entrypoint>.pin.json`. The pinfile API provides a way to add pins to the pinfile, get a list of orphaned pins, and write the current state of the pinfile to disk.

Minimal API:

- `addPin(construct: Construct): void` - Adds a construct to the known pins for the current compilation
- `getOrphanedPins(): string[]` - Gets a list of paths that are present in the saved pinfile but not in the current one
- `write(): void` - Writes the current state of the pinfile to disk for the current platform. This list automatically will not include pins that are "fromPath" of a different pin.

### Note on "statefulness"

Statefulness is a useful concept when thinking about infrastructure but it can serve different purposes.
The typical way to think about it is in terms of data, like a database or object storage, where the deletion of the infrastructure can be a *permanently destructive* operation. This is unlike something like a cloud Function, which can be deleted and recreated without the Function itself being "different" in any intentional way.

While this is generally true, it's missing nuance. 
Sometimes your statefulness is intentionally volatile so you don't care about watching it so closely. 
Sometimes it isn't actually stateful but is treated as so by requiring additional mitigation to avoid downtime/corruption during replacement.
Designing distributed systems requires balancing the trade-offs of statefulness and statelessness against factors like cost and reliability so it's not always obvious what the right choice is.

With all this said, it's important to give users the tools to express their intent for pinning even if a resource is typically considered stateful/stateless.

## Out-of-scope Thoughts

### Attaching more meaning to `pinned`

#### At a platform level

There are tools that provisioning engines have for managing resources you intend you be careful with, such as `prevent_destroy` and `create_before_destroy`. `pin` could be used to automatically set this flag on the resource in the target platform.

#### At a resource level

`pinned` could be used in resource abstractions to ensure it's capable of handling a deletion/replacement in a safe way. For example, a pinned bucket could provide a mechanism to create new bucket and transfer the contents to it before deleting the old one. These are useful to have as an opt-in mechanism because more safety often increases complexity and cost.

### CLI commands

#### `wing compile -t tf-aws --update-pins`

Automatically removes any orphaned pins from the pinfile. For now this is no different from just deleting the pinfile and recompiling.
