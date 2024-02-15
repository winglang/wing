---
title: Resource Pinning
description: Protection of resources from accidental deletion/moves
---

# Resource Pinning

- **Author(s):**: @MarkMcCulloh
- **Submission Date**: 2024-02-15
- **Stage**: Proposal
- **Stage Date**: 2024-02-15

Introduces `pin` as a mechanism to protect resources from accidental deletion/moves in the logical application tree.

## User Journey

Sally Stateful creates a wing file with a bucket

```wing
// main.w
bring cloud;

new cloud.Bucket() as "CoolBucket";
```

because they want to make sure the bucket doesn't get deleted by accident, they pin it

```wing
// main.w
bring cloud;

pin(new cloud.Bucket() as "CoolBucket");
```

They run `wing compile` and then `wing test`, nice looks like everything works.

Running `wing compile -t tf-aws` also succeeds with the following output and automatically generates a lockfile next to the entrypoint file.

```shell
# (output)
[+pin] /root/CoolBucket
```

```json
// main.w.lock.json
{
  "version": "1",
  "pinned": {
    "tf-aws": {
      "/root/CoolBucket": {}
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

pin(new MyBucket());
```

`wing compile` and `wing test` still work as expected.

`wing compile -t tf-aws` however fails with an error message

```shell
# (output)
[+pin] /root/MyBucket
[+pin] /root/MyBucket/cloud.Bucket

Error: The following pin has been moved or deleted:
  - /root/CoolBucket

If moved, add "fromPath" to their lockfile entry.
If deleted, remove the entry from the lockfile.
```

So Sally adds fromPath to the lockfile:

```json
// main.w.lock.json
{
  "version": "1",
  "pinned": {
    "tf-aws": {
      "/root/CoolBucket": {
        "fromPath": "/root/MyBucket/cloud.Bucket"
      },
      "/root/MyBucket": {},
      "/root/MyBucket/cloud.Bucket": {}
    }
  }
}
```

Running `wing compile -t tf-aws` now succeeds and nothing is deleted or moved in the resulting compiled output.

## Implementation

### Note on "statefulness"

Statefulness is a useful concept when thinking about infrastructure but it can serve different purposes.
The typical way to think about it is in terms of data, like a database or object storage, where the deletion of the infrastructure can be a *permanently destructive* operation. This is unlike something like a cloud Function, which can be deleted and recreated without the Function itself being "different" in any intentional way.

While this is generally true, it's missing nuance. 
Sometimes your statefulness is intentionally volatile so you don't care about watching it so closely. 
Sometimes it isn't actually stateful but is treated as so by requiring additional mitigation to avoid downtime/corruption during replacement.
Designing distributed systems requires balancing the trade-offs of statefulness and statelessness against factors like cost and reliability so it's not always obvious what the right choice is.

Given all this, I think it's important to avoid the word "stateful" and to provide tools to express the true intent for API consumers rather than as an intrinsic property of the resource.

### pinning

The `pin` function is used to mark a created resource as "pinned" in the resource tree. It takes a construct and returns the same construct, with metadata added to the tree to track the pin. This means that the user does not intend for the resource to be deleted or moved. Pinning is deep, meaning that pinning a parent inherently pins all of its children.

This information will be available to the target platform/app which can choose what to do with this information. For example, the sim target can simply ignore this while the terraform target can manage a lockfile to inform the user when this changes between compilation and allow them to resolve any renames.

### Lockfile API

Platforms/Apps are provided with a lockfile API. The lockfile itself is a JSON file that contains the current state of the resource tree. The lockfile is created next to the entrypoint file and is named `<entrypoint>.lock.json`. The lockfile API provides a way to add pins to the lockfile, get a list of orphaned pins, and write the current state of the lockfile to disk.

Minimal API:

- `addPin(construct: Construct): void` - Adds a construct to the known pins for the current compilation
- `getOrphanedPins(): string[]` - Gets a list of paths that are present in the saved lockfile but not in the current one
- `write(): void` - Writes the current state of the lockfile to disk for the current platform. This list automatically will not include pins that are "fromPath" of a different pin.

## Out-of-scope Thoughts

### `unpin`

### Attaching more meaning to `pin`

#### At a platform level

There are tools that provisioning engines have for managing resources you intend you be careful with, such as `prevent_destroy` and `create_before_destroy`. `pin` could be used to automatically set this flag on the resource in the target platform.

#### At a resource level

`pin` could be used in resource abstractions to ensure it's capable of handling a deletion/replacement in a safe way. For example, a pinned bucket could provide a mechanism to create new bucket and transfer the contents to it before deleting the old one. These are useful to have as an opt-in mechanism because more safety often increases complexity and cost.

### CLI commands

#### `wing compile -t tf-aws --update-pins`

Automatically removes any orphaned pins from the lockfile. For now this is no different from just deleting the lockfile and recompiling.
