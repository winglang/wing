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

They run `wing compile` and then `wing test`, nice looks like everything works.

Running `wing compile -t tf-aws` also succeeds with the following output and automatically generates a pinfile next to the entrypoint file.

```shell
# (output)
[+pin] /root/CoolBucket
```

```json
// main.w.pin.json, comments added for clarity
{
  "version": "1",
  "pinned": {
    "tf-aws": {
      "/root/CoolBucket": {
        "type": "aws_s3_bucket",
        "uniqueId": "CoolBucket"
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
[+pin] /root/MyBucket
[+pin] /root/MyBucket/cloud.Bucket

Error: The following pin has been moved or deleted:
  - /root/CoolBucket

If moved, add "fromPath" to their pinfile entry.
If deleted, remove the entry from the pinfile.
```

So Sally adds fromPath to the pinfile:

```json
// main.w.pin.json
{
  "version": "1",
  "pinned": {
    "tf-aws": {
      "/root/MyBucket/cloud.Bucket": {
        "type": "aws_s3_bucket",
        "uniqueId": "CoolBucket",
        "fromPath": "/root/CoolBucket"
      }
    }
  }
}
```

Running `wing compile -t tf-aws` now succeeds and nothing is deleted or moved in the resulting compiled output.

## Implementation

### pinning

The `pinned` property is used to mark a created resource as "pinned" in the resource tree. This is an inherent public property of all resources. This means that the user does not intend for the resource to be deleted or moved. Pinning is deep, meaning that pinning a parent inherently pins all of its children.

This information will be available to the target platform/app which can choose what to do with this information. For example, the sim target can simply ignore this while the terraform target can manage a pinfile to inform the user when this changes between compilation and allow them to resolve any renames.

### Proposal for pinfile schema

```json
{
  "version": "1",
  "pinned": {
    "tf-aws": {
      // The current (not remapped) logical path to the resource. These will only be leaves of the resource tree
      "/root/CoolBucket": {
        // These attributes have platform-specific values and only make sense in that context.
        // The keys however are platform-agnostic.

        // a string that uniquely identify the resource.
        "uniqueId": "CoolBucket",

        // The type of the resource.  
        "type": "aws_s3_bucket",

        "overrides": [
          // a json path that maps to a new value
          [".name", "newName"]
        ]
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

Given all this, I think it's important to avoid the word "stateful" and to provide tools to express the true intent for API consumers rather than as an intrinsic property of the resource.

## Out-of-scope Thoughts

### `unpin`

### Attaching more meaning to `pin`

#### At a platform level

There are tools that provisioning engines have for managing resources you intend you be careful with, such as `prevent_destroy` and `create_before_destroy`. `pin` could be used to automatically set this flag on the resource in the target platform.

#### At a resource level

`pin` could be used in resource abstractions to ensure it's capable of handling a deletion/replacement in a safe way. For example, a pinned bucket could provide a mechanism to create new bucket and transfer the contents to it before deleting the old one. These are useful to have as an opt-in mechanism because more safety often increases complexity and cost.

### CLI commands

#### `wing compile -t tf-aws --update-pins`

Automatically removes any orphaned pins from the pinfile. For now this is no different from just deleting the pinfile and recompiling.
